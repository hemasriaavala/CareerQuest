from pydantic import BaseModel
from typing import Optional


class DashboardResponse(
    BaseModel
):
    id: int
    name: str
    age: int
    xp: int
    level: int
    badge: str
    missions: int
    streak: int
    progress_percentage: int
    xp_to_next_level: int
    total_achievements: int
    total_history: int
    last_active_date: Optional[str]