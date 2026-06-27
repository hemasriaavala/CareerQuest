from fastapi import APIRouter, HTTPException
from database.db import users

router = APIRouter()


@router.get("/achievements/{user_id}")
def get_achievements(user_id: int):

    for user in users:
        if user["id"] == user_id:

            achievements = []

            if user["missions"] >= 1:
                achievements.append({
                    "title": "First Mission Completed",
                    "icon": "🎯"
                })

            if user["missions"] >= 5:
                achievements.append({
                    "title": "Mission Explorer",
                    "icon": "🚀"
                })

            if user["missions"] >= 10:
                achievements.append({
                    "title": "Mission Master",
                    "icon": "🏆"
                })

            if user["level"] >= 2:
                achievements.append({
                    "title": "Level Up Hero",
                    "icon": "⭐"
                })

            if user["level"] >= 5:
                achievements.append({
                    "title": "Senior Explorer",
                    "icon": "🌟"
                })

            if user["level"] >= 10:
                achievements.append({
                    "title": "Master Explorer",
                    "icon": "👑"
                })

            if user["streak"] >= 7:
                achievements.append({
                    "title": "7 Day Streak",
                    "icon": "🔥"
                })

            return {
                "user_id": user_id,
                "name": user["name"],
                "totalAchievements":
                    len(achievements),
                "achievements":
                    achievements
            }

    raise HTTPException(
        status_code=404,
        detail="User not found"
    )