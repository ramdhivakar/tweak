from app.services.groq_client import get_groq_client


def test_groq_connection() -> str:
    client = get_groq_client()

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[
            {
                "role": "user",
                "content": "Reply with exactly: Tweak AI connection successful",
            }
        ],
        temperature=0,
    )

    return response.choices[0].message.content or ""