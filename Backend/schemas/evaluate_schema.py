from pydantic import BaseModel


class EvaluateRequest(
    BaseModel
):
    user_id: int
    xp_earned: int
    score: int


class EvaluateResponse(
    BaseModel
):
    mission_completed: bool
    score: int
    xp_earned: int
    total_xp: int
    level: int
    missions: int
    streak: int
    badge: str
    progress_percentage: int
    xp_to_next_level: int
    achievement_unlocked: bool