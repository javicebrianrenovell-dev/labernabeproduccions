// Render film.html with Playwright.
//   node render.mjs beats  <outdir>            → one frame per beat (QA)
//   node render.mjs frames <outdir> <fps> <worker> <workers> [t0] [t1]  → t = i/fps
import { createRequire } from 'module';
const { chromium } = createRequire(import.meta.url)(process.env.PW);
const [mode, out, fpsArg, wArg, nwArg, t0Arg, t1Arg] = process.argv.slice(2);
const URL = process.env.FILM_URL || 'http://127.0.0.1:8765/film.html';
const H = +(process.env.FILM_H || 1440);
const b = await chromium.launch({ args: ['--disable-gpu-vsync', '--disable-frame-rate-limit'] });
const p = await b.newPage({ viewport: { width: 1440, height: H } });
p.on('pageerror', e => console.log('ERR', e.message));
await p.goto(URL); await p.evaluate(() => window.ready);
const shot = async (t, path) => { await p.evaluate(t => window.seek(t), t); await p.screenshot({ path, type: path.endsWith('.jpg') ? 'jpeg' : 'png', quality: path.endsWith('.jpg') ? 93 : undefined, clip: { x: 0, y: 0, width: 1440, height: H } }); };
if (mode === 'beats') {
  for (let bt = 1; bt <= 54; bt++) await shot((bt - 1) * .5 + .42, `${out}/beat${String(bt).padStart(2, '0')}.png`);
} else if (mode === 'at') {
  for (const t of fpsArg.split(',').map(Number)) await shot(t, `${out}/t${t.toFixed(3)}.png`);
} else {
  const fps = +fpsArg, w = +wArg, nw = +nwArg, t0 = +(t0Arg ?? 0), t1 = +(t1Arg ?? 27);
  const N = Math.round((t1 - t0) * fps);
  const start = performance.now();
  for (let i = w; i < N; i += nw) {
    const fi = Math.round(t0 * fps) + i;
    await shot(fi / fps, `${out}/f${String(fi).padStart(5, '0')}.jpg`);
    if (i % (nw * 100) === w) console.log(`w${w} ${i}/${N} ${((performance.now() - start) / 1000).toFixed(0)}s`);
  }
}
await b.close();
