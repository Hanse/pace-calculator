// @flow

import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import PaceCalculatorInputController from './PaceCalculatorInputController';
import PaceCalculatorView from './PaceCalculatorView';

class App extends PureComponent<{}> {
  render() {
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <View>
          <Text style={{ fontSize: 32 }}>
            <Text role="img" aria-label="runner">
              🏃‍♂️
            </Text>How <Text>fast</Text> must I run?<Text
              role="img"
              aria-label="runner"
            >
              🏃🏽‍♀️
            </Text>
          </Text>
        </View>

        <PaceCalculatorInputController
          render={props => <PaceCalculatorView {...props} />}
        />

        <View>
          <Text>Made by koren.im</Text>
        </View>
      </View>
    );
  }
}

export default App;
