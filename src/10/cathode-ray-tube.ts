/*

Find the signal strength during the 20th, 60th, 100th, 140th, 180th, and 220th cycles. What is the sum of these six signal strengths?

*/

type Command = 'noop' | 'addx';
const MAX_CYCLES = 220;

export function getSignalStrength(input: string[]): number {
  let x = 1;
  let cycle = 1;
  const signalStrengths: number[] = [];
  const instructions: (null | number)[] = [];

  while (cycle <= MAX_CYCLES) {
    console.log(`[${cycle}] X is ${x}`);
    checkSignalStrength(cycle, x, signalStrengths);
    // console.log(instructions);

    // get instruction
    const instruction = input.shift();
    if (instruction) {
      const [cmdName, cmdArgs] = getCommand(instruction);
      if (cmdName === 'addx') {
        instructions.push(null, cmdArgs);
      } else {
        instructions.push(null);
      }
    }

    // execute instruction
    const op = instructions.shift();
    if (op) {
      x += op;
    }

    cycle++;
  }

  return signalStrengths.reduce((a, b) => a + b, 0);
}

function getCommand(instruction: string): [Command, number] {
  const cmdName = instruction.slice(0, 4) as Command;
  const cmdArgs = Number(instruction.slice(5));

  return [cmdName, cmdArgs];
}

function checkSignalStrength(cycle: number, x: number, signalStrengths: number[]) {
  switch (cycle) {
    case 20:
    case 60:
    case 100:
    case 140:
    case 180:
    case 220:
      signalStrengths.push(x * cycle);
      break;
  }
}
