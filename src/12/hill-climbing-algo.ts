import { Coord } from '../types/Coord';
import { Grid, inputToGrid } from '../utils/input-to-grid';

/*
  Pathfinding algorithm
  https://www.redblobgames.com/pathfinding/a-star/introduction.html

  -The start and end are known
  -During each step, you can move exactly one square up, down, left, or right
  -the elevation of the destination square can be at most one higher
*/

type HillGrid = Grid<number>;

const START_CHAR = 'S';
const END_CHAR = 'E';

export function getShortestHillPathSize(input: string[]) {
  const { grid, start, end } = parseGrid(input);
  const path = getShortestPath(grid, start, end);
  return path.length;
}

export function getShortestHillPathSize2(input: string[]) {
  const { grid, starts, end } = parseGrid(input);
  let shortestPath = Infinity;

  for (const start of starts) {
    const path = getShortestPath(grid, start, end);

    if (path.length > 0) {
      shortestPath = Math.min(shortestPath, path.length);
    }
  }

  return shortestPath;
}

function parseGrid(input: string[]) {
  const starts: Coord[] = [];
  let start: Coord = { x: Infinity, y: Infinity };
  let end: Coord = { x: Infinity, y: Infinity };

  const grid = inputToGrid(input, (char, row, col) => {
    if (char === START_CHAR) {
      char = 'a';
      start = { x: col, y: row };
    } else if (char === END_CHAR) {
      char = 'z';
      end = { x: col, y: row };
    }

    // Part 2, start at any 'a'
    if (char === 'a') {
      starts.push({ x: col, y: row });
    }

    return char.charCodeAt(0);
  });

  return {
    grid,
    start,
    end,
    starts,
  };
}

function toId(coord: Coord) {
  return `${coord.x}-${coord.y}`;
}

function getNeighbors(grid: HillGrid, x: number, y: number) {
  return [
    { x: x, y: y - 1 },
    { x: x - 1, y: y },
    { x: x + 1, y: y },
    { x: x, y: y + 1 },
  ].filter((coord) => typeof grid[coord.y]?.[coord.x] !== 'undefined');
}

/*
 Builds a map of all the walkable cells from the start
*/
function buildFrontier(grid: HillGrid, from: Coord) {
  const frontier: Coord[] = [];
  frontier.push(from);

  const came_from = new Map();
  came_from.set(toId(from), null);

  // Pick and remove a location from the frontier
  while (frontier.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const current = frontier.shift()!;
    const current_val = +grid[current.y][current.x];

    const neighbors = getNeighbors(grid, current.x, current.y);
    for (const next of neighbors) {
      const next_cell = +grid[next.y][next.x];
      const next_id = toId(next);

      const canMove = next_cell - current_val <= 1;
      const hasVisited = came_from.has(next_id);

      if (!canMove || hasVisited) {
        continue;
      }

      // Coord is walkable
      const current_id = toId(current);

      // Add to frontier
      frontier.push(next);
      came_from.set(next_id, current_id);
    }
  }

  return came_from;
}

function getShortestPath(grid: HillGrid, from: Coord, to: Coord) {
  const from_id = toId(from);
  const to_id = toId(to);
  const came_from = buildFrontier(grid, from);
  let current = to_id;

  const path = [];
  while (current !== undefined && current !== from_id) {
    path.push(current);
    current = came_from.get(current);
  }

  // An undefined `current` means it wasn't possible to have a path `from` -> `to`, return an empty path
  if (current === undefined) {
    return [];
  }

  // Finally, put `from` first, and `to` last
  path.reverse();

  // Note our path won't include the `from` position
  return path;
}
