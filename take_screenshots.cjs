/* eslint-disable @typescript-eslint/no-require-imports */
const puppeteer = require('puppeteer');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const PAGES = [
    { name: 'home', path: '/' },
    { name: 'company', path: '/company' },
    { name: 'service', path: '/service' },
    { name: 'profile', path: '/profile' },
    { name: 'contact', path: '/contact' }
];

(async () => {
    console.log('Starting screenshot generation...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set viewport to a common desktop resolution
    await page.setViewport({ width: 1280, height: 800 });

    for (const p of PAGES) {
        try {
            console.log(`Navigating to ${p.path}...`);
            await page.goto(`${BASE_URL}${p.path}`, { waitUntil: 'networkidle0' });

            // Wait a bit for animations etc
            await new Promise(r => setTimeout(r, 1000));

            const filename = `screenshot_${p.name}.png`;
            const filepath = path.join(__dirname, filename);

            await page.screenshot({ path: filepath, fullPage: true });
            console.log(`Saved ${filename}`);
        } catch (e) {
            console.error(`Error capturing ${p.name}:`, e.message);
        }
    }

    await browser.close();
    console.log('Done.');
})();
