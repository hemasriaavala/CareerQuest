from datetime import datetime
from database.db import (
    users,
    history
)
from agents.progress_agent import (
    calculate_progress
)


def evaluate_mission(
    user_id,
    xp_earned,
    score,
    mission_title="Mission Completed"
):
    for user in users:

        if user["id"] == user_id:

            old_level = user["level"]

            # Update XP
            user["xp"] += xp_earned

            # Update missions
            user["missions"] += 1

            # 🛑 STREAK REMOVED FROM MISSION COMPLETION
            # Streak calculations are now managed on daily login initialization via frontend

            # Calculate progress
            progress = calculate_progress(
                user["xp"]
            )

            user["level"] = (
                progress["level"]
            )

            user["badge"] = (
                progress["badge"]
            )

            # Achievement unlocked?
            achievement_unlocked = (
                user["level"] >
                old_level
            )

            # Save history
            history.append({
                "user_id":
                    user_id,

                "mission":
                    mission_title,

                "score":
                    score,

                "xp":
                    xp_earned,

                "completed":
                    True,

                "completed_at":
                    datetime.now(
                    ).isoformat()
            })

            return {
                "total_xp":
                    user["xp"],

                "level":
                    user["level"],

                "missions":
                    user["missions"],

                "streak":
                    user["streak"],  # Safely returns the stable current streak count

                "badge":
                    user["badge"],

                "progress_percentage":
                    progress[
                        "progress_percentage"
                    ],

                "xp_to_next_level":
                    progress[
                        "xp_to_next_level"
                    ],

                "achievement_unlocked":
                    achievement_unlocked
            }

    return None