"""Build web-sized copies of the owner's photos with camera/location metadata removed."""
from pathlib import Path
from PIL import Image, ImageOps
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("photos", type=Path, help="directory containing the owner's approved photo files")
args = parser.parse_args()
out = Path(__file__).resolve().parents[1] / "public/fieldnotes"
out.mkdir(exist_ok=True)
photos = {
    "singapore": "late-2026-05-ai-ready-asean-president-demo-linkedin.jpg",
    "labview": "early-labview-linkedin-1.jpg",
    "tesa": "early-tesa-linkedin-1.jpg",
    "inewgen": "early-inewgen-linkedin-1.jpg",
    "taiwan-booth": "1000092471.jpg",
    "innoserve": "IMG_2401.jpg",
    "ecticon": "late-2026-05-ecticon-bestpaper-linkedin.jpg",
    "youth-scholarship": "1000092483.jpg",
}
for slug, filename in photos.items():
    o = ImageOps.exif_transpose(Image.open(args.photos / filename)).convert("RGB")
    for max_px, suffix in [(1440, ""), (640, "-small")]:
        if suffix and slug not in {"singapore", "taiwan-booth", "innoserve"}:
            continue
        im = o.copy()
        im.thumbnail((max_px, max_px), Image.Resampling.LANCZOS)
        im.info.clear()
        im.save(out / f"{slug}{suffix}.webp", quality=84, method=6)
