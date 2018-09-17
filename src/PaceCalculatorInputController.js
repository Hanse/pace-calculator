// @flow

import React, { PureComponent, type Node } from 'react';
import { View, Text, Picker, TextInput, Platform } from 'react-native';
import qs from 'qs';
import debounce from 'debounce';
import { parseSeconds, parseMeters } from './parsers';
import Card from './Card';
import SplitCalculator from './SplitCalculator';
import styles from './styles';
import PRESETS from './data.json';

const Label = ({ children, ...props }) => (
  <Text
    accessibilityRole="label"
    style={[styles.text, styles.textSmall, { color: '#999' }]}
    {...props}
  >
    {children}
  </Text>
);

type Props = {
  render: ({ meters: number, seconds: number }) => Node
};

type State = {
  time: string,
  distance: string,
  splitValue: string
};

function getInitialState() {
  if (Platform.OS !== 'web') {
    return {
      time: '',
      distance: '',
      splitValue: ''
    };
  }

  const query = qs.parse(window.location.search.slice(1) || '');
  return {
    time: query.time || '',
    distance: query.distance || '',
    splitValue: query.splitValue || ''
  };
}

const update = (action: Object) => state => {
  switch (action.type) {
    case 'PRESET_SELECTED': {
      const key = action.preset;
      const preset = PRESETS.presets.find(preset => preset.id === key);

      const splitValue = preset.halfSplit || `${parseSeconds(preset.time) / 2}`;

      return {
        ...state,
        time: preset.time,
        distance: preset.distance,
        splitValue
      };
    }

    case 'DISTANCE_CHANGED':
      return {
        ...state,
        distance: action.value,
        splitValue: `${parseSeconds(state.time) / 2}`
      };

    case 'TIME_CHANGED':
      return {
        ...state,
        time: action.value,
        splitValue: `${parseSeconds(action.value) / 2}`
      };

    case 'SPLIT_CHANGED':
      return {
        ...state,
        splitValue: action.value
      };

    default:
      return state;
  }
};

class PaceCalculator extends PureComponent<Props, State> {
  state = getInitialState();

  handlePresetSelect = (key: string) => {
    this.setState(
      update({
        type: 'PRESET_SELECTED',
        preset: key
      })
    );
  };

  handleInput = (type: string) => (e: SyntheticInputEvent<*>) => {
    this.setState(
      update({
        type,
        value: e.target.value
      })
    );
  };

  handleSplitChange = (e: any) => {
    this.setState(
      update({
        type: 'SPLIT_CHANGED',
        value: e.target.value
      })
    );
  };

  updateQueryParams = debounce(() => {
    global.history.pushState(
      null,
      null,
      `?time=${this.state.time}&distance=${this.state.distance}&splitValue=${
        this.state.splitValue
      }`
    );
  }, 300);

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (
      Platform.OS === 'web' &&
      (this.state.time !== prevState.time ||
        this.state.distance !== prevState.distance ||
        this.state.splitValue !== prevState.splitValue)
    ) {
      this.updateQueryParams();
    }
  }

  render() {
    const meters = parseMeters(this.state.distance);
    const seconds = parseSeconds(this.state.time);
    const splitValue = parseSeconds(this.state.splitValue);

    return (
      <View>
        <View style={{ marginBottom: 30 }}>
          <View style={{ paddingVertical: 10 }}>
            <Text style={[styles.text, styles.textBold]}>Enter a goal</Text>
          </View>
          <Card>
            <View
              style={{ marginBottom: 15 }}
              accessible
              accessibilityLabel="Distance"
            >
              <Label>{'Distance 👟'}</Label>
              <TextInput
                style={[styles.textInput]}
                autoCapitalize="none"
                autoFocus
                type="text"
                name="distance"
                placeholder="a marathon or 1500 m"
                value={this.state.distance}
                onChange={this.handleInput('DISTANCE_CHANGED')}
              />
            </View>
            <View accessible accessibilityLabel="Time">
              <Label>{'Time ⏱'}</Label>
              <TextInput
                autoCapitalize="none"
                style={[styles.textInput]}
                type="text"
                name="time"
                placeholder="3:26.00 or 3 hours"
                value={this.state.time}
                onChange={this.handleInput('TIME_CHANGED')}
              />
            </View>

            <View style={{ paddingTop: 40 }}>
              <Label numberOfLines={1}>
                Or you can select from our presets
              </Label>
            </View>
            <Picker
              onValueChange={this.handlePresetSelect}
              style={styles.picker}
            >
              <Picker.Item label="Select a preset" value="" />
              {PRESETS.presets.map(preset => {
                const description = `${preset.event} ${preset.name}`;
                return (
                  <Picker.Item
                    key={preset.id}
                    label={description}
                    value={preset.id}
                  />
                );
              })}
            </Picker>
          </Card>
        </View>

        <View style={{ marginBottom: 30 }}>
          <View style={{ paddingVertical: 10 }}>
            <Text style={[styles.text, styles.textBold]}>Splits</Text>
          </View>

          <Card>
            <View
              style={[
                (!meters || !seconds) && { filter: 'blur(6px)', opacity: 0.5 }
              ]}
            >
              <SplitCalculator
                meters={meters}
                seconds={seconds}
                value={splitValue}
                onChange={this.handleSplitChange}
              />
            </View>
          </Card>
        </View>

        <View style={{ paddingVertical: 10 }}>
          <Text style={[styles.text, styles.textBold]}>Timing data</Text>
        </View>

        {this.props.render({
          meters,
          seconds
        })}
      </View>
    );
  }
}
export default PaceCalculator;
