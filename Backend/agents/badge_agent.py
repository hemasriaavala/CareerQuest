def get_badge(level):
    if level >= 20:
        return "Career Master"

    elif level >= 15:
        return "Career Champion"

    elif level >= 10:
        return "Master Explorer"

    elif level >= 5:
        return "Senior Explorer"

    else:
        return "Career Explorer"