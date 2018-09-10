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

class SplitCalculator extends PureComponent<Props> {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
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
            {getPace(
              this.props.meters / 2,
              this.props.seconds - this.props.value
            )}
          </Text>
          <View style={{ paddingVertical: 10 }}>
            <input
              type="range"
              value={this.props.seconds - this.props.value}
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
