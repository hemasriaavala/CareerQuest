from pydantic import BaseModel


class Progress(BaseModel):
    total_xp: int
    level: int
    missions: int
    streak: int
    badge: str