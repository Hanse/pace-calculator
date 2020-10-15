// @flow

import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getPace, withCommas, toHHMMSS } from './formatting';
import styles from './styles';
import Media from './Media';

type RangeInputProps = {
  value: number,
  min: number,
  max: number,
  onChange?: (event: Object) => mixed,
  disabled?: boolean
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function RangeInput({ value, min, max, onChange, disabled }: RangeInputProps) {
  const update = offset => () =>
    onChange &&
    onChange({ target: { value: clamp(value + offset, min, max).toString() } });

  return (
    <Media query="(max-width: 768px)" defaultMatches={true}>
      {isMobile =>
        isMobile ? (
          onChange ? (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.button} onPress={update(-1)}>
                <Text style={{ fontSize: 26 }}>-</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={update(1)}>
                <Text style={{ fontSize: 26 }}>+</Text>
              </TouchableOpacity>
            </View>
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
  meters: number,
  seconds: number,
  onChange: Object => mixed,
  value: number
};

function getColor(value) {
  return value <= 0 ? '#2ecc71' : '#e74c3c';
}

class SplitCalculator extends PureComponent<Props> {
  render() {
    const firstSeconds = this.props.value;
    const lastSeconds = this.props.seconds - this.props.value;

    const diff = lastSeconds - firstSeconds;

    return (
      <Media query="(max-width: 768px)" defaultMatches={true}>
        {isMobile => (
          <View
            style={{
              flexDirection: isMobile ? 'column' : 'row'
            }}
          >
            <View
              style={{
                position: 'absolute',
                right: 0,
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: getColor(diff / this.props.seconds)
              }}
            />
            <View style={{ flex: 1, padding: 10 }}>
              <Text
                style={[styles.text, styles.textBold, { paddingBottom: 6 }]}
              >
                <Text style={{ color: '#999' }}>1st</Text>{' '}
                {withCommas(this.props.meters / 2)} m,{' '}
                {toHHMMSS(firstSeconds, 'normal')}
              </Text>
              <Text style={[styles.text, styles.textSmall]}>
                {getPace(this.props.meters / 2, this.props.value)}
              </Text>
              <View style={{ paddingVertical: 10 }}>
                <RangeInput
                  value={this.props.value}
                  min={0}
                  max={this.props.seconds}
                  onChange={this.props.onChange}
                />
              </View>
            </View>
            <View style={{ flex: 1, padding: 10 }}>
              <Text
                style={[styles.text, styles.textBold, { paddingBottom: 6 }]}
              >
                <Text style={{ color: '#999' }}>2nd</Text>{' '}
                {withCommas(this.props.meters / 2)} m,{' '}
                {toHHMMSS(lastSeconds, 'normal')}
              </Text>
              <Text style={[styles.text, styles.textSmall]}>
                {getPace(this.props.meters / 2, lastSeconds)}
              </Text>
              <View style={{ paddingVertical: 10 }}>
                <RangeInput
                  value={lastSeconds}
                  min={0}
                  disabled
                  max={this.props.seconds}
                />
              </View>
            </View>
          </View>
        )}
      </Media>
    );
  }
}

export default SplitCalculator;
