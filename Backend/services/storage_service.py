import os


def create_folder(path):
    os.makedirs(
        path,
        exist_ok=True
    )


def file_exists(path):
    return os.path.exists(path)


def delete_file(path):
    if os.path.exists(path):
        os.remove(path)
        return True

    return False