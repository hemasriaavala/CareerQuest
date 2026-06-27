def calculate_level(xp):
    return (xp // 100) + 1


def xp_to_next_level(xp):
    next_level_xp = (
        ((xp // 100) + 1) * 100
    )
    return next_level_xp - xp


def progress_percentage(xp):
    return xp % 100