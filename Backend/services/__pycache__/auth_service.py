from database.user_model import get_user


def authenticate_user(user_id):
    user = get_user(user_id)

    if user:
        return True

    return False