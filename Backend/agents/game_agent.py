def get_game(game_type):

    games = {
        "quiz": {
            "component": "QuizGame",
            "timeLimit": 30
        },

        "builder": {
            "component": "BuilderGame",
            "timeLimit": 90
        },

        "memory": {
            "component": "MemoryGame",
            "timeLimit": 60
        },

        "pattern": {
            "component": "PatternGame",
            "timeLimit": 45
        },

        "puzzle": {
            "component": "PuzzleGame",
            "timeLimit": 60
        },

        "reaction": {
            "component": "ReactionGame",
            "timeLimit": 30
        },

        "roleplay": {
            "component": "RolePlayGame",
            "timeLimit": 120
        },

        "simulation": {
            "component": "SimulationGame",
            "timeLimit": 90
        },

        "sorting": {
            "component": "SortingGame",
            "timeLimit": 45
        },

        "creativity": {
            "component": "CreativityGame",
            "timeLimit": 180
        }
    }

    return games.get(
        game_type,
        {
            "component": "QuizGame",
            "timeLimit": 30
        }
    )