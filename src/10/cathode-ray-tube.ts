/*

Find the signal strength during the 20th, 60th, 100th, 140th, 180th, and 220th cycles. What is the sum of these six signal strengths?

*/

type Command = 'noop' | 'addx';
const MAX_CYCLES = 240;
const DISPLAY_ROWS = 6;
const DISPLAY_COLS = 40;

type OnCycle = (cycle: number, x: number) => void;

export function runCpu(input: string[], onCycle: OnCycle): void {
  let x = 1;
  let cycle = 1;

  const instructions: (null | number)[] = [];

  while (cycle <= MAX_CYCLES) {
    console.log(`[${cycle}] X is ${x}`);
    onCycle(cycle, x);

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
}

function getCommand(instruction: string): [Command, number] {
  const cmdName = instruction.slice(0, 4) as Command;
  const cmdArgs = Number(instruction.slice(5));

  return [cmdName, cmdArgs];
}

export function getSignalStrength(input: string[]): number {
  const signalStrengths: number[] = [];

  function onCycle(cycle: number, x: number) {
    checkSignalStrength(cycle, x, signalStrengths);
  }

  runCpu(input, onCycle);

  return signalStrengths.reduce((a, b) => a + b, 0);
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

// Part 2
export function drawCrtSprite(input: string[]): void {
  const display: string[] = Array(DISPLAY_ROWS * DISPLAY_COLS).fill('.');

  function onCycle(cycle: number, x: number) {
    drawCrt(display, cycle, x);
  }

  runCpu(input, onCycle);
}

function drawCrt(display: string[], cycle: number, x: number) {
  const SPRITE = '#';
  // since we are using a flat array, we need to offset the index by the number of rows
  const offset = Math.floor(cycle / DISPLAY_COLS) * DISPLAY_COLS;
  const cycleIndex = cycle - offset - 1;
  const spritePos = [x - 1, x, x + 1];
  // console.log(spritePos);
  // console.log(cycleIndex);
  const drawIndex = spritePos.find((pos) => pos === cycleIndex);
  // console.log(drawIndex);

  // update display with sprite
  if (drawIndex !== undefined) {
    display[drawIndex + offset] = SPRITE;
  }
  const renderDisplay = [...display];

  while (renderDisplay.length) {
    const line = renderDisplay.splice(0, DISPLAY_COLS);
    if (cycle === MAX_CYCLES) {
      console.log(line.join(''));
    }
  }
}
