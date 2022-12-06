import { findUniqueSequenceIndex } from '../utils/find-unique-sequence-index';

const PACKET_START_LENGTH = 4;
const MESSAGE_START_LENGTH = 14;

// copilot nailed this on the first try lol
export function findPacketStart(input: string): number {
  return findUniqueSequenceIndex(input, PACKET_START_LENGTH);
}

export function findMessageStart(input: string): number {
  return findUniqueSequenceIndex(input, MESSAGE_START_LENGTH);
}
