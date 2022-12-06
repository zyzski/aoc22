import { describe, expect, test } from 'vitest';
import { findUniqueSequenceStart } from './find-unique-sequence-start';

const samples = ['bvwbjplbgvbhsrlpgdmjqwftvncz', 'nppdvjthqldpwncqszvftbrmjlhg', 'mm'];
const sampleAnswers = [5, 6, -1];

describe('findUniqueSequenceStart', () => {
  test('Sample inputs', () => {
    samples.forEach((sample, index) => {
      expect(findUniqueSequenceStart(sample, 4)).toBe(sampleAnswers[index]);
    });
  });
});
