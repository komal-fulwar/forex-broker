import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync } from 'fs';

const URL = 'http://localhost:5175';
const TOTAL_SLIDES = 8;
const OUT_DIR = '/tmp/slides_hq';

(async () => {
  try { mkdirSync(OUT_DIR, { recursive: true }); } catch {}

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // 2x device scale factor for high-resolution
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
  
  await page.goto(URL, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  // Inject CSS to permanently hide all UI controls
  await page.addStyleTag({
    content: `
      .nav-controls, .nav-btn, .slide-counter, .notes-btn, 
      .speaker-notes, .notes-toggle, .slide-nav, .notes-panel,
      .notes-label { 
        display: none !important; 
        visibility: hidden !important; 
      }
    `
  });

  for (let i = 0; i < TOTAL_SLIDES; i++) {
    await new Promise(r => setTimeout(r, 500));
    const buf = await page.screenshot({ type: 'png', fullPage: false });
    writeFileSync(`${OUT_DIR}/slide_${i + 1}.png`, buf);
    console.log(`Saved slide ${i + 1}/${TOTAL_SLIDES} (${(buf.length/1024).toFixed(0)} KB)`);
    if (i < TOTAL_SLIDES - 1) { await page.keyboard.press('ArrowRight'); await new Promise(r => setTimeout(r, 500)); }
  }

  await browser.close();
  console.log('\n✅ High-res slides saved (no UI controls)');
})();
