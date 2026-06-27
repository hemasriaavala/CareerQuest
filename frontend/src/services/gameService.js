import {
  evaluateMission
} from "./evaluateService";

/*
Calculate score and XP
after completing a game
*/
export const completeGame =
  async (
    userId,
    mission,
    score
  ) => {

    // Full XP for high score
    let xpEarned = mission.xp;

    // Partial XP
    if (score < 80) {
      xpEarned =
        Math.floor(
          mission.xp * 0.75
        );
    }

    if (score < 50) {
      xpEarned =
        Math.floor(
          mission.xp * 0.5
        );
    }

    const result =
      await evaluateMission(
        userId,
        xpEarned,
        score
      );

    return result;
  };