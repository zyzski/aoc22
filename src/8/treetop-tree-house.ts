/*
  All of the trees around the edge of the grid are visible
*/

type Grid = number[][];

export function findVisibleTrees(input: string[]): number {
  let visible = 0;
  const grid = inputToGrid(input);

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (isVisible(grid, row, col)) {
        visible++;
      }
    }
  }

  return visible;
}

function inputToGrid(input: string[]): Grid {
  const grid: Grid = [];

  for (let i = 0; i < input.length; i++) {
    const row = input[i];

    for (let j = 0; j < row.length; j++) {
      if (!grid[i]) {
        grid.push([]);
      }

      grid[i][j] = +row[j];
    }
  }

  return grid;
}

// Part 1: Find number of visible trees
function isVisible(grid: Grid, row: number, col: number): boolean {
  // All of the trees around the edge of the grid are visible
  if (row === 0 || col === 0 || row === grid.length - 1 || col === grid[0].length - 1) {
    return true;
  }

  let visibleCount = 4;
  const tree = grid[row][col];

  // go down each row
  for (let i = row + 1; i <= grid.length - 1; i++) {
    if (grid[i][col] >= tree) {
      visibleCount--;
      break;
    }
  }

  // go up each row
  for (let i = row - 1; i >= 0; i--) {
    if (grid[i][col] >= tree) {
      visibleCount--;
      break;
    }
  }

  // go right each col
  for (let i = col + 1; i <= grid[0].length - 1; i++) {
    if (grid[row][i] >= tree) {
      visibleCount--;
      break;
    }
  }

  // go left each col
  for (let i = col - 1; i >= 0; i--) {
    if (grid[row][i] >= tree) {
      visibleCount--;
      break;
    }
  }

  return visibleCount > 0;
}

// Part 2: Get visible distance per side
export function findBestTreeViewScore(input: string[]): number {
  const grid = inputToGrid(input);
  let max = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const score = getVisibleDistance(grid, row, col);
      max = Math.max(max, score);
    }
  }

  return max;
}

function getVisibleDistance(grid: Grid, row: number, col: number): number {
  let bottom = 0;
  let top = 0;
  let right = 0;
  let left = 0;

  const tree = grid[row][col];

  // go down each row
  for (let i = row; i < grid.length - 1; i++) {
    const next = grid[i + 1][col];
    bottom++;

    if (next >= tree) {
      break;
    }
  }

  // go up each row
  for (let i = row; i > 0; i--) {
    const prev = grid[i - 1][col];
    top++;

    if (prev >= tree) {
      break;
    }
  }

  // go right each col
  for (let i = col; i < grid[0].length - 1; i++) {
    const next = grid[row][i + 1];
    right++;

    if (next >= tree) {
      break;
    }
  }

  // go left each col
  for (let i = col; i > 0; i--) {
    const prev = grid[row][i - 1];
    left++;

    if (prev >= tree) {
      break;
    }
  }

  return getScenicScore([bottom, top, right, left]);
}

function getScenicScore(visibility: number[]): number {
  let sum = visibility[0];

  for (let i = 1; i < visibility.length; i++) {
    sum = sum * visibility[i];
  }

  return sum;
}
