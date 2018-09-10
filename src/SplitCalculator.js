// @flow

import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { getPace, withCommas } from './formatting';
import styles from './styles';

type Props = {
  meters: number,
  seconds: number,
  onChange: number => mixed,
  value: number
};

function getColor(value) {
  return value < 0 ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)';
}

class SplitCalculator extends PureComponent<Props> {
  render() {
    const firstSeconds = this.props.value;
    const lastSeconds = this.props.seconds - this.props.value;

    const diff = lastSeconds - firstSeconds;

    return (
      <View
        style={{
          flexDirection: 'row'
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
          <Text style={[styles.text, styles.textBold, { paddingBottom: 6 }]}>
            <Text style={{ color: '#999' }}>1st</Text>{' '}
            {withCommas(this.props.meters / 2)} m
          </Text>
          <Text style={styles.text}>
            {getPace(this.props.meters / 2, this.props.value)}
          </Text>
          <View style={{ paddingVertical: 10 }}>
            <input
              type="range"
              value={this.props.value}
              min={0}
              max={this.props.seconds}
              onChange={this.props.onChange}
            />
          </View>
        </View>
        <View style={{ flex: 1, padding: 10 }}>
          <Text style={[styles.text, styles.textBold, { paddingBottom: 6 }]}>
            <Text style={{ color: '#999' }}>2nd</Text>{' '}
            {withCommas(this.props.meters / 2)} m
          </Text>
          <Text style={styles.text}>
            {getPace(this.props.meters / 2, lastSeconds)}
          </Text>
          <View style={{ paddingVertical: 10 }}>
            <input
              type="range"
              value={lastSeconds}
              min={0}
              disabled
              max={this.props.seconds}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default SplitCalculator;
