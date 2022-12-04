import { isRangeContained } from '../utils/is-range-contained';

export function getCampOverlap(input: string[], isFullyContained = false): number {
  let total = 0;

  for (let i = 0; i < input.length; i++) {
    const [elf1, elf2] = input[i].split(',');
    const range1 = elfRangeToArray(elf1);
    const range2 = elfRangeToArray(elf2);

    if (isRangeContained(range1, range2, isFullyContained)) {
      total = total + 1;
    }
  }

  return total;
}

function elfRangeToArray(range: string): number[] {
  const [start, end] = range.split('-');

  return [Number(start), Number(end)];
}
