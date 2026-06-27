from pydantic import BaseModel


class Leaderboard(BaseModel):
    rank: int
    name: str
    xp: int
    level: int
    badge: str