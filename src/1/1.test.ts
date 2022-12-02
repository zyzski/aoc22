import path from 'path';
import { describe, test, expect } from 'vitest';
import { loadFile } from '../utils/load-file';
import { getMostCalories } from './get-most-calories';
import { getTopCaloriesSum } from './get-top-calories-sum';

const samplePath = path.resolve(__dirname, './sample.txt');
const sample = loadFile(samplePath);

const puzzlePath = path.resolve(__dirname, './input.txt');
const puzzle = loadFile(puzzlePath);

describe('Day 1', () => {
  describe('Elf with the most calories', () => {
    test('Sample input', () => {
      expect(getMostCalories(sample)).toBe(24000);
    });

    test('Puzzle input', () => {
      expect(getMostCalories(puzzle)).toBe(68923);
    });
  });

  describe('Top 3 Elf Calories', () => {
    test('Sample input', () => {
      expect(getTopCaloriesSum(sample)).toBe(45000);
    });

    test('Puzzle input', () => {
      expect(getTopCaloriesSum(puzzle)).toBe(200044);
    });
  });
});
