import sys, glob
from PIL import Image, ImageDraw
files = sorted(glob.glob(sys.argv[1] + '/beat*.png')); out = sys.argv[2]
cols, s = 9, 260
rows = (len(files) + cols - 1) // cols
sheet = Image.new('RGB', (cols * s, rows * (s + 22)), (24, 24, 24))
d = ImageDraw.Draw(sheet)
for i, f in enumerate(files):
    im = Image.open(f).convert('RGB').resize((s, s))
    x, y = (i % cols) * s, (i // cols) * (s + 22)
    sheet.paste(im, (x, y + 22)); d.text((x + 6, y + 5), f"{i+1}  t={i*0.5+0.42:.2f}", fill=(230, 230, 230))
sheet.save(out)
