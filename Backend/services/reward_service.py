def calculate_reward(score):

    if score >= 90:
        return {
            "xp": 25,
            "stars": 3
        }

    elif score >= 70:
        return {
            "xp": 20,
            "stars": 2
        }

    return {
        "xp": 10,
        "stars": 1
    }