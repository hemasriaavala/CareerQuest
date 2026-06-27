from fastapi import APIRouter

router = APIRouter()

CAREERS = [
    {
        "id": 1,
        "name": "Engineer",
        "icon": "⚙️",
        "description":
            "Design and build amazing things."
    },
    {
        "id": 2,
        "name": "Scientist",
        "icon": "🔬",
        "description":
            "Discover and explore new ideas."
    },
    {
        "id": 3,
        "name": "Doctor",
        "icon": "🩺",
        "description":
            "Help people stay healthy."
    },
    {
        "id": 4,
        "name": "Teacher",
        "icon": "📚",
        "description":
            "Inspire and educate others."
    },
    {
        "id": 5,
        "name": "Architect",
        "icon": "🏛️",
        "description":
            "Design beautiful buildings."
    },
    {
        "id": 6,
        "name": "Artist",
        "icon": "🎨",
        "description":
            "Express creativity through art."
    },
    {
        "id": 7,
        "name": "Chef",
        "icon": "👨‍🍳",
        "description":
            "Create delicious dishes."
    },
    {
        "id": 8,
        "name": "Entrepreneur",
        "icon": "💼",
        "description":
            "Build businesses and solve problems."
    },
    {
        "id": 9,
        "name": "Lawyer",
        "icon": "⚖️",
        "description":
            "Protect justice and rights."
    },
    {
        "id": 10,
        "name": "Judge",
        "icon": "👨‍⚖️",
        "description":
            "Make fair decisions."
    },
    {
        "id": 11,
        "name": "Police Officer",
        "icon": "👮",
        "description":
            "Protect people and communities."
    },
    {
        "id": 12,
        "name": "Army Officer",
        "icon": "🪖",
        "description":
            "Serve and defend the nation."
    },
    {
        "id": 13,
        "name": "Pilot",
        "icon": "✈️",
        "description":
            "Fly aircraft and explore the skies."
    },
    {
        "id": 14,
        "name": "Sports Coach",
        "icon": "🏅",
        "description":
            "Train and motivate athletes."
    },
    {
        "id": 15,
        "name": "Farmer",
        "icon": "🌾",
        "description":
            "Grow food and care for nature."
    },
    {
        "id": 16,
        "name": "Detective",
        "icon": "🕵️",
        "description":
            "Solve mysteries and investigate clues."
    }
]


@router.get("/careers")
def get_careers():
    return {
        "total": len(CAREERS),
        "careers": CAREERS
    }