from datetime import date, datetime


def update_streak(
    current_streak,
    last_active_date
):
    today = date.today()

    # First login
    if not last_active_date:
        return {
            "streak": 1,
            "last_active_date":
                str(today),
            "streak_bonus_xp": 0
        }

    last_date = datetime.strptime(
        last_active_date,
        "%Y-%m-%d"
    ).date()

    days = (
        today - last_date
    ).days

    # Same day
    if days == 0:
        return {
            "streak": current_streak,
            "last_active_date":
                str(today),
            "streak_bonus_xp": 0
        }

    # Consecutive day
    elif days == 1:
        new_streak = (
            current_streak + 1
        )

        bonus_xp = min(
            new_streak * 5,
            50
        )

        return {
            "streak": new_streak,
            "last_active_date":
                str(today),
            "streak_bonus_xp":
                bonus_xp
        }

    # Streak broken
    else:
        return {
            "streak": 1,
            "last_active_date":
                str(today),
            "streak_bonus_xp": 0
        }