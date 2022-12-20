import path from 'path';
import { describe, expect, test } from 'vitest';
import { loadFile } from '../utils/load-file';
import { simulateRopeAgain } from './rope-bridge-redux';

const samplePath = path.resolve(__dirname, './sample.txt');
const sample = loadFile(samplePath);

const puzzlePath = path.resolve(__dirname, './input.txt');
const puzzle = loadFile(puzzlePath);

describe('Day 9: Rope Bridge', () => {
  describe('Part 1', () => {
    test('Sample inputs', () => {
      expect(simulateRopeAgain(sample)).toBe(13);
    });

    test('Puzzle input', () => {
      expect(simulateRopeAgain(puzzle)).toBe(6470);
    });
  });
});
