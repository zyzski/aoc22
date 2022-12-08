import path from 'path';
import { describe, expect, test } from 'vitest';
import { loadFile } from '../utils/load-file';
import { findBestTreeViewScore, findVisibleTrees } from './treetop-tree-house';

const samplePath = path.resolve(__dirname, './sample.txt');
const sample = loadFile(samplePath);

const puzzlePath = path.resolve(__dirname, './input.txt');
const puzzle = loadFile(puzzlePath);

describe('Day 7', () => {
  describe('Part 1: Find number of visible trees', () => {
    test('Sample inputs', () => {
      expect(findVisibleTrees(sample)).toBe(21);
    });

    // test('Puzzle input', () => {
    //   expect(findVisibleTrees(puzzle)).toBe(1690);
    // });
  });

  describe('Part 2: Get sum of directories under 10k', () => {
    test('Sample inputs', () => {
      expect(findBestTreeViewScore(sample)).toBe(8);
    });

    // test('Puzzle input', () => {
    //   expect(findDirectoryToRemove(puzzle)).toBe(5974547);
    // });
  });
});
