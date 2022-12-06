/*
start of a packet is indicated by a sequence of four characters that are all different

your subroutine needs to identify the first position where the four most recently received characters were all different. Specifically, it needs to report the number of characters from the beginning of the buffer to the end of the first such four-character marker.

sliding window?

bvwbjplbgvbhsrlpgdmjqwftvncz -> 5

*/

import { findUniqueSequenceStart } from '../utils/find-unique-sequence-start';

const PACKET_START_LENGTH = 4;
const MESSAGE_START_LENGTH = 14;

// copilot nailed this on the first try lol
export function findPacketStart(input: string): number {
  return findUniqueSequenceStart(input, PACKET_START_LENGTH);
}

export function findMessageStart(input: string): number {
  return findUniqueSequenceStart(input, MESSAGE_START_LENGTH);
}
