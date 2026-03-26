from playwright.sync_api import sync_playwright, expect

def verify_feature(page):
    page.goto("http://localhost:8080")
    page.wait_for_timeout(3000)

    # Assert that `#main` is inert
    main_el = page.locator('#main')
    expect(main_el).to_have_attribute('inert', '')
    print("Assertion passed: #main has 'inert' attribute during cinematic intro")

    # Click the enter button
    page.get_by_role("button", name="Entrer ✦").click()
    page.wait_for_timeout(2000)

    # Take a screenshot
    page.screenshot(path="/home/jules/verification/verification.png")

    # Assert that `#main` is NO LONGER inert
    expect(main_el).not_to_have_attribute('inert', '')
    print("Assertion passed: #main is no longer inert after cinematic intro")

    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(record_video_dir="/home/jules/verification/video")
        page = context.new_page()
        try:
            verify_feature(page)
        finally:
            context.close()
            browser.close()
