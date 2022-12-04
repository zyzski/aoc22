import path from 'path';
import { describe, expect, test } from 'vitest';
import { loadFile } from '../utils/load-file';
import { getCampOverlap } from './camp-cleanup';

const samplePath = path.resolve(__dirname, './sample.txt');
const sample = loadFile(samplePath);

const puzzlePath = path.resolve(__dirname, './input.txt');
const puzzle = loadFile(puzzlePath);

describe('Day 4', () => {
  describe('Part 1: Camp cleanup fully overlapping assignments', () => {
    test('Sample input', () => {
      expect(getCampOverlap(sample, true)).toBe(2);
    });

    test('Puzzle input', () => {
      expect(getCampOverlap(puzzle, true)).toBe(547);
    });
  });

  describe('Part 2: Camp cleanup any overlapping assignments', () => {
    test('Sample input', () => {
      expect(getCampOverlap(sample)).toBe(4);
    });

    test('Puzzle input', () => {
      expect(getCampOverlap(puzzle)).toBe(843);
    });
  });
});
