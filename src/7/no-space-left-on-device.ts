type DirectoryMap = Map<string, number>;
type FileMap = Map<string, number>;

type GetDirectorySizesOutput = {
  directories: DirectoryMap;
  files: FileMap;
};

export function getSumOfDirectorySizes(input: string[], maxSize: number): number {
  const { directories } = getDirectorySizes(input);
  let sum = 0;

  for (const [, size] of directories) {
    if (size < maxSize) {
      sum += size;
    }
  }

  return sum;
}

export function findDirectoryToRemove(input: string[]): number {
  const TOTAL_SPACE = 70000000;
  const UPDATE_SPACE = 30000000;

  const { directories } = getDirectorySizes(input);
  const currentFreeSpace = TOTAL_SPACE - (directories.get('') as number);

  let min = 0;

  for (const [, size] of directories) {
    if (size + currentFreeSpace >= UPDATE_SPACE) {
      if (!min) {
        min = size;
      } else {
        min = Math.min(min, size);
      }
    }
  }

  return min;
}

function getDirectorySizes(input: string[]): GetDirectorySizesOutput {
  const directories: DirectoryMap = new Map();
  const files: FileMap = new Map();

  const currentDir: string[] = [];
  // isScanning = true when we are in the ls command and looping over a list of files/dirs
  let isScanning = false;

  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    const isCd = line.startsWith('$ cd');
    const isLs = line.startsWith('$ ls');

    if (isCd || isLs) {
      isScanning = false;
    }

    if (isCd) {
      const cdDir = getCdDir(line);
      if (cdDir === '..') {
        currentDir.pop();
      } else {
        currentDir.push(getCdDir(line));
        directories.set(joinDir(currentDir), 0);
      }
    }

    const currentDirString = joinDir(currentDir);

    if (isScanning) {
      if (line.startsWith('dir')) {
        const dir = getDir(line);
        const fullDir = `${currentDirString}/${dir}`;
        directories.set(fullDir, 0);
      } else {
        const [size, fileName] = getFileInfo(line);
        files.set(fileName, size);

        const newSize = (directories.get(currentDirString) as number) + size;
        directories.set(currentDirString, newSize);

        // update all parent directories
        for (let j = currentDir.length - 1; j > 0; j--) {
          const parentDir = currentDir.slice(0, j);
          const parentDirString = joinDir(parentDir);
          const parentSize = (directories.get(parentDirString) as number) + size;
          directories.set(parentDirString, parentSize);
        }
      }
    }

    if (isLs) {
      isScanning = true;
    }
  }

  return {
    directories,
    files,
  };
}

function getCdDir(line: string): string {
  return line.replace('$ cd ', '');
}

function getDir(line: string): string {
  return line.replace('dir ', '');
}

function getFileInfo(line: string): [number, string] {
  const [size, fileName] = line.split(' ');
  return [Number(size), fileName];
}

function joinDir(dirs: string[]): string {
  return dirs.join('/').slice(1);
}
