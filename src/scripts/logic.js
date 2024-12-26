function nilPunishment({ blind, nilRuleBonus }) {
  if (blind) return parseInt(nilRuleBonus) * -2
  else return parseInt(nilRuleBonus) * -1;
}
function nilBonus({ blind, nilRuleBonus }) {
  if (blind) return parseInt(nilRuleBonus) * 2
  else return parseInt(nilRuleBonus) * 1;
}

export function calculateEndOfRoundForTeam({ initialRound, endOfRound, rules }) {
  const returnObject = {...initialRound};
  const { bids, nil } = initialRound;

  const got = parseInt(endOfRound.tricksGot);
  console.log(initialRound.finalScore);

  returnObject.finalScore = isNaN(parseInt(initialRound.finalScore)) ? 0 : initialRound.finalScore;
  console.log(returnObject.finalScore);
  const sandbagsGotten = got > bids ? got - bids : 0;
  returnObject.sandbags += sandbagsGotten;
  returnObject.got = got;



  let goingBackwards = false;

  if (got < bids) {
    goingBackwards = true;
  } else if (nil.nil && !endOfRound.nilSuccess) {
    goingBackwards = true;
  }

  if (goingBackwards) {
    returnObject.finalScore += -(bids * 10);
    if (nil.nil) {
      returnObject.nilSuccess = endOfRound.nilSuccess;
      returnObject.finalScore += nilPunishment({ blind: nil.blind, nilRuleBonus: rules.nilBonus });
    }
  } else {
    // Going Positive

    returnObject.finalScore += bids * 10 + sandbagsGotten;

    if (nil.nil && endOfRound.nilSuccess) { // I think the nilSuccess is not needed here
      returnObject.nil.nilSuccess = endOfRound.nilSuccess;
      returnObject.finalScore += nilBonus({ blind: nil.blind, nilRuleBonus: rules.nilBonus });

    }
  }


  // Sandbag penalty
  if (returnObject.sandbags >= rules.sandbagThreshold) {
    returnObject.finalScore -= rules.sandbagPenalty;
    returnObject.sandbags -= rules.sandbagThreshold;
  }
  console.log('end: ', returnObject.finalScore);

  return returnObject;
}