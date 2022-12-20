type MoveLetter = 'D' | 'U' | 'L' | 'R' | 'UL' | 'UR' | 'DL' | 'DR' | 'None';
type Coordinate = { x: number; y: number };
type MoveInstruction =
  | `${MoveLetter} ${number}`
  | `${MoveLetter} ${number}`
  | `${MoveLetter} ${number}`
  | `${MoveLetter} ${number}`;

export function simulateRopeAgain(input: string[]) {
  const tail: Coordinate = { x: 0, y: 0 };
  const head: Coordinate = { x: 0, y: 0 };
  const tailPositions = new Set<string>([getPosString(tail)]);
  // drawCartesianCoordinates(head, tail);

  for (let i = 0; i < input.length; i++) {
    const move = input[i] as MoveInstruction;
    const { dir, dist } = getMove(move);

    for (let j = 0; j < dist; j++) {
      // move head
      head.x += dir.x;
      head.y += dir.y;

      // move tail
      const tailMove = getTailMove(head, tail);
      tail.x += tailMove.x;
      tail.y += tailMove.y;
      // console.log(`head: ${head.x},${head.y}`);
      // console.log(`tail: ${tail.x},${tail.y}`);

      // drawCartesianCoordinates(head, tail);
      validateMoves(head, tail);
      tailPositions.add(getPosString(tail));
    }
  }

  return tailPositions.size;
}

/* Movement */
const MOVES: Record<MoveLetter, Coordinate> = {
  U: { x: 0, y: 1 },
  D: { x: 0, y: -1 },
  L: { x: -1, y: 0 },
  R: { x: 1, y: 0 },
  UL: { x: -1, y: 1 },
  UR: { x: 1, y: 1 },
  DL: { x: -1, y: -1 },
  DR: { x: 1, y: -1 },
  None: { x: 0, y: 0 },
} as const;

function getMove(move: MoveInstruction) {
  const split = move.split(' ');
  const dir = split[0] as MoveLetter;
  const dist = +split[1];
  return { dir: MOVES[dir], dist: +dist };
}

function getPosString(pos: Coordinate) {
  return `${pos.x},${pos.y}`;
}

function getTailMove(head: Coordinate, tail: Coordinate): Coordinate {
  const xDiff = head.x - tail.x;
  const yDiff = head.y - tail.y;

  // overlap and adjacent
  if (Math.abs(xDiff) <= 1 && Math.abs(yDiff) <= 1) {
    return MOVES.None;
  }

  // horizontal
  if (yDiff === 0) {
    return xDiff > 0 ? MOVES.R : MOVES.L;
  }

  // vertical
  if (xDiff === 0) {
    return yDiff > 0 ? MOVES.U : MOVES.D;
  }

  // diagonal
  if (yDiff === 2) {
    return xDiff > 0 ? MOVES.UR : MOVES.UL;
  }

  if (yDiff === -2) {
    return xDiff > 0 ? MOVES.DR : MOVES.DL;
  }

  if (xDiff === 2) {
    return yDiff > 0 ? MOVES.UR : MOVES.DR;
  }

  if (xDiff === -2) {
    return yDiff > 0 ? MOVES.UL : MOVES.DL;
  }

  return MOVES.None;
}

function drawCartesianCoordinates(head: Coordinate, tail: Coordinate) {
  const size = 5;
  for (let row = size; row >= -size; row--) {
    let r = `${row}`.padStart(2);

    for (let col = -size; col <= size; col++) {
      if (col === head.x && row === head.y && col === tail.x && row === tail.y) {
        r += 'O';
      } else if (col === head.x && row === head.y) {
        r += 'H';
      } else if (col === tail.x && row === tail.y) {
        r += 'T';
      } else if (row === 0 && col === 0) {
        r += '+';
      } else if (row === 0) {
        r += '-';
      } else if (col === 0) {
        r += '|';
      } else {
        r += '.';
      }
    }
    console.log(r);
  }
}

function validateMoves(head: Coordinate, tail: Coordinate): void {
  const xDiff = Math.abs(head.x - tail.x);
  const yDiff = Math.abs(head.y - tail.y);

  if (xDiff + yDiff > 2) {
    throw new Error('Head and Tail are too far apart');
  }
}
