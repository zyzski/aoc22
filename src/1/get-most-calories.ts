// How many Calories are being carried by the Elf carrying the most Calories
export function getMostCalories(input: string[]): number {
  const elves: number[] = [];
  let max = 0;
  let index = 0;

  for (let i = 0; i < input.length; i++) {
    const value = input[i];

    if (value === '') {
      if (elves[index]) {
        max = Math.max(max, elves[index]);
      }

      index++;
      continue;
    }

    if (!elves[index]) {
      elves.push(Number(value));
    } else {
      elves[index] = elves[index] + Number(value);
    }
  }

  return max;
}
