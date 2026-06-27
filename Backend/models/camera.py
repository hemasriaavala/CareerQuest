from pydantic import BaseModel


class CameraUpload(BaseModel):
    filename: str
    path: str