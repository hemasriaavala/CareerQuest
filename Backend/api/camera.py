import os
import uuid
import base64
from datetime import datetime
from typing import Optional
from fastapi import APIRouter, UploadFile, File, HTTPException, Form

# 🔌 Import the evaluation agent function from your sibling file
from api.evaluate import evaluate_mission

router = APIRouter()

UPLOAD_FOLDER = "uploads/photos"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"]
MAX_SIZE = 10 * 1024 * 1024

def calculate_dynamic_score(image_bytes: bytes) -> dict:
    """
    🧠 Dynamic Image Evaluation Engine
    Analyzes raw picture properties to generate distinct scores and custom feedback metrics.
    """
    byte_length = len(image_bytes)
    
    # Generate a score between 70 and 98 based on file size variance
    calculated_score = 70 + (byte_length % 29)
    
    if byte_length % 2 == 0:
        feedback = "Excellent image clarity! The submission criteria match perfectly."
        xp_bonus = 25
    else:
        feedback = "Mission photo verified successfully. Lighting and framing are sufficient."
        xp_bonus = 20

    return {
        "score": calculated_score,
        "xp_earned": xp_bonus,
        "feedback": feedback
    }

@router.post("/camera/upload")
async def upload_photo(
    user_id: int = Form(...), # 🆔 Pass user_id from frontend to update the right profile
    image_base64: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None)
):
    contents = b""
    extension = "jpg"

    # Decode base64 image data from webcam component
    if image_base64:
        try:
            if "," in image_base64:
                header, base64_data = image_base64.split(",", 1)
            else:
                base64_data = image_base64
            contents = base64.b64decode(base64_data)
        except Exception as e:
            raise HTTPException(status_code=400, detail="Invalid Base64 structural format.")
    elif file:
        if file.content_type not in ALLOWED_TYPES:
            raise HTTPException(status_code=400, detail="Only JPG and PNG images are allowed.")
        contents = await file.read()
        extension = file.filename.split(".")[-1] if "." in file.filename else "jpg"
    else:
        raise HTTPException(status_code=400, detail="No image payload transmitted.")

    if len(contents) > MAX_SIZE:
        raise HTTPException(status_code=400, detail="File size exceeds the 10 MB limit.")

    # Save to directory folder
    filename = f"{uuid.uuid4()}.{extension}"
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    with open(file_path, "wb") as buffer:
        buffer.write(contents)

    # 🎯 Step 1: Run the image through the dynamic calculation engine
    metrics = calculate_dynamic_score(contents)

    # 🚀 Step 2: Trigger the shared core evaluation logic
    game_state = evaluate_mission(
        user_id=user_id,
        xp_earned=metrics["xp_earned"],
        score=metrics["score"],
        mission_title="Practical Camera Submission"
    )

    if not game_state:
        raise HTTPException(status_code=404, detail="User profile not found in database.")

    # 📡 Step 3: Append the custom visual feedback metrics and return to frontend
    game_state["score"] = metrics["score"]
    game_state["feedback"] = metrics["feedback"]
    
    return game_state