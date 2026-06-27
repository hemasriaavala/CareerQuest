from dotenv import load_dotenv
import os

load_dotenv()

# Gemini API
GEMINI_API_KEY = os.getenv(
    "GEMINI_API_KEY",
    ""
)

# App Information
APP_NAME = "CareerQuest API"
APP_VERSION = "1.0.0"

# Database
DATABASE_URL = "sqlite:///careerquest.db"

# XP System
LEVEL_XP = 100

# Upload Folders
UPLOAD_FOLDER = "uploads"
PHOTO_UPLOAD_FOLDER = "uploads/photos"
SCREENSHOT_FOLDER = "uploads/screenshots"

# File Upload Settings
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png"
]