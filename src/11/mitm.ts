/*
Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0
*/

class Monkey {
  number: number; // currently using array index instead, but might be required later
  items: number[];
  op: string;
  test: (divisor: number) => boolean;
  sendToTrue: number;
  sendToFalse: number;
  inspections = 0;
  decreaseWorryOnInspect: boolean;
  modulo = 0;

  constructor(public input: string[], decreaseWorryOnInspect?: boolean, modulo?: number) {
    const { number, items, op, test, sendToTrue, sendToFalse } = this.parseInput(input);
    this.number = number;
    this.items = items;
    this.op = op;
    this.test = (value) => value % test === 0;
    this.sendToTrue = sendToTrue;
    this.sendToFalse = sendToFalse;
    this.decreaseWorryOnInspect = decreaseWorryOnInspect ?? true;
    this.modulo = modulo ?? 0;
  }

  parseInput(input: string[]) {
    const number: Monkey['number'] = +input[0].replace('Monkey ', '').slice(0, -1);
    const items: Monkey['items'] = input[1]
      .replace('  Starting items: ', '')
      .split(', ')
      .map((item) => +item);

    const op = input[2].replace('  Operation: new = old ', '');
    const test = +input[3].replace('  Test: divisible by ', '');

    const sendToTrue = +input[4].replace('    If true: throw to monkey ', '');
    const sendToFalse = +input[5].replace('    If false: throw to monkey ', '');

    return {
      number,
      items,
      op,
      test,
      sendToTrue,
      sendToFalse,
    };
  }

  inspect(monkeys: Monkey[]) {
    while (this.items.length > 0) {
      let item = this.items.shift() as number;

      if (item) {
        const op = this.op.replace('old', item.toString());
        item = eval(`${item} ${op}`);
        // console.log(`Worry level -> ${op} = ${item}`);

        item = this.decreaseWorry(item);
        // console.log(`Monkey gets bored with item. Worry level is divided by 3 to ${item}`);

        // part 2: modulo trick to keep numbers small
        // multiply each of the monkey's divisors together to get the modulo
        // https://www.reddit.com/r/adventofcode/comments/zjsi12/2022_day_11_on_the_spoiler_math_involved/
        if (this.modulo) {
          item = item % this.modulo;
        }

        const sendTo = this.test(item) ? this.sendToTrue : this.sendToFalse;

        // console.log(`Item with worry level ${item} is thrown to ${sendTo}`);
        monkeys[sendTo].addItem(item);
      }

      this.inspections++;
    }
  }

  addItem(item: number) {
    this.items.push(item);
  }

  decreaseWorry(item: number): number {
    if (!this.decreaseWorryOnInspect) {
      return item;
    }

    return Math.floor(item / 3);
  }
}

export function monkeyInTheMiddle(input: string, rounds = 20, decreaseWorryOnInspect = true, modulo?: number): number {
  // console.log('Monkey, Knife, Fight!');
  const monkeys = input.split('\n\n').map((monkey) => new Monkey(monkey.split('\n'), decreaseWorryOnInspect, modulo));

  for (let round = 1; round <= rounds; round++) {
    for (let i = 0; i < monkeys.length; i++) {
      const monkey = monkeys[i];
      monkey.inspect(monkeys);
    }
  }

  // console.log(monkeys);
  const score = getMonkeyBusinessScore(monkeys);
  return score;
}

function getMonkeyBusinessScore(monkeys: Monkey[]): number {
  const scores = monkeys.map((monkey) => monkey.inspections);
  scores.sort((a, b) => b - a);
  return scores[0] * scores[1];
}
