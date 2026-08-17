from fastapi import APIRouter

from app.schemas.first_interaction import (
    FirstInteractionAIRequest,
    FirstInteractionAIResult,
)

from app.services.first_interaction_ai import (
    generate_first_interaction,
)


router = APIRouter()


@router.post(
    "/first-interaction",
    response_model=FirstInteractionAIResult,
)
def first_interaction(
    request: FirstInteractionAIRequest,
):
    return generate_first_interaction(request)