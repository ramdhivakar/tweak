from io import BytesIO

from docx import Document


def extract_transcript_text(file_bytes: bytes) -> str:
    """
    Extract readable text from a DOCX file provided as bytes.

    Paragraphs are preserved as separate lines.
    Empty paragraphs are ignored.
    """

    if not file_bytes:
        raise ValueError(
            "The transcript file is empty."
        )

    document = Document(
        BytesIO(file_bytes)
    )

    paragraphs: list[str] = []

    for paragraph in document.paragraphs:
        text = paragraph.text.strip()

        if text:
            paragraphs.append(text)

    transcript_text = "\n".join(
        paragraphs
    ).strip()

    if not transcript_text:
        raise ValueError(
            "The transcript does not contain readable text."
        )

    return transcript_text