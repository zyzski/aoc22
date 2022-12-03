import path from 'path';
import { describe, expect, test } from 'vitest';
import { loadFile } from '../utils/load-file';
import { getBadgePrioritySum, getPrioritySum } from './rucksack-reorg';

const samplePath = path.resolve(__dirname, './sample.txt');
const sample = loadFile(samplePath);

const puzzlePath = path.resolve(__dirname, './input.txt');
const puzzle = loadFile(puzzlePath);

describe('Day 3', () => {
  describe('Part 1: Rucksack item priority sum', () => {
    test('Sample input', () => {
      expect(getPrioritySum(sample)).toBe(157);
    });

    test('Puzzle input', () => {
      expect(getPrioritySum(puzzle)).toBe(7727);
    });
  });

  describe('Part 2: Rucksack badge priority sum', () => {
    test('Sample input', () => {
      expect(getBadgePrioritySum(sample)).toBe(70);
    });

    test('Puzzle input', () => {
      expect(getBadgePrioritySum(puzzle)).toBe(2609);
    });
  });
});
