import os
import json
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()

# Initialize your standard SDK client
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

# Definitive list of your 10 React game engines
AVAILABLE_GAMES = [
    "quiz", "reaction", "roleplay", "simulation", "sorting", 
    "builder", "puzzle", "memory", "pattern", "creativity"
]

# Physical hardware tracking modules
PHYSICAL_TOYS = [
    "traffic_signal",  # e.g., Police Officer role
    "shape_cubes",     # e.g., Teacher / Architect role
    "tangram_puzzle",  # e.g., Engineering / Design role
    "color_blocks"     # e.g., Sorting / Categorization
]

def generate_mission(age: int, career: str, journey: str, level: int, task_type: str):
    """
    Generates a career exploration task for a specific age group.
    Forces Gemini to output an exact JSON structure matching the frontend game engine mechanics.
    Supports physical toy targets for practical missions.
    """
    
    # 1. Determine Game Type and Toy Targets based on the track selection
    if task_type == "practical":
        game_type = "quiz"  # Base interactive UI container layout
        toy_hardware_target = PHYSICAL_TOYS[level % len(PHYSICAL_TOYS)]
    else:
        game_type = AVAILABLE_GAMES[level % len(AVAILABLE_GAMES)]
        toy_hardware_target = "none"

    # 2. Build system directives tailored to child age groups & physical hardware
    practical_instructions = f"""
    CRITICAL PRACTICAL MISSION RULE:
    The taskType is 'practical'. The child must interact with a physical toy module ({toy_hardware_target}) 
    in the real world right in front of their Raspberry Pi camera rig.
    Provide highly descriptive, engaging, age-appropriate steps in the 'instruction' field telling 
    them exactly how to assemble or set up the toy (e.g., 'Arrange your shape cubes into a small house' 
    or 'Turn on the green light on your traffic signal block').
    """

    prompt = f"""
    You are a child-friendly arcade toy task generator.
    Generate a task with the following settings:
    - Target Child Age: {age} Years Old (Keep text highly engaging, age-appropriate, and descriptive)
    - Career Track: {career}
    - Stage/Journey: {journey}
    - Level: {level}
    - Task Type: {task_type} ('virtual' or 'practical')
    - Game Runtime Engine: {game_type}
    - Toy Hardware Target: {toy_hardware_target}

    {practical_instructions if task_type == "practical" else ""}

    Game Engine Data Field Requirements:
    - If gameType is 'quiz' or taskType is 'practical': Provide a clear 'question', an array of 3-4 simple strings under 'options', and the correct answer text match under 'answer'.
    - If gameType is 'sorting': Provide an array of scrambled elements in 'items', and the elements that belong to the correct group in 'correctItems'.
    - If gameType is 'builder': Set 'targetBlocks' to an integer representing the exact number of blocks required to stack.
    - If gameType is 'pattern': Provide a text-based logical pattern sequence string under 'sequence' (e.g., 'Design ➡️ Build ➡️ Test ➡️ Design ➡️ Build ➡️ ?') and the solution under 'answer'.
    - If gameType is 'simulation' or 'roleplay': Create an immersive dilemma under 'scenario' with choosing branch paths under 'options'.
    """

    # 3. Strict schema definition mapping to the frontend local storage handlers
    json_schema = {
        "type": "OBJECT",
        "properties": {
            "title": {"type": "STRING"},
            "description": {"type": "STRING"},
            "instruction": {"type": "STRING"},
            "taskType": {"type": "STRING"},
            "gameType": {"type": "STRING"},
            "toyHardwareTarget": {"type": "STRING"},
            "question": {"type": "STRING"},
            "options": {"type": "ARRAY", "items": {"type": "STRING"}},
            "answer": {"type": "STRING"},
            "scenario": {"type": "STRING"},
            "items": {"type": "ARRAY", "items": {"type": "STRING"}},
            "correctItems": {"type": "ARRAY", "items": {"type": "STRING"}},
            "targetBlocks": {"type": "INTEGER"},
            "sequence": {"type": "STRING"},
            "xp": {"type": "INTEGER"}
        },
        "required": ["title", "description", "instruction", "taskType", "gameType", "toyHardwareTarget", "xp"]
    }

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=json_schema,
                temperature=0.7
            )
        )

        return json.loads(response.text)

    except Exception as e:
        print(f"⚠️ Gemini SDK error caught: {str(e)}")
        # Safe fallback block so your hardware application loop never breaks during evaluation
        return {
            "title": f"Junior {career} Basecamp",
            "description": f"Kickstart your real-world exploration into {career}!",
            "instruction": "Set up your physical Traffic Signal block with the GREEN light facing the camera rig to allow safe traffic flow!",
            "taskType": "practical",
            "gameType": "quiz",
            "toyHardwareTarget": "traffic_signal",
            "question": "What action should drivers take when the traffic light turns green?",
            "options": ["Stop Immediately", "Go Safely", "Slow Down"],
            "answer": "Go Safely",
            "xp": 30
        }