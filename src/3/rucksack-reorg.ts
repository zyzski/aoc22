import { getIntersection, getIntersections } from '../utils/get-intersection';

const itemTypes = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const itemPriority = itemTypes.split('').reduce<Record<string, number>>((prev, letter, index) => {
  prev[letter] = index + 1;
  return prev;
}, {});

function letterToPriority(letter: string): number {
  return itemPriority[letter];
}

export function getPrioritySum(input: string[]): number {
  let sum = 0;

  for (let i = 0; i < input.length; i++) {
    const sack = input[i].split('');
    const firstHalf = sack.slice(0, sack.length / 2);
    const secondHalf = sack.slice(sack.length / 2);
    const intersection = getIntersection(firstHalf, secondHalf);

    intersection.forEach((letter) => {
      sum += letterToPriority(letter);
    });
  }

  return sum;
}

export function getBadgePrioritySum(input: string[]): number {
  let sum = 0;

  while (input.length) {
    const group = input.splice(0, 3).map((sack) => sack.split(''));
    const intersection = getIntersections(group);

    intersection.forEach((letter) => {
      sum += letterToPriority(letter);
    });
  }

  return sum;
}
