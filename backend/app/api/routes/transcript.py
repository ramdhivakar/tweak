from fastapi import APIRouter, File, UploadFile

from app.services.transcript_reader import (
    extract_transcript_text,
)
from app.services.transcript_ai import (
    generate_transcript_ai,
)


router = APIRouter(
    prefix="/api/transcript",
    tags=["Transcript"],
)


@router.post("/extract")
async def extract_transcript(
    file: UploadFile = File(...),
):
    if not file.filename:
        return {
            "success": False,
            "error": "No file provided.",
        }

    if not file.filename.lower().endswith(".docx"):
        return {
            "success": False,
            "error": "Only DOCX files are supported.",
        }

    file_bytes = await file.read()

    if not file_bytes:
        return {
            "success": False,
            "error": "Uploaded file is empty.",
        }

    # Step 1: Extract transcript text
    transcript_text = extract_transcript_text(
        file_bytes
    )

    print(
        "\n========== TRANSCRIPT EXTRACTION =========="
    )
    print(
        "Filename:",
        file.filename,
    )
    print(
        "Characters extracted:",
        len(transcript_text),
    )
    print(
        "===========================================\n"
    )

    # Step 2: Send transcript to AI
    ai_result = generate_transcript_ai(
        transcript_text
    )

    return {
        "success": True,
        "filename": file.filename,
        "transcript": transcript_text,
        "aiResult": ai_result,
    }