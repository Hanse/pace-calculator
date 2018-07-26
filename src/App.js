// @flow

import React, { PureComponent } from 'react';
import { View, Text, ScrollView } from 'react-native';
import PaceCalculatorInputController from './PaceCalculatorInputController';
import PaceCalculatorView from './PaceCalculatorView';
import styles from './styles';

const PADDING = 25;

const ExternalLink = ({ style, ...props }: { style?: any }) => (
  <Text
    accessibilityRole="link"
    style={[{ color: '#999' }, style]}
    {...props}
  />
);

class App extends PureComponent<{}> {
  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <View
          style={{
            backgroundColor: '#F6DF8C',
            paddingHorizontal: PADDING,
            paddingVertical: PADDING / 2
          }}
        >
          <Text
            style={{
              fontSize: 40,
              fontWeight: '700',
              color: '#63958D'
            }}
          >
            Pace Calculator
          </Text>
        </View>

        <View style={{ padding: PADDING, paddingBottom: 0 }}>
          <PaceCalculatorInputController
            render={({ meters, seconds }) => (
              <PaceCalculatorView {...{ meters, seconds }} />
            )}
          />
        </View>

        <View style={{ paddingHorizontal: 40, paddingVertical: 20 }}>
          <Text style={[styles.text, styles.textSmall]}>
            Feedback can be sent to{' '}
            <ExternalLink href="mailto:feedback@koren.im">
              feedback@koren.im
            </ExternalLink>{' '}
            or to{' '}
            <ExternalLink href="https://twitter.com/Hanse">@Hanse</ExternalLink>{' '}
            on Twitter
          </Text>
        </View>
      </ScrollView>
    );
  }
}

export default App;
