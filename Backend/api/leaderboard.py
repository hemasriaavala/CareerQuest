from fastapi import APIRouter
from database.db import users

router = APIRouter()


@router.get("/leaderboard")
def get_leaderboard():

    if not users:
        return {
            "total_users": 0,
            "leaderboard": []
        }

    leaderboard = sorted(
        users,
        key=lambda user: (
            user["xp"],
            user["missions"]
        ),
        reverse=True
    )

    result = []

    for rank, user in enumerate(
        leaderboard,
        start=1
    ):
        result.append({
            "rank":
                rank,

            "id":
                user["id"],

            "name":
                user["name"],

            "age":
                user["age"],

            "xp":
                user["xp"],

            "level":
                user["level"],

            "missions":
                user["missions"],

            "badge":
                user["badge"]
        })

    return {
        "total_users":
            len(users),

        "leaderboard":
            result
    }