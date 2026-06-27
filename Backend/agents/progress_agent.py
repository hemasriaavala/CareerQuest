from constants import LEVEL_XP


def calculate_progress(xp):

    level = (xp // 100) + 1

    if level >= 10:
        badge = "Visionary"
    elif level >= 7:
        badge = "Inventor"
    elif level >= 5:
        badge = "Innovator"
    elif level >= 3:
        badge = "Creator"
    else:
        badge = "Career Explorer"

    current_level_xp = xp % LEVEL_XP
    xp_to_next_level = LEVEL_XP - current_level_xp

    if current_level_xp == 0 and xp > 0:
        progress_percentage = 100
        xp_to_next_level = 0
    else:
        progress_percentage = current_level_xp

    return {
        "level": level,
        "badge": badge,
        "progress_percentage":
            progress_percentage,
        "xp_to_next_level":
            xp_to_next_level
    }