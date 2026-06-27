from fastapi import APIRouter, HTTPException, Body
from datetime import datetime
from database.db import (
    users,
    history
)
from agents.progress_agent import (
    calculate_progress
)

# 🔌 Create the router that main.py is looking for!
router = APIRouter()

def evaluate_mission(
    user_id: int,
    xp_earned: int,
    score: int,
    feedback: str = "",
    mission_title: str = "Mission Completed",
    task_type: str = "virtual"
):
    """
    🏆 Core Mission Evaluation Engine
    Dynamically processes performance logs, handles leveling calculations,
    and updates database tracks for both Practical and Virtual scenarios.
    """
    for user in users:
        if user["id"] == user_id:
            old_level = user["level"]

            # 🆙 1. Update Game Profile Attributes
            user["xp"] += xp_earned
            user["missions"] += 1

            # 🧠 2. Compute Level and Badge Progress Metrics
            progress = calculate_progress(user["xp"])
            user["level"] = progress["level"]
            user["badge"] = progress["badge"]

            # Check if user unlocked a level advancement achievement
            achievement_unlocked = user["level"] > old_level

            # 📝 3. Build Dynamic Task-Specific Feedback Message
            if not feedback:
                if task_type == "practical":
                    feedback = f"Practical inspection approved! Evaluated score: {score}%."
                else:
                    feedback = f"Virtual validation successfully completed! Evaluated score: {score}%."

            # 💾 4. Append Record straight into History tracking database
            history.append({
                "user_id": user_id,
                "mission": mission_title,
                "task_type": task_type,
                "score": score,
                "xp": xp_earned,
                "feedback": feedback,
                "completed": True,
                "completed_at": datetime.now().isoformat()
            })

            # 📡 5. Return Complete Profile Payload State back to caller routes
            return {
                "status": "success",
                "total_xp": user["xp"],
                "level": user["level"],
                "missions": user["missions"],
                "streak": user["streak"],
                "badge": user["badge"],
                "progress_percentage": progress["progress_percentage"],
                "xp_to_next_level": progress["xp_to_next_level"],
                "achievement_unlocked": achievement_unlocked,
                "score": score,
                "feedback": feedback
            }

    return None

# 📡 Optional: Endpoint to trigger evaluations directly via a virtual task POST request
@router.post("/evaluate")
async def evaluate_task_endpoint(
    user_id: int = Body(...),
    xp_earned: int = Body(...),
    score: int = Body(...),
    mission_title: str = Body("Mission Completed"),
    task_type: str = Body("virtual"),
    feedback: str = Body("")
):
    result = evaluate_mission(
        user_id=user_id,
        xp_earned=xp_earned,
        score=score,
        feedback=feedback,
        mission_title=mission_title,
        task_type=task_type
    )
    if not result:
        raise HTTPException(status_code=404, detail="User not found")
    return result