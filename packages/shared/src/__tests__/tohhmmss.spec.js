// @flow

import { toHHMMSS } from '../formatting';

it('should convert to "digital" string', () => {
  expect(toHHMMSS(3 * 3600 + 30 * 60, 'normal')).toEqual('03:30:00');
});

it('should accept arguments', () => {
  expect(toHHMMSS(119.44)).toEqual('1 min 59 sec');
  expect(toHHMMSS(119.44, 'normal')).toEqual('01:59');
  expect(toHHMMSS(119.44, 'normal', 2)).toEqual('01:59.44');
});
