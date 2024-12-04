function nilPunishment({ blind, nilRuleBonus }) {
  return blind ? nilRuleBonus * 2 : -nilRuleBonus;
}
function nilBonus({ blind, nilRuleBonus }) {
  return blind ? nilRuleBonus * 2 : nilRuleBonus;
}

export function calculateEndOfRoundForTeam({ initialRound, endOfRound, rules }) {
  const returnObject = initialRound;
  const { bids, nil, sandbags } = initialRound;

  const got = endOfRound.tricksGot.reduce((acc, got) => acc + got, 0);
  returnObject.finalScore = initialRound.finalScore;
  returnObject.sandbags = got > bids ? got - bids : 0;
  returnObject.got = got;


  let goingBackwards = false;

  if (got < bids) {
    goingBackwards = true;
  } else if (nil.nil && !endOfRound.nilSuccess) {
    goingBackwards = true;
  }

  if (goingBackwards) {
    returnObject.finalScore = -(bids * 10);
    if (nil.nil) {
      returnObject.finalScore += nilPunishment({ blind: nil.blind, nilRuleBonus: rules.nilBonus });
    }
  } else {
    // Going Positive
    returnObject.finalScore = bids * 10 + sandbags;
    if (nil.nil && endOfRound.nilSuccess) { // I think the nilSuccess is not needed here
      returnObject.finalScore += nilBonus({ blind: nil.blind, nilRuleBonus: rules.nilBonus });
    }
  }

  // Sandbag penalty
  if (returnObject.sandbags >= rules.sandbagThreshold) {
    returnObject.finalScore -= rules.sandbagPenalty;
    returnObject.sandbags -= rules.sandbagThreshold;
  }

  return returnObject;
}