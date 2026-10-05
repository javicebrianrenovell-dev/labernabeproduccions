import { createRequire } from 'module';
const { chromium } = createRequire(import.meta.url)(process.env.PW);
const [dir] = process.argv.slice(2);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 1440 } });
await p.goto('file://' + dir + '/tools/wallgen.html');
for (let i = 0; i < 180; i++) { await p.evaluate(t => window.draw(t), i / 30); await p.locator('#c').screenshot({ path: `${process.env.OUT}/w${String(i).padStart(4, '0')}.png` }); }
await b.close();
