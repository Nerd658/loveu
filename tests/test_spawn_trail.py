import unittest
import os
from playwright.sync_api import sync_playwright

class TestSpawnTrail(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch(headless=True)
        # Use dynamic path for portability relative to __file__
        project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        cls.index_path = f"file://{os.path.join(project_root, 'index.html')}"

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()

    def setUp(self):
        self.context = self.browser.new_context()
        self.page = self.context.new_page()
        # Abort external requests to avoid timeouts
        self.page.route("**/*", lambda route: route.continue_() if route.request.resource_type in ["document", "script", "stylesheet"] else route.abort())
        self.page.goto(self.index_path)

        # Stop typing animations and hide intro to stabilize DOM
        self.page.evaluate('''
            document.getElementById('cinematic-intro').style.display = 'none';
            document.getElementById('main').removeAttribute('inert');
            // Mock Date.now for testing spawnTrail rate limit
            window._originalDateNow = Date.now;
            window._mockTime = 10000;
            Date.now = () => window._mockTime;

            window._originalSetTimeout = setTimeout;
        ''')

    def tearDown(self):
        self.page.evaluate('''
            Date.now = window._originalDateNow;
            setTimeout = window._originalSetTimeout;
        ''')
        self.context.close()

    def test_spawn_trail_creates_element(self):
        self.page.evaluate('spawnTrail(100, 200)')

        particles = self.page.locator('.trail-particle')
        self.assertEqual(particles.count(), 1)

        particle = particles.first
        left = particle.evaluate('el => el.style.left')
        top = particle.evaluate('el => el.style.top')
        self.assertEqual(left, '100px')
        self.assertEqual(top, '200px')

    def test_spawn_trail_rate_limiting(self):
        self.page.evaluate('spawnTrail(100, 200)')
        self.page.evaluate('spawnTrail(150, 250)') # Should be ignored

        particles = self.page.locator('.trail-particle')
        self.assertEqual(particles.count(), 1)

        # Advance time by 40ms
        self.page.evaluate('window._mockTime += 40')
        self.page.evaluate('spawnTrail(200, 300)')

        self.assertEqual(particles.count(), 2)

    def test_spawn_trail_removal(self):
        self.page.evaluate('''
            window._timeouts = [];
            window.setTimeout = (cb, delay) => {
                window._timeouts.push({cb, delay});
                return 1;
            };
        ''')

        self.page.evaluate('spawnTrail(100, 200)')
        particles = self.page.locator('.trail-particle')
        self.assertEqual(particles.count(), 1)

        self.page.evaluate('''
            const timeout = window._timeouts.find(t => t.delay === 800);
            if(timeout) timeout.cb();
        ''')

        self.assertEqual(particles.count(), 0)

if __name__ == '__main__':
    unittest.main()
