import path from 'path';
import { describe, expect, test } from 'vitest';
import { loadFileWithoutSplitting } from '../utils/load-file';
import { decodeDistressSignal, compare } from './distress-signal';

const samplePath = path.resolve(__dirname, './sample.txt');
const sample = loadFileWithoutSplitting(samplePath);

const puzzlePath = path.resolve(__dirname, './input.txt');
const puzzle = loadFileWithoutSplitting(puzzlePath);

const compareSamples = [
  [
    [1, 1, 3, 1, 1],
    [1, 1, 5, 1, 1],
  ],
  [
    [[1], [2, 3, 4]],
    [[1], 4],
  ],
  [[9], [[8, 7, 6]]],
  [
    [[4, 4], 4, 4],
    [[4, 4], 4, 4, 4],
  ],
  [
    [7, 7, 7, 7],
    [7, 7, 7],
  ],
  [[], [3]],
  [[[]], []],
  [
    [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
    [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
  ],
];

const compareAnswers = [true, true, false, true, false, true, false, false];

describe('Day 13: Distress signal', () => {
  describe('Compare', () => {
    compareSamples.forEach((sample, index) => {
      const [a, b] = sample;
      test(`Sample input ${JSON.stringify(a)} vs ${JSON.stringify(b)}`, () => {
        expect(compare([a, b])).toBe(compareAnswers[index]);
      });
    });
  });

  describe('Part 1: Sum of good signals', () => {
    test('Sample input', () => {
      expect(decodeDistressSignal(sample)).toBe(13);
    });
    test('Puzzle input', () => {
      expect(decodeDistressSignal(puzzle)).toBe(6395);
    });
  });

  // describe('Part 2: Level of monkey business after 1000 rounds', () => {
  //   test('Sample input', () => {
  //     expect(monkeyInTheMiddle(sample, 10000, false, 96577)).toBe(2713310158);
  //   });

  //   test('Puzzle input', () => {
  //     expect(monkeyInTheMiddle(puzzle, 10000, false, 9699690)).toBe(11741456163);
  //   });
  // });
});
