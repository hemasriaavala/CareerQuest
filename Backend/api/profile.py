from fastapi import APIRouter, HTTPException
from database.db import (
    users,
    history
)
from agents.progress_agent import (
    calculate_progress
)

router = APIRouter()


@router.get("/profile/{user_id}")
def get_profile(user_id: int):

    for user in users:

        if user["id"] == user_id:

            progress = calculate_progress(
                user["xp"]
            )

            achievement_count = 0

            if user["missions"] >= 1:
                achievement_count += 1

            if user["missions"] >= 5:
                achievement_count += 1

            if user["missions"] >= 10:
                achievement_count += 1

            if user["level"] >= 2:
                achievement_count += 1

            if user["level"] >= 5:
                achievement_count += 1

            if user["level"] >= 10:
                achievement_count += 1

            return {
                "id":
                    user["id"],

                "name":
                    user["name"],

                "age":
                    user["age"],

                "xp":
                    user["xp"],

                "level":
                    progress["level"],

                "missions":
                    user["missions"],

                "streak":
                    user["streak"],

                "badge":
                    progress["badge"],

                "progress_percentage":
                    progress[
                        "progress_percentage"
                    ],

                "xp_to_next_level":
                    progress[
                        "xp_to_next_level"
                    ],

                "total_achievements":
                    achievement_count,

                "total_history":
                    len([
                        item
                        for item in history
                        if item["user_id"]
                        == user_id
                    ]),

                "last_active_date":
                    user.get(
                        "last_active_date"
                    )
            }

    raise HTTPException(
        status_code=404,
        detail="User not found"
    )