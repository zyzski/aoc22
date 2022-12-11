import path from 'path';
import { describe, expect, test } from 'vitest';
import { loadFile } from '../utils/load-file';
import { getSignalStrength } from './cathode-ray-tube';

const samplePath = path.resolve(__dirname, './sample.txt');
const sample = loadFile(samplePath);

const puzzlePath = path.resolve(__dirname, './input.txt');
const puzzle = loadFile(puzzlePath);

describe('Day 10', () => {
  describe('Part 1', () => {
    test('Sample inputs', () => {
      expect(getSignalStrength(sample)).toBe(13140);
    });

    test('Puzzle input', () => {
      expect(getSignalStrength(puzzle)).toBe(6470);
    });
  });
});
