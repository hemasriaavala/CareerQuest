# App Information
APP_NAME = "CareerQuest API"
APP_VERSION = "1.0.0"


# Age Limits
MIN_AGE = 5
MAX_AGE = 16


# XP and Level System
LEVEL_XP = 100

DEFAULT_XP = 0
DEFAULT_LEVEL = 1
DEFAULT_MISSIONS = 0
DEFAULT_STREAK = 1
DEFAULT_BADGE = "Career Explorer"


# Badge System
BADGES = [
    "Career Explorer",  # Level 1-2
    "Creator",          # Level 3-4
    "Innovator",        # Level 5-6
    "Inventor",         # Level 7-9
    "Visionary"         # Level 10+
]


# Mission Types
MISSION_TYPES = [
    "Virtual",
    "Practical"
]


# Supported Game Types
GAME_TYPES = [
    "builder",
    "quiz",
    "sorting",
    "memory",
    "pattern",
    "reaction",
    "roleplay",
    "puzzle",
    "creativity",
    "simulation"
]


# Supported Careers
CAREERS = [
    "Engineer",
    "Scientist",
    "Doctor",
    "Artist",
    "Architect",
    "Teacher",
    "Detective",
    "Police Officer",
    "Army Officer",
    "Lawyer",
    "Judge",
    "Entrepreneur",
    "Pilot",
    "Sports Coach",
    "Farmer",
    "Chef"
]


# Upload Folders
PHOTO_UPLOAD_FOLDER = "uploads/photos"
SCREENSHOT_UPLOAD_FOLDER = "uploads/screenshots"


# File Upload Settings
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png"
]