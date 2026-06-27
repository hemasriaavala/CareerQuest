from pydantic import BaseModel
from typing import Optional


class ProfileResponse(BaseModel):
    id: int
    name: str
    age: int
    xp: int
    level: int
    missions: int
    streak: int
    badge: str

    progress_percentage: Optional[int] = None
    xp_to_next_level: Optional[int] = None
    total_achievements: Optional[int] = None
    total_history: Optional[int] = None
    last_active_date: Optional[str] = None