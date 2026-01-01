const { chromium } = require('playwright-core');
const path = require('path');

async function verify() {
    const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
    const browser = await chromium.launch({
        executablePath: edgePath,
        headless: true
    });
    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 }
    });
    const page = await context.newPage();

    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    // Wait for projects to load (they are in a grid)
    console.log('Waiting for projects or specific UI elements...');
    await page.waitForTimeout(5000);

    // Scroll to trigger reveal animations
    console.log('Scrolling to trigger animations...');
    await page.evaluate(async () => {
        for (let i = 0; i < 5; i++) {
            window.scrollBy(0, 800);
            await new Promise(r => setTimeout(r, 500));
        }
    });

    const screenshotPath = path.join('C:', 'Users', 'KIZMO STORE', '.gemini', 'antigravity', 'brain', 'f417d169-c2d0-4d9e-a4d7-b2e2ca7269e3', 'final_verif_edge.png');
    console.log(`Taking screenshot: ${screenshotPath}`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    console.log('Verification complete.');
    await browser.close();
}

verify().catch(err => {
    console.error('Verification failed:', err);
    process.exit(1);
});
