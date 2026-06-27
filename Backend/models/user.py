class User:
    def __init__(
        self,
        id,
        name,
        age,
        xp=0,
        level=1,
        missions=0,
        streak=1,
        badge="Career Explorer",
        current_career=None,
        last_active_date=None
    ):
        self.id = id
        self.name = name
        self.age = age
        self.xp = xp
        self.level = level
        self.missions = missions
        self.streak = streak
        self.badge = badge
        self.current_career = current_career
        self.last_active_date = last_active_date