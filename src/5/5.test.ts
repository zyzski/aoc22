import path from 'path';
import { describe, expect, test } from 'vitest';
import { loadFileWithoutSplitting } from '../utils/load-file';
import { getSupplyStacksTopCargo } from './supply-stacks';

const samplePath = path.resolve(__dirname, './sample.txt');
const sample = loadFileWithoutSplitting(samplePath);

const puzzlePath = path.resolve(__dirname, './input.txt');
const puzzle = loadFileWithoutSplitting(puzzlePath);

describe('Day 5', () => {
  describe('Part 1: Top Cargo on each stack with CrateMover 9000', () => {
    test('Sample input', () => {
      expect(getSupplyStacksTopCargo(sample)).toBe('CMZ');
    });

    test('Puzzle input', () => {
      expect(getSupplyStacksTopCargo(puzzle)).toBe('GRTSWNJHH');
    });
  });

  describe('Part 2: Top Cargo on each stack with CrateMover 9001', () => {
    test('Sample input', () => {
      expect(getSupplyStacksTopCargo(sample, true)).toBe('MCD');
    });

    test('Puzzle input', () => {
      expect(getSupplyStacksTopCargo(puzzle, true)).toBe('QLFQDBBHM');
    });
  });
});
