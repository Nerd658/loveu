from playwright.sync_api import sync_playwright

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto('http://localhost:8080')

        # Bypass intro
        page.evaluate("document.getElementById('cinematic-intro').style.display = 'none'")
        page.evaluate("document.getElementById('main').removeAttribute('inert')")

        # Scroll to constellation
        const_canvas = page.locator('#constCanvas')
        const_canvas.scroll_into_view_if_needed()
        page.wait_for_timeout(1000)

        # Focus visual check
        const_canvas.focus()
        page.wait_for_timeout(500)
        page.screenshot(path='focus_state.png')

        # Hover check
        const_canvas.hover()
        page.wait_for_timeout(500)
        page.screenshot(path='hover_state.png')

        # Click and interaction check
        const_canvas.click()
        page.wait_for_timeout(500) # Wait for anim start
        aria_disabled = const_canvas.get_attribute('aria-disabled')
        aria_label = const_canvas.get_attribute('aria-label')
        print(f"aria-disabled after click: {aria_disabled}")
        print(f"aria-label after click: {aria_label}")

        page.screenshot(path='clicked_state.png')

        browser.close()

verify()
