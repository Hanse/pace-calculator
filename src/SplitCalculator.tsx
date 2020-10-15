import * as React from 'react';

import { getPace, toHHMMSS, withCommas } from './formatting';
import Media from './Media';

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
  const update = (offset: number) => () =>
    onChange &&
    onChange({ target: { value: clamp(value + offset, min, max).toString() } });

  return (
    <Media query="(max-width: 768px)" defaultMatches={true}>
      {(isMobile) =>
        isMobile ? (
          onChange ? (
            <div style={{ flexDirection: 'row' }}>
              <button onClick={update(-1)}>-</button>
              <button onClick={update(1)}>+</button>
            </div>
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
        )
      }
    </Media>
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

  return (
    <Media query="(max-width: 768px)" defaultMatches={true}>
      {(isMobile) => (
        <div
          style={{
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: 0,
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: getColor(diff / seconds),
            }}
          />
          <div>
            <span>
              <span style={{ color: '#999' }}>1st</span>{' '}
              {withCommas(meters / 2)} m, {toHHMMSS(firstSeconds, 'normal')}
            </span>
            <span>{getPace(meters / 2, value)}</span>
            <RangeInput
              value={value}
              min={0}
              max={seconds}
              onChange={onChange}
            />
          </div>
          <div>
            <span>
              <span style={{ color: '#999' }}>2nd</span>{' '}
              {withCommas(meters / 2)} m, {toHHMMSS(lastSeconds, 'normal')}
            </span>
            <span>{getPace(meters / 2, lastSeconds)}</span>
            <RangeInput value={lastSeconds} min={0} disabled max={seconds} />
          </div>
        </div>
      )}
    </Media>
  );
}

export default SplitCalculator;
