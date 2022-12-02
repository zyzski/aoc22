import path from 'path';
import { describe, expect, test } from 'vitest';
import { loadFile } from '../utils/load-file';
import { getScoreByMove, getScoreByOutcome } from './rock-paper-scissors';

const samplePath = path.resolve(__dirname, './sample.txt');
const sample = loadFile(samplePath);

const puzzlePath = path.resolve(__dirname, './input.txt');
const puzzle = loadFile(puzzlePath);

describe('Day 2', () => {
  describe('Part 1: Rock paper scissors using strategy A', () => {
    test('Sample input', () => {
      expect(getScoreByMove(sample)).toBe(15);
    });

    test('Puzzle input', () => {
      expect(getScoreByMove(puzzle)).toBe(11063);
    });
  });

  describe('Part 2: Rock paper scissors using strategy B', () => {
    test('Sample input', () => {
      expect(getScoreByOutcome(sample)).toBe(12);
    });

    test('Puzzle input', () => {
      expect(getScoreByOutcome(puzzle)).toBe(10349);
    });
  });
});
