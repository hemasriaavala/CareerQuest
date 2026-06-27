from fastapi import (
    APIRouter,
    HTTPException
)
from datetime import date, datetime

from schemas.register_schema import (
    RegisterRequest,
    RegisterResponse
)
from database.user_model import (
    create_user
)
from database.db import users

router = APIRouter()


@router.post(
    "/register",
    response_model=RegisterResponse
)
def register_user(
    data: RegisterRequest
):

    # Prevent duplicate names
    for user in users:
        if (
            user["name"].lower()
            ==
            data.name.lower()
        ):
            return user

    user = {
        "id":
            len(users) + 1,

        "name":
            data.name,

        "age":
            data.age,

        "xp":
            0,

        "level":
            1,

        "missions":
            0,

        "streak":
            1,

        "badge":
            "Career Explorer",

        "current_career":
            None,

        "last_active_date":
            str(date.today()),

        "created_at":
            datetime.now().isoformat()
    }

    create_user(user)

    return user