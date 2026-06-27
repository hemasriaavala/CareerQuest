from fastapi import (
    APIRouter,
    HTTPException
)
from schemas.mission_schema import (
    MissionRequest,
    MissionResponse
)
from agents.mission_agent import (
    create_mission
)

router = APIRouter()


@router.post(
    "/mission",
    response_model=MissionResponse
)
def mission(
    data: MissionRequest
):
    try:
        # data already contains data.taskType validated by your Pydantic model
        generated_mission = create_mission(data)
        
        # Ensure toyHardwareTarget has a default fallback value if the agent omits it
        if hasattr(generated_mission, "get") and "toyHardwareTarget" not in generated_mission:
            generated_mission["toyHardwareTarget"] = "none"
            
        return generated_mission

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate mission: {str(e)}"
        )