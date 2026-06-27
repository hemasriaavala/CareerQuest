def generate_story(
    age,
    career,
    title,
    journey,
    level
):

    stories = {

        "Engineer":
            f"🚀 Welcome, Junior Engineer! "
            f"You are on a {journey} journey. "
            f"A bridge in Future City has broken. "
            f"Your mission is '{title}'. "
            f"Complete it to help the citizens!",

        "Scientist":
            f"🔬 Greetings, Young Scientist! "
            f"You have reached Level {level}. "
            f"A mystery has appeared on Mars. "
            f"Your mission is '{title}'. "
            f"Solve it and make a new discovery!",

        "Doctor":
            f"🩺 Hello, Caring Doctor! "
            f"A group of children needs your help. "
            f"Your mission is '{title}'. "
            f"Complete it to keep everyone healthy!",

        "Teacher":
            f"📚 Welcome, Young Teacher! "
            f"The classroom is waiting for you. "
            f"Your mission is '{title}'. "
            f"Help your students learn something new!",

        "Architect":
            f"🏛️ Welcome, Future Architect! "
            f"A new city is being built. "
            f"Your mission is '{title}'. "
            f"Create amazing designs for everyone!",

        "Artist":
            f"🎨 Greetings, Creative Artist! "
            f"The world needs more imagination. "
            f"Your mission is '{title}'. "
            f"Use your creativity to inspire others!"
    }

    return stories.get(
        career,
        f"🌟 Welcome to CareerQuest! "
        f"You are a Level {level} "
        f"{career} explorer. "
        f"Your mission is '{title}'. "
        f"Complete it and unlock new adventures!"
    )