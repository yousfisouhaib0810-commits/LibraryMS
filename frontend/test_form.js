const { chromium } = require('playwright-core');
const path = require('path');

async function testContactForm() {
    const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
    const browser = await chromium.launch({
        executablePath: edgePath,
        headless: true
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    console.log('Scrolling to Contact Section...');
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);

    console.log('Filling out the form...');
    await page.fill('input[name="name"]', 'DeepMind Antigravity');
    await page.fill('input[name="email"]', 'agent@deepmind.com');
    await page.fill('input[name="subject"]', 'Hello from the AI');
    await page.fill('textarea[name="message"]', 'I am testing this form live in Edge to make sure it works! 🚀');

    // Capture before submission
    const beforePath = path.join(__dirname, 'contact_before_submit.png');
    await page.screenshot({ path: beforePath });
    console.log(`Saved pre-submit screenshot: ${beforePath}`);

    console.log('Submitting the form...');
    await page.click('button[type="submit"]');

    // Next.js/Browser alerts can be tricky in headless, but if we use a real alert(), 
    // we might need to handle it. The code uses `alert()`.
    page.on('dialog', async dialog => {
        console.log(`Alert encountered: ${dialog.message()}`);
        await dialog.accept();
    });

    // Wait for submission to complete
    await page.waitForTimeout(3000);

    // Capture after submission
    const afterPath = path.join(__dirname, 'contact_after_submit.png');
    await page.screenshot({ path: afterPath });
    console.log(`Saved post-submit screenshot: ${afterPath}`);

    await browser.close();
    console.log('Test complete.');
}

testContactForm().catch(console.error);
