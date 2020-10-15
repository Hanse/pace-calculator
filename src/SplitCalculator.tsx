import React, { PureComponent } from 'react';

import { getPace, toHHMMSS, withCommas } from './formatting';
import Media from './Media';
import styles from './styles';

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
              <button onClick={update(-1)}>
                <span style={{ fontSize: 26 }}>-</span>
              </button>

              <button style={styles.button} onClick={update(1)}>
                <span style={{ fontSize: 26 }}>+</span>
              </button>
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

class SplitCalculator extends PureComponent<Props> {
  render() {
    const firstSeconds = this.props.value;
    const lastSeconds = this.props.seconds - this.props.value;

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
                backgroundColor: getColor(diff / this.props.seconds),
              }}
            />
            <div>
              <span style={{ color: '#999' }}>1st</span>{' '}
              {withCommas(this.props.meters / 2)} m,{' '}
              {toHHMMSS(firstSeconds, 'normal')}
              {getPace(this.props.meters / 2, this.props.value)}
              <RangeInput
                value={this.props.value}
                min={0}
                max={this.props.seconds}
                onChange={this.props.onChange}
              />
            </div>
            <div style={{ flex: 1, padding: 10 }}>
              <span style={{ color: '#999' }}>2nd</span>{' '}
              {withCommas(this.props.meters / 2)} m,{' '}
              {toHHMMSS(lastSeconds, 'normal')}
              {getPace(this.props.meters / 2, lastSeconds)}
              <RangeInput
                value={lastSeconds}
                min={0}
                disabled
                max={this.props.seconds}
              />
            </div>
          </div>
        )}
      </Media>
    );
  }
}

export default SplitCalculator;
