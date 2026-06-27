from fastapi import (
    APIRouter,
    HTTPException
)
from database.db import users
from agents.recommendation_agent import (
    get_recommendations
)

router = APIRouter()


@router.get(
    "/recommendation/{user_id}"
)
def recommendation(
    user_id: int
):

    for user in users:

        if user["id"] == user_id:

            current_career = user.get(
                "current_career",
                "Engineer"
            )

            recommendations = (
                get_recommendations(
                    user["age"],
                    current_career
                )
            )

            return {
                "user_id":
                    user["id"],

                "name":
                    user["name"],

                "age":
                    user["age"],

                "current_career":
                    current_career,

                "recommendations":
                    recommendations[
                        "recommendedCareers"
                    ]
            }

    raise HTTPException(
        status_code=404,
        detail="User not found"
    )