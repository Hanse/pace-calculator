// @flow

import React, { PureComponent, type Node } from 'react';
import { View, Text, Picker, TextInput, Platform } from 'react-native';
import qs from 'qs';
import { parseSeconds, parseMeters } from './parsers';
import Card from './Card';
import styles from './styles';
import PRESETS from './presets';

type Props = {
  render: ({ meters: number, seconds: number }) => Node
};

type State = {
  time: string,
  distance: string
};

function getInitialState() {
  if (Platform.OS !== 'web') {
    return {
      time: '',
      distance: ''
    };
  }

  const query = qs.parse(window.location.search.slice(1) || '');
  return {
    time: query.time || '',
    distance: query.distance || ''
  };
}

class PaceCalculator extends PureComponent<Props, State> {
  state = getInitialState();

  handlePresetSelect = (key: string) => {
    const [distance, time] = key ? PRESETS[key] : ['', ''];
    this.setState({ time, distance });
  };

  handleInput = (e: SyntheticInputEvent<*>) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (
      Platform.OS === 'web' &&
      (this.state.time !== prevState.time ||
        this.state.distance !== prevState.distance)
    ) {
      global.history.pushState(
        null,
        null,
        `?time=${this.state.time}&distance=${this.state.distance}`
      );
    }
  }

  render() {
    return (
      <View>
        <View style={{ marginBottom: 30 }}>
          <View style={{ paddingVertical: 10 }}>
            <Text style={[styles.text, styles.textBold]}>Enter a goal</Text>
          </View>
          <Card>
            <View style={{ marginBottom: 15 }}>
              <Text style={[styles.text, styles.textSmall, styles.textBold]}>
                {'Distance 👟'}
              </Text>
              <TextInput
                style={[styles.textInput]}
                autoCapitalize="none"
                autoFocus
                type="text"
                name="distance"
                placeholder="a marathon or 1500 m"
                value={this.state.distance}
                onChange={this.handleInput}
              />
            </View>
            <View>
              <Text style={[styles.text, styles.textSmall, styles.textBold]}>
                {'Time ⏱'}
              </Text>
              <TextInput
                autoCapitalize="none"
                style={[styles.textInput]}
                type="text"
                name="time"
                placeholder="3:26.00 or 3 hours"
                value={this.state.time}
                onChange={this.handleInput}
              />
            </View>

            <View style={{ paddingTop: 40 }}>
              <Text style={[styles.text, styles.textSmall, styles.textBold]}>
                Or you can select from our presets
              </Text>
            </View>
            <Picker
              onValueChange={this.handlePresetSelect}
              style={styles.picker}
            >
              <Picker.Item label="Select a preset" value="" />
              {Object.keys(PRESETS).map(key => {
                const [, , description] = PRESETS[key];
                return (
                  <Picker.Item key={key} label={description} value={key} />
                );
              })}
            </Picker>
          </Card>
        </View>

        <View style={{ paddingVertical: 10 }}>
          <Text style={[styles.text, styles.textBold]}>Timing data</Text>
        </View>

        {this.props.render({
          meters: parseMeters(this.state.distance),
          seconds: parseSeconds(this.state.time)
        })}
      </View>
    );
  }
}

export default PaceCalculator;
