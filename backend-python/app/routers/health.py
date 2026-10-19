from datetime import datetime, timezone
from fastapi import APIRouter
from app.config import SERVICE_NAME, SERVICE_VERSION, ENVIRONMENT

router = APIRouter(prefix="/health", tags=["Health"])


@router.get("")
async def get_health():
    return {
        "status": "healthy",
        "service": SERVICE_NAME,
        "version": SERVICE_VERSION,
        "environment": ENVIRONMENT,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
