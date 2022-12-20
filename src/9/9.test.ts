import path from 'path';
import { describe, expect, test } from 'vitest';
import { loadFile } from '../utils/load-file';
import { simulateRope } from './rope-bridge-redux';

const samplePath = path.resolve(__dirname, './sample.txt');
const sample = loadFile(samplePath);

const puzzlePath = path.resolve(__dirname, './input.txt');
const puzzle = loadFile(puzzlePath);

describe('Day 9: Rope Bridge', () => {
  describe('Part 1', () => {
    test('Sample inputs', () => {
      expect(simulateRope(sample, 2)).toBe(13);
    });

    test('Puzzle input', () => {
      expect(simulateRope(puzzle, 2)).toBe(6470);
    });
  });

  describe('Part 2', () => {
    test('Sample inputs', () => {
      expect(simulateRope(sample, 10)).toBe(1);
    });

    test('Puzzle input', () => {
      expect(simulateRope(puzzle, 10)).toBe(2658);
    });
  });
});
