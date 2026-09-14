"""Fetch remote site images once and record intrinsic dimensions for stable HTML."""

import io
import json
import re
import urllib.request
from pathlib import Path

from PIL import Image


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = PROJECT_ROOT / "src"
OUTPUT_PATH = Path(__file__).resolve().parent / "remote-image-manifest.json"
IMAGE_PATTERN = re.compile(r'<img\b[^>]*\ssrc="(https://[^"]+)"')

urls = set()
for html_path in SOURCE_ROOT.rglob("*.html"):
    urls.update(IMAGE_PATTERN.findall(html_path.read_text(encoding="utf-8")))

manifest = {}
errors = {}
for url in sorted(urls):
    try:
        request = urllib.request.Request(url, headers={"User-Agent": "TSA image audit/1.0"})
        with urllib.request.urlopen(request, timeout=30) as response:
            payload = response.read()
        with Image.open(io.BytesIO(payload)) as image:
            manifest[url] = {"width": image.width, "height": image.height}
    except Exception as error:  # Report every URL that could not be measured.
        errors[url] = str(error)

OUTPUT_PATH.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
print(f"Measured {len(manifest)} remote images; {len(errors)} failed.")
for url, error in errors.items():
    print(f"FAILED {url}: {error}")

