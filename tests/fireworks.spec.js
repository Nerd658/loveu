const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('launchFireworks', () => {
  test.beforeEach(async ({ page }) => {
    // Open the local index.html file
    const filePath = require('url').pathToFileURL(path.resolve('index.html')).href;
    await page.goto(filePath);
  });

  test('should activate fireworks canvas and set initial state', async ({ page }) => {
    await page.evaluate(() => {
      launchFireworks();
    });

    const isActive = await page.evaluate(() => {
      return document.getElementById('fireworkCanvas').classList.contains('active');
    });
    expect(isActive).toBeTruthy();

    const fwActive = await page.evaluate(() => fwActive);
    expect(fwActive).toBeTruthy();
  });

  test('should correctly schedule timeouts for launches and finale', async ({ page }) => {
    // Inject mock for setTimeout and requestAnimationFrame before calling the function
    await page.evaluate(() => {
      window.timeoutCalls = [];
      window.originalSetTimeout = window.setTimeout;

      // Override setTimeout to track calls and execute immediately for testing
      window.setTimeout = (cb, delay) => {
        window.timeoutCalls.push(delay);
        cb();
        return 1;
      };

      window.rafCalls = 0;
      // Override requestAnimationFrame to track calls but prevent infinite loop
      window.requestAnimationFrame = (cb) => {
        window.rafCalls++;
      };
    });

    await page.evaluate(() => {
      launchFireworks();
    });

    const timeouts = await page.evaluate(() => window.timeoutCalls);

    // We expect 6 launches + 1 finale = 7 timeouts
    expect(timeouts.length).toBe(7);

    // The last timeout is the finale, timed at (launches.length * 350 + 400)
    // launches.length is 6. So 6 * 350 + 400 = 2500
    expect(timeouts[6]).toBe(6 * 350 + 400);

    // Verify that particles were actually pushed to the array
    const particlesLength = await page.evaluate(() => particles.length);
    expect(particlesLength).toBeGreaterThan(0);

    // Verify that animFW was called which triggers requestAnimationFrame
    const rafCalls = await page.evaluate(() => window.rafCalls);
    expect(rafCalls).toBeGreaterThan(0);
  });

  test('animFW should deactivate fireworks when elapsed > 7000ms and no particles', async ({ page }) => {
    // Set up the environment to simulate an active firework state that's expired
    await page.evaluate(() => {
      fwActive = true;
      document.getElementById('fireworkCanvas').classList.add('active');
      particles = []; // Ensure no particles are left

      // Mock Date.now to simulate that 8000ms has elapsed since fwStart
      window.originalDateNow = Date.now;
      fwStart = window.originalDateNow() - 8000;
      Date.now = () => window.originalDateNow();
    });

    await page.evaluate(() => {
      animFW();
    });

    // Check if deactivated correctly
    const fwActive = await page.evaluate(() => fwActive);
    expect(fwActive).toBeFalsy();

    const isActive = await page.evaluate(() => {
      return document.getElementById('fireworkCanvas').classList.contains('active');
    });
    expect(isActive).toBeFalsy();
  });
});
