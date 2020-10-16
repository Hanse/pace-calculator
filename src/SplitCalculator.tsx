import { Button, Stack, useMedia } from '@devmoods/ui';
import * as React from 'react';

import { getPace, toHHMMSS, withCommas } from './formatting';

type RangeInputProps = {
  value: number;
  min: number;
  max: number;
  onChange?: (event: { target: { value: string } }) => void;
  disabled?: boolean;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

function RangeInput({ value, min, max, onChange, disabled }: RangeInputProps) {
  const isMobile = useMedia('(max-width: 768px)');

  const update = (offset: number) => () =>
    onChange?.({
      target: { value: clamp(value + offset, min, max).toString() },
    });

  return (
    <>
      {isMobile ? (
        onChange ? (
          <Stack horizontal justifyContent="space-between" marginTop="l">
            <Button onClick={update(-1)} variant="outlined" style={{ flex: 1 }}>
              -
            </Button>
            <Button onClick={update(1)} variant="outlined" style={{ flex: 1 }}>
              +
            </Button>
          </Stack>
        ) : null
      ) : (
        <input
          type="range"
          value={value}
          min={min}
          max={max}
          onChange={onChange}
          disabled={disabled}
        />
      )}
    </>
  );
}

interface SplitCalculatorProps {
  meters: number;
  seconds: number;
  onChange: (e: { target: { value: string } }) => void;
  value: number;
}

function getColor(value: number) {
  return value <= 0 ? '#2ecc71' : '#e74c3c';
}

function SplitCalculator({
  value,
  seconds,
  meters,
  onChange,
}: SplitCalculatorProps) {
  const firstSeconds = value;
  const lastSeconds = seconds - value;
  const diff = lastSeconds - firstSeconds;

  const isMobile = useMedia('(max-width: 768px)');

  return (
    <div
      style={{
        flexDirection: isMobile ? 'column' : 'row',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: -8,
          top: -8,
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: getColor(diff / seconds),
        }}
      />
      <Stack horizontal>
        <Stack spacing="xs">
          <span>
            <span style={{ color: '#999' }}>1st</span> {withCommas(meters / 2)}{' '}
            m, {toHHMMSS(firstSeconds, 'normal')}
          </span>
          <small>{getPace(meters / 2, value)}</small>
          <RangeInput value={value} min={0} max={seconds} onChange={onChange} />
        </Stack>
        <Stack spacing="xs">
          <span>
            <span style={{ color: '#999' }}>2nd</span> {withCommas(meters / 2)}{' '}
            m, {toHHMMSS(lastSeconds, 'normal')}
          </span>
          <small>{getPace(meters / 2, lastSeconds)}</small>
          <RangeInput value={lastSeconds} min={0} disabled max={seconds} />
        </Stack>
      </Stack>
    </div>
  );
}

export default SplitCalculator;
