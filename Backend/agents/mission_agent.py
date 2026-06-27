import uuid
from datetime import datetime
from services.gemini_service import generate_mission

def create_mission(data):
    """
    Triggers the structured Gemini engine and packages the resulting payload
    with structural metadata for database storage and client routing.
    """
    # 1. Fetch the completely validated game dictionary from the AI service
    mission = generate_mission(
        age=data.age,
        career=data.career,
        journey=data.journey,
        level=data.level,
        task_type=data.taskType
    )

    # Ensure a safe fallback for the physical toy parameter if the AI omits it
    if "toyHardwareTarget" not in mission:
        mission["toyHardwareTarget"] = "none"

    # 2. Return a unified dictionary ready for MongoDB / SQL / Frontend
    return {
        "missionId": str(uuid.uuid4()),
        "career": data.career,
        "journey": data.journey,
        "age": data.age,
        "level": data.level,
        "status": "Pending",
        "createdAt": datetime.now().isoformat(),
        
        # Unpacks all specific game engine parameters dynamically (options, pieces, scenario, etc.)
        **mission 
    }