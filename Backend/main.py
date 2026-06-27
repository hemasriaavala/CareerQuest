from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import your routers
from api.register import router as register_router
from api.dashboard import router as dashboard_router
from api.mission import router as mission_router
from api.evaluate import router as evaluate_router
from api.history import router as history_router
from api.achievements import router as achievements_router
from api.leaderboard import router as leaderboard_router
from api.profile import router as profile_router
from api.camera import router as camera_router
from api.careers import router as careers_router
from api.health import router as health_router
from api.recommendation import router as recommendation_router

app = FastAPI(
    title="CareerQuest API",
    version="1.0.0",
    description="AI-Powered Career Exploration Toy"
)

# React Frontend Access (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# API Routes
app.include_router(register_router, tags=["Register"])

# FIXED: Added prefix="/dashboard" to resolve 404 errors
app.include_router(
    dashboard_router,
    prefix="/dashboard",
    tags=["Dashboard"]
)

app.include_router(mission_router, tags=["Mission"])
app.include_router(evaluate_router, tags=["Evaluate"])
app.include_router(history_router, tags=["History"])
app.include_router(achievements_router, tags=["Achievements"])
app.include_router(leaderboard_router, tags=["Leaderboard"])
app.include_router(profile_router, tags=["Profile"])
app.include_router(recommendation_router, tags=["Recommendation"])
app.include_router(camera_router, tags=["Camera"])
app.include_router(careers_router, tags=["Careers"])
app.include_router(health_router, tags=["Health"])

@app.get("/")
def home():
    return {
        "message": "CareerQuest Backend Running 🚀",
        "version": "1.0.0",
        "docs": "/docs"
    }