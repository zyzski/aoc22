import path from 'path';
import { describe, expect, test } from 'vitest';
import { loadFileWithoutSplitting } from '../utils/load-file';
import { monkeyInTheMiddle } from './mitm';

const samplePath = path.resolve(__dirname, './sample.txt');
const sample = loadFileWithoutSplitting(samplePath);

const puzzlePath = path.resolve(__dirname, './input.txt');
const puzzle = loadFileWithoutSplitting(puzzlePath);

describe('Day 11: Monkey in the middle', () => {
  describe('Part 1: Level of monkey business after 20 rounds', () => {
    test('Sample input', () => {
      expect(monkeyInTheMiddle(sample)).toBe(10605);
    });
    test('Puzzle input', () => {
      expect(monkeyInTheMiddle(puzzle)).toBe(51075);
    });
  });

  // describe('Part 2: Level of monkey business after 1000 rounds', () => {
  //   test('Sample input', () => {
  //     expect(monkeyInTheMiddle(sample, 100, false)).toBe(2713310158);
  //   });

  //   test('Puzzle input', () => {
  //     expect(monkeyInTheMiddle(puzzle)).toBe(15120);
  //   });
  // });
});
