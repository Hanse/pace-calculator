// @flow

import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { getPace } from './formatting';
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
      <View key={this.props.seconds} style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, padding: 10 }}>
          <Text style={[styles.text, styles.textBold]}>
            <Text style={{ color: '#999' }}>1st</Text> {this.props.meters / 2} m
          </Text>
          <Text style={styles.text}>
            {getPace(this.props.meters / 2, this.props.value)}
          </Text>
          <input
            type="range"
            value={this.props.value}
            min={0}
            max={this.props.seconds}
            onChange={this.props.onChange}
          />
        </View>
        <View style={{ flex: 1, padding: 10 }}>
          <Text style={[styles.text, styles.textBold]}>
            <Text style={{ color: '#999' }}>2nd</Text> {this.props.meters / 2} m
          </Text>
          <Text style={styles.text}>
            {getPace(
              this.props.meters / 2,
              this.props.seconds - this.props.value
            )}
          </Text>
          <input
            type="range"
            value={this.props.seconds - this.props.value}
            min={0}
            disabled
            max={this.props.seconds}
          />
        </View>
      </View>
    );
  }
}

export default SplitCalculator;
