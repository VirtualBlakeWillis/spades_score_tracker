export interface TeamRound {
  initialScore: number;
  finalScore: number | undefined;
  bid: number;
  tricks: number;
  score: number;
  bags: number;
  nil: {
    isNil: boolean;
    isBlind: boolean;
    success: boolean;
  };
}

export interface Round {
  aTeam: TeamRound;
  bTeam: TeamRound;
}

export interface TeamBids {
  bids: number;
  isNil: boolean;
  isBlind: boolean;
}

export interface RoundBids {
  aTeam: TeamBids;
  bTeam: TeamBids;
}

export interface GameState {
  aTeamName: string;
  bTeamName: string;
  targetScore: number;
  sandbagThreshold: number;
  nilBonus: number;
  gameStarted: boolean;
  winner?: string;
  rounds: Round[];
}

export type GameAction = 
  | { type: 'setupGame'; payload: Omit<GameState, 'gameStarted' | 'rounds'> }
  | { type: 'addRound'; payload: Round }
  | { type: 'setWinner'; payload: string }
  | { type: 'startRound'; payload: RoundBids };

export interface TeamRoundEntryProps {
  teamName: string;
  teamRound: TeamRound;
  roundNumber: number;
}

export interface NewRoundOverlayProps {
  toggleNewRoundOverlay: () => void;
}

export interface EndRoundOverlayProps {
  toggleEndRoundOverlay: () => void;
  onFinish: () => void;
} 