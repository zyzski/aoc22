enum OppMoves {
  Rock = 'A',
  Paper = 'B',
  Scissors = 'C',
}

enum Moves {
  Rock = 'X',
  Paper = 'Y',
  Scissors = 'Z',
}

const moveScores = new Map<Moves, number>([
  [Moves.Rock, 1],
  [Moves.Paper, 2],
  [Moves.Scissors, 3],
]);

enum RoundScores {
  Win = 6,
  Draw = 3,
  Loss = 0,
}

const GameResult = {
  [OppMoves.Rock]: {
    [Moves.Rock]: RoundScores.Draw,
    [Moves.Paper]: RoundScores.Win,
    [Moves.Scissors]: RoundScores.Loss,
  },
  [OppMoves.Paper]: {
    [Moves.Rock]: RoundScores.Loss,
    [Moves.Paper]: RoundScores.Draw,
    [Moves.Scissors]: RoundScores.Win,
  },
  [OppMoves.Scissors]: {
    [Moves.Rock]: RoundScores.Win,
    [Moves.Paper]: RoundScores.Loss,
    [Moves.Scissors]: RoundScores.Draw,
  },
};

export function getScoreByMove(input: string[]): number {
  let score = 0;

  for (let i = 0; i < input.length; i++) {
    const round = input[i];
    const [oppMove, myMove] = round.split(' ');

    score += getMoveScore(myMove as Moves);
    score += getRoundScore(oppMove as OppMoves, myMove as Moves);
  }

  return score;
}

function getMoveScore(move: Moves): number {
  return moveScores.get(move) || 0;
}

function getRoundScore(oppMove: OppMoves, myMove: Moves): number {
  return GameResult[oppMove][myMove];
}

// Part 2

enum Outcomes {
  Loss = 'X',
  Draw = 'Y',
  Win = 'Z',
}

const MoveResult = {
  [OppMoves.Rock]: {
    [Outcomes.Win]: Moves.Paper,
    [Outcomes.Draw]: Moves.Rock,
    [Outcomes.Loss]: Moves.Scissors,
  },
  [OppMoves.Paper]: {
    [Outcomes.Win]: Moves.Scissors,
    [Outcomes.Draw]: Moves.Paper,
    [Outcomes.Loss]: Moves.Rock,
  },
  [OppMoves.Scissors]: {
    [Outcomes.Win]: Moves.Rock,
    [Outcomes.Draw]: Moves.Scissors,
    [Outcomes.Loss]: Moves.Paper,
  },
};

function getMoveByOutcome(oppMove: OppMoves, outcome: Outcomes): Moves {
  return MoveResult[oppMove][outcome];
}

export function getScoreByOutcome(input: string[]): number {
  let score = 0;

  for (let i = 0; i < input.length; i++) {
    const round = input[i];
    const [oppMove, myOutcome] = round.split(' ');
    const myMove = getMoveByOutcome(oppMove as OppMoves, myOutcome as Outcomes);

    score += getMoveScore(myMove as Moves);
    score += getRoundScore(oppMove as OppMoves, myMove as Moves);
  }

  return score;
}
