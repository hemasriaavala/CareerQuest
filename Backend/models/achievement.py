from pydantic import BaseModel


class Achievement(BaseModel):
    title: str
    icon: str