from pydantic import BaseModel
from typing import Optional


class MissionRequest(BaseModel):
    age: int
    career: str
    journey: str
    level: int
    taskType: str


class MissionResponse(BaseModel):

    missionId: str

    career: str
    journey: str
    age: int
    level: int

    title: str
    description: str

    taskType: str  # 'virtual' or 'practical'
    gameType: str  # 'quiz', 'sorting', 'simulation', etc.
    
    # 🚥 NEW: Identifies which physical toy to track (e.g., 'traffic_signal', 'shape_cubes', 'none')
    toyHardwareTarget: Optional[str] = "none"

    # Quiz / Simulation / Roleplay
    scenario: Optional[str] = None
    question: Optional[str] = None
    options: Optional[list[str]] = None
    answer: Optional[str] = None

    # Common
    instruction: Optional[str] = None

    # Builder
    targetBlocks: Optional[int] = None

    # Sorting
    items: Optional[list[str]] = None
    correctItems: Optional[list[str]] = None

    # Memory
    cards: Optional[list[str]] = None

    # Pattern
    sequence: Optional[list[str]] = None

    # Puzzle
    pieces: Optional[list[str]] = None
    correctOrder: Optional[list[str]] = None

    # Reaction
    target: Optional[str] = None
    rounds: Optional[int] = None

    # Creativity
    minWords: Optional[int] = None

    xp: int

    status: str
    createdAt: str