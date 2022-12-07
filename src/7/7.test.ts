import path from 'path';
import { describe, expect, test } from 'vitest';
import { loadFile } from '../utils/load-file';
import { findDirectoryToRemove, getSumOfDirectorySizes } from './no-space-left-on-device';

const samplePath = path.resolve(__dirname, './sample.txt');
const sample = loadFile(samplePath);

const puzzlePath = path.resolve(__dirname, './input.txt');
const puzzle = loadFile(puzzlePath);

describe('Day 7', () => {
  describe('Part 1: Get sum of directories under 10k', () => {
    test('Sample inputs', () => {
      expect(getSumOfDirectorySizes(sample, 100000)).toBe(95437);
    });

    test('Puzzle input', () => {
      expect(getSumOfDirectorySizes(puzzle, 100000)).toBe(1555642);
    });
  });

  describe('Part 2: Get sum of directories under 10k', () => {
    test('Sample inputs', () => {
      expect(findDirectoryToRemove(sample)).toBe(24933642);
    });

    test('Puzzle input', () => {
      expect(findDirectoryToRemove(puzzle)).toBe(5974547);
    });
  });
});
