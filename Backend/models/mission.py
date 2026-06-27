from pydantic import BaseModel


class MissionRequest(BaseModel):
    age: int
    career: str
    journey: str
    level: int