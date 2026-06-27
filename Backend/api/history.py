from fastapi import APIRouter, HTTPException
from database.db import (
    users,
    history
)

router = APIRouter()


@router.get("/history/{user_id}")
def get_history(user_id: int):

    # Check user exists
    user = next(
        (
            user
            for user in users
            if user["id"] == user_id
        ),
        None
    )

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user_history = [
        item
        for item in history
        if item["user_id"] == user_id
    ]

    # Latest first
    user_history = list(
        reversed(user_history)
    )

    return {
        "user_id":
            user_id,

        "name":
            user["name"],

        "total_missions":
            len(user_history),

        "history":
            user_history
    }