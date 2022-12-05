// "Top" of stack is the last element in the array
type Stack = string[];
type Stacks = Stack[];

export function getSupplyStacksTopCargo(input: string, canMoveMultiple = false): string {
  const [stacksInput, movesInput] = splitInput(input);
  const stacks = createStacks(stacksInput);
  const updatedStacks = runInstructions(stacks, movesInput.split('\n'), canMoveMultiple);
  const topCargo = getTopCargo(updatedStacks);
  return topCargo;
}

function splitInput(input: string): string[] {
  return input.split('\n\n');
}

function createStacks(input: string): Stacks {
  const lines = input.split('\n');
  const cols = lines[0].length;

  // remove last line with stack numbers
  const stackCount = lines.pop()?.replace(/ /g, '').slice(-1);
  const stacks: Stacks = Array(Number(stackCount)).fill([]);

  let col = 0;

  for (let x = 1; x <= cols; x += 4) {
    for (let y = 0; y < lines.length; y++) {
      const char = lines[y][x];

      if (char !== ' ') {
        stacks[col] = [char, ...stacks[col]];
      }
    }

    col++;
  }

  return stacks;
}

function runInstructions(stacks: Stacks, moves: string[], canMoveMultiple: boolean): Stacks {
  const newStacks = [...stacks];

  for (let i = 0; i < moves.length; i++) {
    const regex = /move (\d+) from (\d+) to (\d+)/;
    const match = regex.exec(moves[i]);

    if (!match) {
      throw new Error('Invalid instruction');
    }

    const count = Number(match[1]);
    const from = Number(match[2]);
    const to = Number(match[3]);
    const fromStack = newStacks[from - 1];
    const toStack = newStacks[to - 1];

    if (canMoveMultiple) {
      const cargo = fromStack.splice(fromStack.length - count, count);
      toStack.push(...cargo);
    } else {
      for (let i = 0; i < count; i++) {
        const cargo = fromStack.pop();
        if (cargo) {
          toStack.push(cargo);
        }
      }
    }
  }

  return newStacks;
}

function getTopCargo(stacks: Stacks) {
  const topCargo = stacks.map((stack) => stack[stack.length - 1]);
  return topCargo.join('');
}
