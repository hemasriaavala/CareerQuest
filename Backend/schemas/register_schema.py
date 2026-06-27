from pydantic import BaseModel, Field
from typing import Optional


class RegisterRequest(BaseModel):
    name: str
    age: int = Field(
        ge=5,
        le=16
    )


class RegisterResponse(BaseModel):
    id: int
    name: str
    age: int
    xp: int
    level: int
    missions: int
    streak: int
    badge: str

    current_career: Optional[str] = None
    last_active_date: Optional[str] = None
    created_at: Optional[str] = None