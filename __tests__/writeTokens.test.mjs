import trash from 'trash';

import { writeTokens } from '../bin/functions/filesystem/writeTokens';

import { defaultConfig } from '../testdata/defaultConfig.mjs';
import { colorFrame } from '../testdata/colorFrame.mjs';
import { spacingFrame } from '../testdata/spacingFrame.mjs';
import { fontFrame } from '../testdata/fontFrame.mjs';
import { fontSizeFrame } from '../testdata/fontSizeFrame.mjs';
import { fontWeightFrame } from '../testdata/fontWeightFrame.mjs';
import { lineHeightFrame } from '../testdata/lineHeightFrame.mjs';
import { borderWidthsFrame } from '../testdata/borderWidthsFrame.mjs';
import { letterSpacingsFrame } from '../testdata/letterSpacingsFrame.mjs';
import { mediaQueriesFrame } from '../testdata/mediaQueriesFrame.mjs';
import { radiiFrame } from '../testdata/radiiFrame.mjs';
import { shadowsFrame } from '../testdata/shadowsFrame.mjs';
import { zIndicesFrame } from '../testdata/zIndicesFrame.mjs';

// Set temp folder
const TEMP_FOLDER = `__tokens__`;
defaultConfig.outputFolderTokens = TEMP_FOLDER;

test('It should throw an error if no parameter is provided', async () => {
  await expect(writeTokens()).rejects.toThrow();
});

test('It should pass the zero-length token check', async () => {
  const TOKENS = [{}, {}];
  await expect(writeTokens(TOKENS)).rejects.toThrow();
});

test('It should fail the zero-length token check', async () => {
  const TOKENS = [];
  await expect(writeTokens(TOKENS)).rejects.toThrow();
});

test('It should return tokens if passed a valid set of frame and settings', async () => {
  const TOKENS = [
    colorFrame,
    spacingFrame,
    fontFrame,
    fontSizeFrame,
    fontWeightFrame,
    lineHeightFrame,
    borderWidthsFrame,
    letterSpacingsFrame,
    mediaQueriesFrame,
    radiiFrame,
    shadowsFrame,
    zIndicesFrame
  ];

  await expect(writeTokens(TOKENS, defaultConfig)).resolves.toBe(true);
  await trash(TEMP_FOLDER);
});

/*
test('It can write to a file if provided input', () => {
  const FILE = '__test-writefile1.txt';
  writeTokens(JSON.stringify({ something: 1234 }), './', FILE);
  trash('./somefile.txt');
});

test('It can write a token to a file if provided input', () => {
  const FILE = '__test-writefile2.txt';
  writeTokens(JSON.stringify({ something: 1234 }), './', FILE, true);
  trash('./somefile.txt');
});
*/
