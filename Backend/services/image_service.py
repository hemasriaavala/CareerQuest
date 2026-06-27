import os


def is_image(filename):
    extensions = (
        ".jpg",
        ".jpeg",
        ".png"
    )

    return filename.lower().endswith(
        extensions
    )


def get_image_info(path):
    return {
        "exists":
            os.path.exists(path),
        "path":
            path
    }