// @flow

import React, { PureComponent } from 'react';
import { View, Text, ScrollView } from 'react-native';
import PaceCalculatorInputController from './PaceCalculatorInputController';
import PaceCalculatorView from './PaceCalculatorView';

const PADDING = 20;

class App extends PureComponent<{}> {
  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ backgroundColor: '#F6DF8C', padding: PADDING }}>
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

        <View style={{ padding: PADDING }}>
          <PaceCalculatorInputController
            render={({ meters, seconds }) => (
              <PaceCalculatorView {...{ meters, seconds }} />
            )}
          />
        </View>
      </ScrollView>
    );
  }
}

export default App;
