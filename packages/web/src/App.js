// @flow

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  SafeAreaView
} from 'react-native';
import PaceCalculatorInputController from './PaceCalculatorInputController';
import PaceCalculatorView from './PaceCalculatorView';
import globalStyles from './styles';
import { TARTAN as theme } from './theme';

const PADDING = 24;

const HEADER_HEIGHT = 60;

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
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.scrollView}>
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
        <View style={styles.header}>
          <View style={styles.container}>
            <Text style={styles.headerText}>Snittfart</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.backgroundColor,
    paddingHorizontal: PADDING,
    paddingVertical: PADDING / 2,
    display: 'flex',
    position: 'absolute',
    right: 0,
    left: 0,
    ...Platform.select({
      ios: {
        paddingTop: 44
      }
    })
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: Platform.select({
      web: HEADER_HEIGHT,
      ios: HEADER_HEIGHT - 12
    })
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