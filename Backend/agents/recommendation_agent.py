def get_recommendations(
    age,
    current_career
):

    recommendations = {

        "Engineer": [
            "Architect",
            "Scientist",
            "Entrepreneur"
        ],

        "Scientist": [
            "Engineer",
            "Doctor",
            "Teacher"
        ],

        "Doctor": [
            "Scientist",
            "Teacher",
            "Chef"
        ],

        "Teacher": [
            "Doctor",
            "Scientist",
            "Judge"
        ],

        "Architect": [
            "Engineer",
            "Artist",
            "Entrepreneur"
        ],

        "Artist": [
            "Architect",
            "Chef",
            "Teacher"
        ],

        "Chef": [
            "Doctor",
            "Entrepreneur",
            "Artist"
        ],

        "Entrepreneur": [
            "Engineer",
            "Lawyer",
            "Architect"
        ],

        "Lawyer": [
            "Judge",
            "Entrepreneur",
            "Police Officer"
        ],

        "Judge": [
            "Lawyer",
            "Teacher",
            "Police Officer"
        ],

        "Police Officer": [
            "Army Officer",
            "Detective",
            "Judge"
        ],

        "Army Officer": [
            "Police Officer",
            "Pilot",
            "Sports Coach"
        ],

        "Pilot": [
            "Army Officer",
            "Engineer",
            "Scientist"
        ],

        "Sports Coach": [
            "Army Officer",
            "Teacher",
            "Doctor"
        ],

        "Farmer": [
            "Scientist",
            "Entrepreneur",
            "Engineer"
        ],

        "Detective": [
            "Police Officer",
            "Lawyer",
            "Judge"
        ]
    }

    careers = recommendations.get(
        current_career,
        [
            "Engineer",
            "Scientist",
            "Doctor"
        ]
    )

    return {
        "age":
            age,

        "currentCareer":
            current_career,

        "totalRecommendations":
            len(careers),

        "recommendedCareers":
            careers,

        "message":
            f"Because you enjoyed being a "
            f"{current_career}, "
            f"you may also enjoy these careers!"
    }