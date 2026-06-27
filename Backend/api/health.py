from fastapi import APIRouter
from datetime import datetime

router = APIRouter()


@router.get("/health")
def health():

    return {
        "status": "healthy",
        "message":
            "CareerQuest Backend Running 🚀",
        "service":
            "CareerQuest API",
        "version":
            "1.0.0",
        "timestamp":
            datetime.now().isoformat()
    }