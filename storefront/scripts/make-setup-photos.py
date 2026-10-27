"""
Makes the representative pictures for the shop's own PC builds and complete
setups (public/products/pc-*.jpg and setup-*.jpg) from the official brand
photos in public/products. The shop sells its own builds, which have no photo
of their own yet; these pictures show the kind of parts used and are marked
"representative image" on the product page.

Run from the storefront folder:  python3 scripts/make-setup-photos.py
Needs Pillow (pip install pillow).
"""
from pathlib import Path

from PIL import Image, ImageChops, ImageFilter

DIR = Path(__file__).resolve().parent.parent / "public" / "products"
SIZE = 1000
MARGIN = 70


def cutout(name: str) -> Image.Image:
    """The item from a photo on white, cropped, with a soft mask so it can overlap others."""
    im = Image.open(DIR / name).convert("RGB")
    diff = ImageChops.difference(im, Image.new("RGB", im.size, (255, 255, 255))).convert("L")
    mask = diff.point(lambda v: 255 if v > 12 else 0).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(1.2))
    box = mask.getbbox()
    rgba = im.copy()
    rgba.putalpha(mask)
    return rgba.crop(box)


def place(canvas: Image.Image, name: str, height: int, center_x: int, bottom: int) -> None:
    item = cutout(name)
    w = round(item.width * height / item.height)
    item = item.resize((w, height), Image.LANCZOS)
    canvas.alpha_composite(item, (center_x - w // 2, bottom - height))


def shadow(canvas: Image.Image, center_x: int, bottom: int, width: int) -> None:
    """Soft floor shadow under an item."""
    layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    from PIL import ImageDraw

    ImageDraw.Draw(layer).ellipse((center_x - width // 2, bottom - 14, center_x + width // 2, bottom + 14), fill=(15, 23, 42, 60))
    canvas.alpha_composite(layer.filter(ImageFilter.GaussianBlur(10)))


def save(canvas: Image.Image, name: str) -> None:
    """Fits the drawn items into a square picture with an even white margin."""
    art = canvas.crop(canvas.getbbox())
    inner = SIZE - 2 * MARGIN
    scale = min(inner / art.width, inner / art.height)
    art = art.resize((round(art.width * scale), round(art.height * scale)), Image.LANCZOS)
    out = Image.new("RGB", (SIZE, SIZE), (255, 255, 255))
    out.paste(art, ((SIZE - art.width) // 2, (SIZE - art.height) // 2), mask=art.split()[3])
    out.save(DIR / name, quality=88, optimize=True)
    print("wrote", name)


def new() -> Image.Image:
    # Wide work area; save() crops and centres the result
    return Image.new("RGBA", (1600, 1100), (255, 255, 255, 0))


def gaming_pc(name: str, cpu: str, gpu: str | None) -> None:
    c = new()
    shadow(c, 700, 880, 420)
    place(c, "msi-mag-forge-100r.jpg", 720, 700, 880)
    if gpu:
        shadow(c, 390, 905, 360)
        place(c, gpu, 200, 390, 905)
    place(c, cpu, 250 if gpu else 300, 330, 690 if gpu else 900)
    save(c, name)


def setup(name: str, monitor: str, monitors: int = 1) -> None:
    c = new()
    if monitors == 2:
        place(c, monitor, 430, 330, 640)
        place(c, monitor, 430, 815, 640)
        tower_x = 1250
    else:
        place(c, monitor, 560, 520, 680)
        tower_x = 1080
    shadow(c, tower_x, 900, 240)
    place(c, "msi-mag-forge-100r.jpg", 520, tower_x, 900)
    shadow(c, 560 if monitors == 1 else 580, 960, 560)
    place(c, "zebronics-keyboard-mouse.jpg", 230, 560 if monitors == 1 else 580, 965)
    save(c, name)


gaming_pc("pc-gaming-amd.jpg", "amd-ryzen-5.jpg", None)
gaming_pc("pc-gaming-amd-r7.jpg", "amd-ryzen-7.jpg", "gigabyte-rtx-3050.jpg")
gaming_pc("pc-gaming-white.jpg", "amd-ryzen-7-7700x.jpg", "rtx-5060.jpg")
gaming_pc("pc-gaming-intel.jpg", "intel-core-i7.jpg", "msi-rtx-5060-ti.jpg")
setup("setup-gaming.jpg", "msi-g244f.jpg")
setup("setup-gaming-lite.jpg", "msi-g244f.jpg")
setup("setup-gaming-24.jpg", "msi-g274f.jpg")
setup("setup-office.jpg", "msi-pro-mp241x.jpg")
setup("setup-budget.jpg", "msi-pro-mp241x.jpg")
setup("setup-trading.jpg", "msi-pro-mp241x.jpg", monitors=2)


# ----- Cut-outs for the home page banners (public/hero/*.webp, transparent) -----
HERO = DIR.parent / "hero"
HERO.mkdir(exist_ok=True)


def hero_cutout(src: str, name: str, height: int = 640) -> None:
    item = cutout(src)
    w = round(item.width * height / item.height)
    item.resize((w, height), Image.LANCZOS).save(HERO / name, "WEBP", quality=86, method=6)
    print("wrote hero/" + name)


def hero_from(canvas_name: str, name: str, height: int = 640) -> None:
    """Cut-out of one of the composed pictures above."""
    hero_cutout(canvas_name, name, height)


hero_cutout("hp-victus-15.jpg", "laptop-victus.webp", 520)
hero_cutout("apple-macbook-air-13.jpg", "macbook.webp", 460)
hero_cutout("apple-mac-mini.jpg", "mac-mini.webp", 300)
hero_cutout("hp-elitebook-840.jpg", "elitebook.webp", 460)
hero_cutout("msi-mag-forge-100r.jpg", "cabinet.webp", 700)
hero_cutout("msi-g274f.jpg", "monitor-gaming.webp", 600)
hero_cutout("canon-pixma-g3012.jpg", "printer.webp", 420)
hero_cutout("rtx-5060.jpg", "gpu.webp", 360)
hero_from("pc-gaming-intel.jpg", "pc-gaming.webp", 720)
hero_from("setup-office.jpg", "setup-office.webp", 640)
hero_from("setup-trading.jpg", "setup-trading.webp", 560)
