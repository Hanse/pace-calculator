// @flow

import timestring from './timestring';

const hundreds = value => {
  if (!value) {
    return 0;
  }

  const number = value.slice(1);

  const digits = number.toString().length;
  return parseInt(number, 10) / 10 ** digits;
};

const TIMES = [
  [/^(\d+)(\.\d{1,3})?$/, match => parseInt(match[1], 10) + hundreds(match[2])],
  [
    /^(\d{1,2}):(\d{1,2})(\.\d{1,3})?$/,
    match => {
      return (
        60 * parseInt(match[1], 10) +
        parseInt(match[2], 10) +
        hundreds(match[3])
      );
    }
  ],
  [
    /^(\d{1,2}):(\d{1,2}):(\d{1,2})(\.\d{1,3})?$/,
    match => {
      return (
        60 * 60 * parseInt(match[1], 10) +
        60 * parseInt(match[2], 10) +
        parseInt(match[3], 10) +
        hundreds(match[4])
      );
    }
  ],
  [
    /.*/,
    match => {
      try {
        return timestring(match[0].replace(/,/g, '.'));
      } catch (error) {
        return 0;
      }
    }
  ]
];

const DISTANCES = [
  [/half[-\s]?marath?on/, 21098],
  [/marath?on/, 42195],
  [/10\s?km?/, 10000],
  [/5\s?km?/, 5000],
  [/[a|1]?\s?miles?/, 1609]
];

const parseInput = (rules, defaultEvaluator: string => number) => value => {
  for (const [regex, parsedValue] of rules) {
    const match = value.match(regex);
    if (match) {
      if (typeof parsedValue === 'function') {
        return parsedValue(match);
      }
      return parsedValue;
    }
  }

  return defaultEvaluator(value);
};

export const parseSeconds = parseInput(TIMES, () => 0);
export const parseMeters = parseInput(
  DISTANCES,
  value => parseFloat(value) || 0
);
