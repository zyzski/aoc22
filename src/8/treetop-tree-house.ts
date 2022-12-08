/*
  All of the trees around the edge of the grid are visible
*/

type Grid = number[][];

export function findVisibleTrees(input: string[]): number {
  let visible = 0;
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

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (isVisible(grid, row, col)) {
        visible++;
      }
    }
  }

  return visible;
}

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
