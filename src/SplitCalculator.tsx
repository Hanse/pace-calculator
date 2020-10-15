import * as React from 'react';

import { getPace, toHHMMSS, withCommas } from './formatting';
import Media from './Media';

type RangeInputProps = {
  value: number;
  min: number;
  max: number;
  onChange?: (event: Object) => void;
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

type Props = {
  meters: number;
  seconds: number;
  onChange: (e: any) => any;
  value: number;
};

function getColor(value: number) {
  return value <= 0 ? '#2ecc71' : '#e74c3c';
}

function SplitCalculator({ value, seconds, meters, onChange }: Props) {
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
            <span style={{ color: '#999' }}>1st</span> {withCommas(meters / 2)}{' '}
            m, {toHHMMSS(firstSeconds, 'normal')}
            {getPace(meters / 2, value)}
            <RangeInput
              value={value}
              min={0}
              max={seconds}
              onChange={onChange}
            />
          </div>
          <div style={{ flex: 1, padding: 10 }}>
            <span style={{ color: '#999' }}>2nd</span> {withCommas(meters / 2)}{' '}
            m, {toHHMMSS(lastSeconds, 'normal')}
            {getPace(meters / 2, lastSeconds)}
            <RangeInput value={lastSeconds} min={0} disabled max={seconds} />
          </div>
        </div>
      )}
    </Media>
  );
}

export default SplitCalculator;
