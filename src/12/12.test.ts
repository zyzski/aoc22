import path from 'path';
import { describe, expect, test } from 'vitest';
import { loadFile } from '../utils/load-file';
import { getShortestHillPathSize, getShortestHillPathSize2 } from './hill-climbing-algo';

const samplePath = path.resolve(__dirname, './sample.txt');
const sample = loadFile(samplePath);

const puzzlePath = path.resolve(__dirname, './input.txt');
const puzzle = loadFile(puzzlePath);

describe('Day 12', () => {
  describe('Part 1: Find shortest path size S -> E', () => {
    test('Sample inputs', () => {
      expect(getShortestHillPathSize(sample)).toBe(31);
    });

    test('Puzzle input', () => {
      expect(getShortestHillPathSize(puzzle)).toBe(449);
    });
  });

  describe('Part 2: Find shortest path starting at any "a"', () => {
    test('Sample inputs', () => {
      expect(getShortestHillPathSize2(sample)).toBe(29);
    });

    test('Puzzle input', () => {
      expect(getShortestHillPathSize2(puzzle)).toBe(443);
    });
  });
});
