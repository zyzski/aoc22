export function getTopCaloriesSum(input: string[]): number {
  const elves: number[] = [];
  let index = 0;
  let sum = 0;

  for (let i = 0; i < input.length; i++) {
    const value = input[i];

    if (value === '') {
      // reset
      index++;
      continue;
    }

    if (!elves[index]) {
      elves.push(Number(value));
    } else {
      elves[index] = elves[index] + Number(value);
    }
  }

  elves.sort((a, b) => b - a);
  elves.slice(0, 3).forEach((elf) => {
    sum += elf;
  });

  return sum;
}
