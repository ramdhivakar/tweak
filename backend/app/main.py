from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import ai
from app.api.routes import transcript
from app.core.config import settings
from app.api.routes.ai import router as ai_router


app = FastAPI(
    title="Tweak Backend",
    version="0.1.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    ai_router,
    prefix="/api/ai",
    tags=["AI"],
)


app.include_router(
    transcript.router,
)


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "tweak-backend",
        "environment": settings.app_env,
    }