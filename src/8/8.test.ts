import path from 'path';
import { describe, expect, test } from 'vitest';
import { loadFile } from '../utils/load-file';
import { findBestTreeViewScore, findVisibleTrees } from './treetop-tree-house';

const samplePath = path.resolve(__dirname, './sample.txt');
const sample = loadFile(samplePath);

const puzzlePath = path.resolve(__dirname, './input.txt');
const puzzle = loadFile(puzzlePath);

describe('Day 8', () => {
  describe('Part 1: Find number of visible trees', () => {
    test('Sample inputs', () => {
      expect(findVisibleTrees(sample)).toBe(21);
    });

    test('Puzzle input', () => {
      expect(findVisibleTrees(puzzle)).toBe(1690);
    });
  });

  describe('Part 2: Find tree with best view', () => {
    test('Sample inputs', () => {
      expect(findBestTreeViewScore(sample)).toBe(8);
    });

    test('Puzzle input', () => {
      expect(findBestTreeViewScore(puzzle)).toBe(535680);
    });
  });
});
