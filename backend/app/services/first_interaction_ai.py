import json

from app.schemas.first_interaction import (
    FirstInteractionAIRequest,
    FirstInteractionAIResult,
)

from app.services.groq_client import get_groq_client
from app.services.first_interaction_prompt import (
    SYSTEM_PROMPT,
    build_case_prompt,
)


FIRST_INTERACTION_SCHEMA = {
    "type": "object",
    "properties": {
        "connectedTime": {
            "type": "string",
        },
        "contactMode": {
            "type": "string",
        },
        "troubleshootingSteps": {
            "type": "string",
        },
        "resolutionSummary": {
            "type": "string",
        },
        "status": {
            "type": "string",
            "enum": [
                "Pending Customer",
                "Pending Support",
                "Pending Engineering",
            ],
        },
        "logsCollected": {
            "type": "boolean",
        },
        "logFindings": {
            "type": "string",
        },
    },
    "required": [
        "connectedTime",
        "contactMode",
        "troubleshootingSteps",
        "resolutionSummary",
        "status",
        "logsCollected",
        "logFindings",
    ],
    "additionalProperties": False,
}


def generate_first_interaction(
    request: FirstInteractionAIRequest,
) -> FirstInteractionAIResult:

    if not request.case:
        return FirstInteractionAIResult()

    client = get_groq_client()

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT,
            },
            {
                "role": "user",
                "content": build_case_prompt(request.case),
            },
        ],
        response_format={
            "type": "json_schema",
            "json_schema": {
                "name": "first_interaction",
                "strict": True,
                "schema": FIRST_INTERACTION_SCHEMA,
            },
        },
        temperature=0,
    )

    content = response.choices[0].message.content

    if not content:
        raise RuntimeError(
            "Groq returned an empty response."
        )

    result = json.loads(content)

    return FirstInteractionAIResult.model_validate(result)