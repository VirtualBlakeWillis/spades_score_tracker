function nilPunishment({ blind, nilRuleBonus }) {
  if (blind) return parseInt(nilRuleBonus) * -2
  else return parseInt(nilRuleBonus) * -1;
}
function nilBonus({ blind, nilRuleBonus }) {
  if (blind) return parseInt(nilRuleBonus) * 2
  else return parseInt(nilRuleBonus) * 1;
}



export function calculateEndOfRoundForTeam({ initialRound, endOfRound, rules }) {
  console.log('start of EOR calculation: ', initialRound);
  console.log('end of round: ', endOfRound);
  const returnObject = {...initialRound};
  const { bids, nil } = initialRound;

  const got = endOfRound.tricksGot;
  // if (initialRound.initialScore === 0) {
  //   // This is the first round
  //   returnObject.finalScore = 0;
  // } else {
  //   // if (isNaN(initialRound.finalScore)) throw new Error('initialRound.finalScore is not a number');
  //   returnObject.initialScore = initialRound.finalScore;
  // }
  returnObject.finalScore = initialRound.initialScore;
  const sandbagsGotten = got > bids ? got - bids : 0;
  returnObject.sandbags += sandbagsGotten;
  returnObject.got = got;

  console.log('final score after setup: ', returnObject.finalScore);

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

    returnObject.finalScore += (bids * 10) + sandbagsGotten;

    if (nil.nil && endOfRound.nilSuccess) { // I think the nilSuccess is not needed here, because its already checked above
      returnObject.nil.nilSuccess = endOfRound.nilSuccess;
      returnObject.finalScore += nilBonus({ blind: nil.blind, nilRuleBonus: rules.nilBonus });

    }
  }


  // Sandbag penalty
  if (returnObject.sandbags >= rules.sandbagThreshold) {
    returnObject.finalScore -= (rules.sandbagThreshold * 10);
    returnObject.sandbags -= rules.sandbagThreshold;
  }

  console.log('end: ', returnObject.finalScore);

  return returnObject;
}