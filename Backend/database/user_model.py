from database.db import users


def create_user(user):
    users.append(user)
    return user


def get_user(user_id):
    for user in users:
        if user["id"] == user_id:
            return user
    return None


def get_all_users():
    return users


def update_user(
    user_id,
    data
):
    user = get_user(user_id)

    if user:
        user.update(data)
        return user

    return None


def delete_user(
    user_id
):
    user = get_user(user_id)

    if user:
        users.remove(user)
        return True

    return False