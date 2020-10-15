// @flow

type ToHHMMSSMode = 'units' | 'normal' | null;
type Seconds = number;

export const toHHMMSS = (
  time: Seconds,
  mode: ToHHMMSSMode = 'units',
  digits: number = 0
) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - hours * 3600) / 60);
  const seconds = time - hours * 3600 - minutes * 60;

  const parts = [
    [hours, 'hours'],
    [minutes, 'min'],
    [seconds.toFixed(digits), 'sec']
  ];

  if (!hours) {
    parts.shift();
  }

  if (mode === 'units') {
    return parts.map(([value, unit]) => `${value} ${unit}`).join(' ');
  }

  return parts.map(([value]) => (+value < 10 ? `0${value}` : value)).join(':');
};

export const toKMH = (meters: number, seconds: number) => {
  return (seconds === 0 ? 0 : (meters / seconds) * 3.6).toFixed(1) + ' km/h';
};

export const withCommas = (value: number, fixed: number = 0) => {
  return value.toFixed(fixed).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getPace = (meters: number, seconds: number) => {
  return `${toHHMMSS(
    (seconds * 1000) / (meters || 1),
    'normal'
  )} min/km (${toKMH(meters, seconds)})`;
};
