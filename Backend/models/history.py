from pydantic import BaseModel


class History(BaseModel):
    user_id: int
    mission: str
    score: int
    xp: int
    completed: bool