type Signal = number | Signal[];

export function decodeDistressSignal(input: string) {
  const pairs = input.split('\n\n');
  let total = 0;

  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('\n');
    const [left, right] = pair.map((p) => JSON.parse(p));
    if (compare([left, right])) {
      total += i + 1;
    }
  }

  return total;
}

export function compare([left, right]: [Signal, Signal]): boolean | undefined {
  if ([left, right].every(Number.isInteger)) {
    if (left < right) return true;
    if (left > right) return false;
    return;
  }

  // Typescript cannot infer that left and right are arrays inside of .every, so we have to do each comparison separately
  // if ([left, right].every(Array.isArray)) {
  if (Array.isArray(left) && Array.isArray(right)) {
    const larr = left;
    const rarr = right;

    for (let i = 0; i < Math.min(larr.length, rarr.length); i++) {
      const res = compare([larr[i], rarr[i]]);
      if (res != null) return res;
    }

    return compare([larr.length, rarr.length]);
  }

  return compare([[left].flat(), [right].flat()]);
}
