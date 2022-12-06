import path from 'path';
import { describe, expect, test } from 'vitest';
import { loadFileWithoutSplitting } from '../utils/load-file';
import { findMessageStart, findPacketStart } from './tuning-trouble';

const puzzlePath = path.resolve(__dirname, './input.txt');
const puzzle = loadFileWithoutSplitting(puzzlePath);

const samples = [
  'bvwbjplbgvbhsrlpgdmjqwftvncz',
  'nppdvjthqldpwncqszvftbrmjlhg',
  'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
  'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw',
];

const sampleAnswers = [5, 6, 10, 11];
const sampleAnswers2 = [23, 23, 29, 26];

describe('Day 6', () => {
  describe('Part 1: Find packet start subroutine', () => {
    test('Sample inputs', () => {
      samples.forEach((sample, index) => {
        expect(findPacketStart(sample)).toBe(sampleAnswers[index]);
      });
    });

    test('Puzzle input', () => {
      expect(findPacketStart(puzzle)).toBe(1655);
    });
  });

  describe('Part 1: Find message start subroutine', () => {
    test('Sample inputs', () => {
      samples.forEach((sample, index) => {
        expect(findMessageStart(sample)).toBe(sampleAnswers2[index]);
      });
    });

    test('Puzzle input', () => {
      expect(findMessageStart(puzzle)).toBe(2665);
    });
  });
});
