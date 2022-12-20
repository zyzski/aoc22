type MoveLetter = 'D' | 'U' | 'L' | 'R' | 'UL' | 'UR' | 'DL' | 'DR' | 'None';
type Coordinate = { x: number; y: number };
type MoveInstruction =
  | `${MoveLetter} ${number}`
  | `${MoveLetter} ${number}`
  | `${MoveLetter} ${number}`
  | `${MoveLetter} ${number}`;

// This was orginally only for part 2, but it works for part 1 too, so I removed the previous function
export function simulateRope(input: string[], size: number) {
  const knots: Coordinate[] = new Array(size).fill(0).map(() => ({ x: 0, y: 0 }));
  const tailPositions = new Set<string>([getPosString(knots[knots.length - 1])]);

  for (let i = 0; i < input.length; i++) {
    const move = input[i] as MoveInstruction;
    const { dir, dist } = getMove(move);

    for (let j = 0; j < dist; j++) {
      // move each knot
      for (let k = 0; k < knots.length; k++) {
        const knot = knots[k];
        const prevKnot = knots[k - 1];

        if (!prevKnot) {
          // move head
          knot.x += dir.x;
          knot.y += dir.y;
        } else {
          // move knot
          const tailMove = getTailMove(prevKnot, knot);
          knot.x += tailMove.x;
          knot.y += tailMove.y;
          validateMoves(knot, prevKnot);
        }

        if (k === knots.length - 1) {
          tailPositions.add(getPosString(knots[knots.length - 1]));
        }
      }

      // drawCoords(knots);
    }
  }

  return tailPositions.size;
}

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

function drawCoords(coords: Coordinate[]) {
  const size = 5;
  for (let row = size; row >= -size; row--) {
    let r = `${row}`.padStart(2);

    for (let col = -size; col <= size; col++) {
      let char = '.';

      if (row === 0 && col === 0) {
        char = '+';
      } else if (row === 0) {
        char = '-';
      } else if (col === 0) {
        char = '|';
      }

      for (let cord = coords.length - 1; cord >= 0; cord--) {
        const c = coords[cord];
        if (col === c.x && row === c.y) {
          char = cord === 0 ? 'H' : `${cord}`;
        }
      }

      r += char;
    }
    console.log(r);
  }
  console.log('\n');
}

function validateMoves(head: Coordinate, tail: Coordinate): void {
  const xDiff = Math.abs(head.x - tail.x);
  const yDiff = Math.abs(head.y - tail.y);

  if (xDiff + yDiff > 2) {
    throw new Error('Head and Tail are too far apart');
  }
}
