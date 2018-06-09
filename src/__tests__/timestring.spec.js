// @flow

import ts from '../timestring';

it('convert timestrings to seconds', () => {
  expect(ts('1m')).toEqual(60);
  expect(ts('1m 2s')).toEqual(60 + 2);
  expect(ts('0s')).toEqual(0);
  expect(ts('1h 2min 2s')).toEqual(3600 + 120 + 2);
  expect(ts('10h')).toEqual(10 * 3600);
  expect(ts('40s 1m')).toEqual(100);
  expect(ts('4h rs')).toEqual(4 * 3600);
});

it('should strip spaces', () => {
  expect(ts('10 m   2       s')).toEqual(602);
});

it('should match substrings', () => {
  expect(ts('1min   2       sss')).toEqual(62);
});
