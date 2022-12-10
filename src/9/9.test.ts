import path from 'path';
import { describe, expect, test } from 'vitest';
import { loadFile } from '../utils/load-file';
import { simulateRope } from './rope-bridge';

const samplePath = path.resolve(__dirname, './sample.txt');
const sample = loadFile(samplePath);

const puzzlePath = path.resolve(__dirname, './input.txt');
const puzzle = loadFile(puzzlePath);

describe('Day 9', () => {
  describe('Part 1', () => {
    test('Sample inputs', () => {
      expect(simulateRope(sample)).toBe(13);
    });

    // test('Puzzle input', () => {
    //   expect(simulateRope(puzzle)).toBe(6470);
    // });
  });
});
