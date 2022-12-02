import fs from 'fs';

export function loadFile(filePath: string) {
  return fs.readFileSync(filePath, 'utf-8').split('\n');
}
