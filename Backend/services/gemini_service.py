import random
import json
from services.ai_service import client  # Import your active standard SDK client instance
from google.genai import types

VIRTUAL_GAMES = [
    "quiz", "simulation", "builder", "sorting", "memory",
    "pattern", "puzzle", "reaction", "roleplay", "creativity"
]

# Definitive structural JSON specification framework matching all 10 frontend variants
MISSION_RESPONSE_SCHEMA = {
    "type": "OBJECT",
    "properties": {
        "title": {"type": "STRING"},
        "description": {"type": "STRING"},
        "instruction": {"type": "STRING"},
        "taskType": {"type": "STRING"},
        "gameType": {"type": "STRING"},
        "xp": {"type": "INTEGER"},
        # Game-engine specific fields (populated dynamically by the AI matching the game mechanics)
        "question": {"type": "STRING"},
        "options": {"type": "ARRAY", "items": {"type": "STRING"}},
        "answer": {"type": "STRING"},
        "scenario": {"type": "STRING"},
        "targetBlocks": {"type": "INTEGER"},
        "items": {"type": "ARRAY", "items": {"type": "STRING"}},
        "correctItems": {"type": "ARRAY", "items": {"type": "STRING"}},
        "cards": {"type": "ARRAY", "items": {"type": "STRING"}},
        "sequence": {"type": "ARRAY", "items": {"type": "STRING"}},
        "pieces": {"type": "ARRAY", "items": {"type": "STRING"}},
        "correctOrder": {"type": "ARRAY", "items": {"type": "STRING"}},
        "target": {"type": "STRING"},
        "rounds": {"type": "INTEGER"},
        "minWords": {"type": "INTEGER"}
    },
    "required": ["title", "description", "instruction", "taskType", "gameType", "xp"]
}

def generate_mission(age, career, journey, level, task_type):
    # Normalize comparison checks to capture layout variants case-insensitively
    is_practical = str(task_type).lower() == "practical"
    
    # 1. Assign game context framework dynamically
    game = "camera" if is_practical else random.choice(VIRTUAL_GAMES)

    # 2. Build the strict engine system configuration instruction prompt
    prompt = f"""
    You are CareerQuest AI, generating an immersive activity for a child-friendly toy hardware box.
    
    Target User Metrics:
    - Age: {age} Years Old (Crucial: Tailor vocabulary and complexity. Simple for age 8-12, advanced for 13-16)
    - Career Path Selection: {career} (Everything generated MUST map explicitly into this profession)
    - Adventure Stage: {journey}
    - Level: {level}
    
    Mission Mode:
    - Task Type: {"Practical" if is_practical else "Virtual"}
    - Active Game Engine: {game}

    Engine Execution Rules:
    - If game is 'camera' (Practical): Design an actionable, physical hands-on real-world task the kid must build/do at home and photograph.
    - If game is 'quiz': Generate a tailored multiple-choice question with 4 custom 'options', and the exact text matching of the correct choice in 'answer'.
    - If game is 'simulation' or 'roleplay': Create an immersive career dilemma narrative under 'scenario', with branching paths under 'options'.
    - If game is 'sorting': Provide 6 mixed thematic career items under 'items', and the subset of correct target fields under 'correctItems'.
    - If game is 'memory': Fill an array of 4 pairs of career emojis/words under 'cards'.
    - If game is 'pattern': Build a logical progression sequence under 'sequence', with selection keys under 'options' and 'answer'.
    - If game is 'puzzle': Provide 4 scrambled operational steps under 'pieces', and the sequential step text solution array under 'correctOrder'.
    - If game is 'builder': Set a fun design block stack limit integer value in 'targetBlocks'.
    - If game is 'reaction': Define a rapid target asset flash icon in 'target' (e.g., 🚀, 🛑, ⚡) and set 'rounds' to 5.
    - If game is 'creativity': Outline a deep conceptual layout design question in 'instruction' and set 'minWords' to 25.
    
    You must populate the custom game fields natively. Do NOT return empty mock values.
    """

    try:
        # Request content generation using direct schema enforcement
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=MISSION_RESPONSE_SCHEMA,
                temperature=0.85 # Adds great creative variation for tasks
            )
        )

        # Parse output directly without manual string cleaning or markdown stripping
        mission_data = json.loads(response.text)
        
        # Enforce exact type match overwrites right before returning to protect your DB
        mission_data["taskType"] = "Practical" if is_practical else "Virtual"
        mission_data["gameType"] = game
        return mission_data

    except Exception as e:
        print(f"⚠️ Hardware generation exception caught: {str(e)}")
        # Production safe local mock generation fallback to make your expo stall bulletproof
        return {
            "title": f"Elite {career} Academy",
            "description": f"Become a champion explorer! Try this elite custom level {level} mission designed for a {age} year old.",
            "instruction": "Read through your active game engine rules and choose the best path forward.",
            "taskType": "Practical" if is_practical else "Virtual",
            "gameType": game,
            "xp": 30,
            "question": f"Which item is vital for a professional {career}?",
            "options": ["Innovation", "Giving Up", "Inaction", "Distraction"],
            "answer": "Innovation",
            "items": ["Tool A", "Tool B", "Object C"],
            "correctItems": ["Tool A"],
            "pieces": ["Step 1", "Step 2"],
            "correctOrder": ["Step 1", "Step 2"],
            "cards": ["🚀", "⭐", "🚀", "⭐"],
            "sequence": ["🔵", "🟢", "🔵"],
            "target": "⚡"
        }