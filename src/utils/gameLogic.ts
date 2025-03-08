import { TeamRound } from '../types/game';

interface Rules {
  targetScore: number;
  sandbagThreshold: number;
  nilBonus: number;
}

interface EndOfRoundData {
  tricksGot: number;
  nilSuccess: boolean;
}

interface NilCalculationParams {
  blind: boolean;
  nilRuleBonus: number;
}

function nilPunishment({ blind, nilRuleBonus }: NilCalculationParams): number {
  return blind ? nilRuleBonus * -2 : nilRuleBonus * -1;
}

function nilBonus({ blind, nilRuleBonus }: NilCalculationParams): number {
  return blind ? nilRuleBonus * 2 : nilRuleBonus;
}

export function calculateEndOfRoundForTeam({
  initialRound,
  endOfRound,
  rules
}: {
  initialRound: TeamRound;
  endOfRound: EndOfRoundData;
  rules: Rules;
}): TeamRound {
  const returnObject = { ...initialRound };
  const { bid, nil } = initialRound;
  const got = endOfRound.tricksGot;

  returnObject.finalScore = initialRound.initialScore;
  const sandbagsGotten = got > bid ? got - bid : 0;
  returnObject.bags += sandbagsGotten;
  returnObject.tricks = got;

  let goingBackwards = false;

  if (got < bid || (nil.isNil && !endOfRound.nilSuccess)) {
    goingBackwards = true;
  }

  if (goingBackwards) {
    returnObject.finalScore += -(bid * 10);
    if (nil.isNil) {
      returnObject.nil.success = endOfRound.nilSuccess;
      returnObject.finalScore += nilPunishment({ blind: nil.isBlind, nilRuleBonus: rules.nilBonus });
    }
  } else {
    returnObject.finalScore += (bid * 10) + sandbagsGotten;
    if (nil.isNil && endOfRound.nilSuccess) {
      returnObject.nil.success = endOfRound.nilSuccess;
      returnObject.finalScore += nilBonus({ blind: nil.isBlind, nilRuleBonus: rules.nilBonus });
    }
  }

  // Sandbag penalty
  if (returnObject.bags >= rules.sandbagThreshold) {
    returnObject.finalScore -= (rules.sandbagThreshold * 10);
    returnObject.bags -= rules.sandbagThreshold;
  }

  return returnObject;
} 