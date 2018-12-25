// @flow

import React, { PureComponent } from 'react';
import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import PaceCalculatorInputController from './PaceCalculatorInputController';
import PaceCalculatorView from './PaceCalculatorView';
import globalStyles from './styles';
import { TARTAN as theme } from './theme';

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
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'transparent'
        }}
      >
        <View style={styles.header}>
          <View style={styles.container}>
            <Text style={styles.headerText}>Pace Charts</Text>
          </View>
        </View>

        <View style={styles.container}>
          <View style={{ padding: PADDING, paddingBottom: 0 }}>
            <PaceCalculatorInputController
              render={({ meters, seconds }) => (
                <PaceCalculatorView {...{ meters, seconds }} />
              )}
            />
          </View>

          <View style={{ paddingHorizontal: 40, paddingVertical: 20 }}>
            <Text style={[globalStyles.text, globalStyles.textSmall]}>
              Feedback can be sent to{' '}
              <ExternalLink href="mailto:feedback@koren.im">
                feedback@koren.im
              </ExternalLink>{' '}
              or to{' '}
              <ExternalLink href="https://twitter.com/Hanse">
                @Hanse
              </ExternalLink>{' '}
              on Twitter
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.backgroundColor,
    paddingHorizontal: PADDING,
    paddingVertical: PADDING / 2,
    display: 'flex'
  },
  container: {
    ...Platform.select({
      web: {
        maxWidth: 700
      }
    })
  },
  headerText: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.color
  }
});

export default App;
