/*
-the head (H) and tail (T) must always be touching 

-If the head is ever two steps directly up, down, left, or right from the tail, the tail must also move one step in that direction so it remains close enough

-If the head and tail aren't touching and aren't in the same row or column, the tail always moves one step diagonally to keep up

-Assume the head and the tail both start at the same position, overlapping
*/

type Move = `D ${number}`;
const HEAD = 'H';
const TAIL = 'T';

export function simulateRope(input: string[]): number {
  const tailPositions = new Set<string>();
  let overlapCount = 0;
  let headX = 0;
  let headY = 0;
  let tailX = 0;
  let tailY = 0;

  for (let i = 0; i < input.length; i++) {
    const move = input[i] as Move;
    const dirLetter = move[0];
    const distance = Number(move.slice(2));
    const dir = getDirMultiplier(dirLetter);
    const totalDistance = distance * dir;

    const isHorizontal = dirLetter === 'L' || dirLetter === 'R';
    const moveDirectionString = isHorizontal ? 'horizontal' : 'vertical';
    // console.log(`Head at ${headX},${headY}: Moving ${totalDistance} ${moveDirectionString} (${dirLetter})`);

    // move head/tail 1 step at a time
    const loopCount = Math.abs(totalDistance);

    for (let j = 0; j < loopCount; j++) {
      // check if head and tail are touching
      if (headX === tailX && headY === tailY) {
        // console.log('Head and tail are touching');
        overlapCount++;
      }

      // add tail position to set
      tailPositions.add(`${tailX},${tailY}`);

      if (isHorizontal) {
        headX += dir;
      } else {
        headY += dir;
      }

      if (!isAdjacent(headX, headY, tailX, tailY)) {
        // move tail
        // console.log('Moving tail');

        if (isHorizontal) {
          tailX += dir;
        } else {
          tailY += dir;
        }

        if (shouldMoveDiagonally(headX, headY, tailX, tailY)) {
          // move diagonally
          // console.log('Moving diagonally');
          if (isHorizontal) {
            tailY += headY - tailY;
          } else {
            tailX += headX - tailX;
          }
        }
      }
      // console.log(`H = ${headX},${headY}`);
      // console.log(`T = ${tailX},${tailY}`);
    }

    // console.log('---');
  }

  console.log('Tail positions:', tailPositions);
  return tailPositions.size;
}

// X,Y operations
// up and left subtract
// down and right add
function getDirMultiplier(dir: string): number {
  return dir === 'U' || dir === 'L' ? -1 : 1;
}

function shouldMoveDiagonally(headX: number, headY: number, tailX: number, tailY: number): boolean {
  // if head and tail are in the same row or column, don't move diagonally
  return headX !== tailX && headY !== tailY;
}

function isAdjacent(headX: number, headY: number, tailX: number, tailY: number): boolean {
  return Math.abs(headX - tailX) <= 1 && Math.abs(headY - tailY) <= 1;
}
