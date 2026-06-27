from pydantic import BaseModel


class HistoryItem(BaseModel):
    mission: str
    score: int
    xp: int
    completed: bool