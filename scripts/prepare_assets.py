from __future__ import annotations

import shutil
from pathlib import Path

import fitz
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ROOT.parent / "Master-Scholarship"
PUBLIC_ROOT = ROOT / "public"
PDF_ROOT = PUBLIC_ROOT / "certificates"
THUMB_ROOT = PUBLIC_ROOT / "certificate-thumbs"


ASSETS = [
    {
        "slug": "cv-worapon-sangsasri",
        "source": "Worapon_CV/Worapon_Sangsasri_cv.pdf",
    },
    {
        "slug": "combined-awards-worapon-sangsasri",
        "source": "Award_Worapon_Sangsasri/Combined_Awards_Worapon_Sangsasri.pdf",
    },
    {
        "slug": "ai-awards-english-supporting-documents",
        "source": "SECAI_Nanoelectronic_Systems_Application/04_Additional_Documents_English_AI_Awards_Worapon_Sangsasri.pdf",
    },
    {
        "slug": "wheelsense-hic2026-pitching-certificate",
        "source": "Award_Worapon_Sangsasri/Worapon_HIC2026_Pitching_Certificates.pdf",
    },
    {
        "slug": "wheelsense-inewgen-award-2026-medal",
        "source": "Award_Worapon_Sangsasri/WheelSense_INewGenAward_2026_Medal.pdf",
    },
    {
        "slug": "tse-award-internal-activities",
        "source": "Award_Worapon_Sangsasri/TSE_Award_InternalActivities_Worapon_2067.pdf",
    },
    {
        "slug": "deans-list-2566",
        "source": "Award_Worapon_Sangsasri/Thammasat_Certificate_Worapon_Dean_s_List_2566.pdf",
    },
    {
        "slug": "deans-list-2565",
        "source": "Award_Worapon_Sangsasri/Thammasat_Certificate_Worapon_Dean_s_List_2565.pdf",
    },
    {
        "slug": "labview-battle-thailand-2025-winner",
        "source": "Award_Worapon_Sangsasri/LabVIEW_Battle_Thailand_2025_Winner_Worapon.pdf",
    },
    {
        "slug": "ipitex2026-gold-wheelchair-motion",
        "source": "Award_Worapon_Sangsasri/IPITEX2026_Gold_WheelchairMotion.pdf",
    },
    {
        "slug": "internship-special-contribution-award-2025",
        "source": "Award_Worapon_Sangsasri/Internship_Certificate_SpecialAward_2025.pdf",
    },
    {
        "slug": "embedded-system-tesa-rally-2025",
        "source": "Award_Worapon_Sangsasri/EmbeddedSystem_TESA_Rally_Worapon_2025.pdf",
    },
    {
        "slug": "english-proficiency-tuget-toeic",
        "source": "English_score_Worapon_Sangsasri/Worapon_English_Proficiency_TUGET590_TOEIC790.pdf",
    },
    {
        "slug": "toeic-worapon",
        "source": "English_score_Worapon_Sangsasri/TOEIC-Worapon.pdf",
    },
    {
        "slug": "tuget-information-worapon",
        "source": "English_score_Worapon_Sangsasri/TUGET-information-Worapon.pdf",
    },
]


def render_thumbnail(pdf_path: Path, out_path: Path) -> None:
    with fitz.open(pdf_path) as document:
        page = document.load_page(0)
        pixmap = page.get_pixmap(matrix=fitz.Matrix(1.8, 1.8), alpha=False)
        image = Image.frombytes("RGB", [pixmap.width, pixmap.height], pixmap.samples)
        image.thumbnail((900, 650), Image.Resampling.LANCZOS)
        background = Image.new("RGB", (900, 650), (8, 12, 16))
        offset = ((900 - image.width) // 2, (650 - image.height) // 2)
        background.paste(image, offset)
        background.save(out_path, "JPEG", quality=86, optimize=True)


def main() -> None:
    PDF_ROOT.mkdir(parents=True, exist_ok=True)
    THUMB_ROOT.mkdir(parents=True, exist_ok=True)

    missing: list[str] = []
    for asset in ASSETS:
        source = SOURCE_ROOT / asset["source"]
        if not source.exists():
            missing.append(str(source))
            continue

        pdf_out = PDF_ROOT / f"{asset['slug']}.pdf"
        thumb_out = THUMB_ROOT / f"{asset['slug']}.jpg"
        shutil.copy2(source, pdf_out)
        render_thumbnail(pdf_out, thumb_out)
        print(f"prepared {asset['slug']}")

    if missing:
        print("Missing source files:")
        for path in missing:
            print(f"- {path}")
        raise SystemExit(1)


if __name__ == "__main__":
    main()
