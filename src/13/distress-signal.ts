type Signal = Array<number | Signal>;

export function decodeDistressSignal(input: string) {
  const pairs = input.split('\n\n');
  console.log(pairs);

  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('\n');
    const left = JSON.parse(pair[0]);
    const right = JSON.parse(pair[1]);
  }
  return 0;
}

export function compare([left, right]: [Signal, Signal]): boolean | undefined {
  if ([left, right].every(Number.isInteger)) {
    if (left < right) return true;
    if (left > right) return false;
    return;
  }

  if ([left, right].every(Array.isArray)) {
    const larr = left as Signal[];
    const rarr = right as Signal[];

    for (let i = 0; i < Math.min(larr.length, rarr.length); i++) {
      const res = compare([larr[i], rarr[i]]);
      if (res != null) return res;
    }

    return compare([larr.length, rarr.length]);
  }

  return compare([[left].flat(), [right].flat()]);
}
