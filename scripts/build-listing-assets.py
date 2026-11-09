"""Rebuild original vector-style listing graphics. Requires Pillow and fonttools."""
from pathlib import Path
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parent.parent
out = root / 'docs' / 'listing-assets'
out.mkdir(parents=True, exist_ok=True)
scale = 4
ink, paper, blue = '#202124', '#f8f9fa', '#1a73e8'

def font(name, weight, size):
    face = TTFont(root / f'node_modules/@fontsource/{name}/files/{name}-latin-{weight}-normal.woff')
    face.flavor = None
    data = BytesIO()
    face.save(data)
    data.seek(0)
    return ImageFont.truetype(data, size * scale)

def icon(size):
    im = Image.new('RGBA', (128*scale, 128*scale), (0,0,0,0))
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((0,0,128*scale-1,128*scale-1), radius=28*scale, fill=ink)
    for points in [[(39,35),(62,62),(83,35)],[(62,62),(44,93)]]:
        d.line([(x*scale,y*scale) for x,y in points], fill='white', width=10*scale, joint='curve')
    for x,y in [(39,35),(83,35),(44,93)]:
        d.ellipse(((x-5)*scale,(y-5)*scale,(x+5)*scale,(y+5)*scale),fill='white')
    d.rounded_rectangle((78*scale,86*scale,102*scale,94*scale),radius=4*scale,fill=blue)
    return im.resize((size,size), Image.Resampling.LANCZOS)

for size in [32,48,96,128,512]:
    icon(size).save(out / f'icon-{size}.png')
svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="28" fill="#202124"/><path d="M39 35 62 62 83 35M62 62 44 93" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M82 90h16" stroke="#1a73e8" stroke-width="8" stroke-linecap="round"/></svg>'
(out / 'icon.svg').write_text(svg, encoding='utf-8')
im = Image.new('RGB',(220*scale,140*scale),paper)
d=ImageDraw.Draw(im)
d.text((16*scale,12*scale),'yourIntelligent',font=font('dm-sans',500,18),fill=ink)
d.line((16*scale,45*scale,204*scale,45*scale),fill='#dadce0',width=scale)
d.text((16*scale,57*scale),'Start with',font=font('dm-sans',500,25),fill=ink)
d.text((16*scale,86*scale),'your words.',font=font('dm-sans',500,25),fill=ink)
d.line((182*scale,121*scale,204*scale,121*scale),fill=blue,width=3*scale)
im.resize((220,140),Image.Resampling.LANCZOS).save(out/'card-220x140.png')
for path in sorted(out.glob('*.png')):
    with Image.open(path) as result:
        print(path.name, result.size, result.mode)
