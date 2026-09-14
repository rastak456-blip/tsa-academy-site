"""Create responsive WebP assets from the site's photographic source files."""

import json
from pathlib import Path

from PIL import Image


PROJECT_ROOT = Path(__file__).resolve().parents[1]
ASSET_DIRECTORY = PROJECT_ROOT / "assets" / "site"
SOURCE_DIRECTORY = PROJECT_ROOT / "images"
SITE_SOURCE_DIRECTORY = SOURCE_DIRECTORY / "source-site"
TARGET_WIDTHS = (640, 960)
MAX_WIDTH = 1200
FACILITY_MAX_WIDTH = 1920
WEBP_QUALITY = 78


def resized(image: Image.Image, target_width: int) -> Image.Image:
    width = min(image.width, target_width)
    if width == image.width:
        return image.copy()
    height = round(image.height * width / image.width)
    return image.resize((width, height), Image.Resampling.LANCZOS)


def convert(source: Path, output_stem: str, max_width: int = MAX_WIDTH) -> None:
    with Image.open(source) as original:
        image = original.convert("RGB")
        main = resized(image, max_width)
        main.save(
            ASSET_DIRECTORY / f"{output_stem}.webp",
            "WEBP",
            quality=WEBP_QUALITY,
            method=6,
        )

        for target_width in TARGET_WIDTHS:
            variant = resized(image, target_width)
            variant.save(
                ASSET_DIRECTORY / f"{output_stem}-{target_width}.webp",
                "WEBP",
                quality=WEBP_QUALITY,
                method=6,
            )


def build_manifest() -> None:
    manifest = {}
    for webp_path in sorted(ASSET_DIRECTORY.glob("*.webp")):
        if webp_path.stem.endswith(("-640", "-960")):
            continue
        with Image.open(webp_path) as image:
            variants = []
            for variant_path in sorted(ASSET_DIRECTORY.glob(f"{webp_path.stem}-*.webp")):
                with Image.open(variant_path) as variant:
                    variants.append({"file": variant_path.name, "width": variant.width})
            variants.append({"file": webp_path.name, "width": image.width})
            manifest[webp_path.name] = {
                "width": image.width,
                "height": image.height,
                "variants": variants,
            }

    (ASSET_DIRECTORY / "image-manifest.json").write_text(
        json.dumps(manifest, indent=2) + "\n",
        encoding="utf-8",
    )


for png_path in sorted(SITE_SOURCE_DIRECTORY.glob("*.png")):
    convert(png_path, png_path.stem)

facility_source = SOURCE_DIRECTORY / "facility-safety-original.jpg"
if facility_source.exists():
    convert(facility_source, "facility-safety", FACILITY_MAX_WIDTH)

build_manifest()
