import debounce from 'debounce';
import qs from 'qs';
import React, { PureComponent } from 'react';
import {
  Picker,
  Platform,
  Text,
  TextInput,
  TextProps,
  View,
} from 'react-native';

import Card from './Card';
import PRESETS from './data.json';
import { parseMeters, parseSeconds } from './parsers';
import SplitCalculator from './SplitCalculator';
import styles from './styles';

const Label: React.FunctionComponent<TextProps> = ({ children, ...props }) => (
  <Text style={[styles.text, styles.textSmall, { color: '#555' }]} {...props}>
    {children}
  </Text>
);

type Props = {
  render: (props: { meters: number, seconds: number }) => React.ReactNode,
};

type State = {
  time: string,
  distance: string,
  splitValue: string,
};

function getInitialState() {
  if (Platform.OS !== 'web') {
    return {
      time: '',
      distance: '',
      splitValue: '',
    };
  }

  const query = qs.parse(window.location.search.slice(1) || '');
  return {
    time: (query.time || '') as string,
    distance: (query.distance || '') as string,
    splitValue: (query.splitValue || '') as string,
  };
}

const update = (action: any) => (state: any) => {
  switch (action.type) {
    case 'PRESET_SELECTED': {
      const key = action.preset;
      const preset = PRESETS.presets.find((preset) => preset.id === key)!;

      const splitValue = preset.halfSplit || `${parseSeconds(preset.time) / 2}`;

      return {
        ...state,
        time: preset.time,
        distance: preset.distance,
        splitValue,
      };
    }

    case 'DISTANCE_CHANGED':
      return {
        ...state,
        distance: action.value,
        splitValue: `${parseSeconds(state.time) / 2}`,
      };

    case 'TIME_CHANGED':
      return {
        ...state,
        time: action.value,
        splitValue: `${parseSeconds(action.value) / 2}`,
      };

    case 'SPLIT_CHANGED':
      return {
        ...state,
        splitValue: action.value,
      };

    default:
      return state;
  }
};

class PaceCalculator extends PureComponent<Props, State> {
  state: State = getInitialState();

  handlePresetSelect = (key: string) => {
    this.setState(
      update({
        type: 'PRESET_SELECTED',
        preset: key,
      })
    );
  };

  handleInput = (type: string) => (value: string) => {
    this.setState(update({ type, value }));
  };

  handleSplitChange = (e: any) => {
    this.setState(
      update({
        type: 'SPLIT_CHANGED',
        value: e.target.value,
      })
    );
  };

  updateQueryParams = debounce(() => {
    (global as any).history.pushState(
      null,
      null,
      `?time=${this.state.time}&distance=${this.state.distance}&splitValue=${this.state.splitValue}`
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
            <Text style={[styles.text, styles.textBold, styles.textLarge]}>
              Enter a goal
            </Text>
          </View>
          <Card>
            <View style={{ padding: 20 }}>
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
                  // @ts-ignore
                  type="text"
                  name="distance"
                  placeholder="e.g. a marathon or 1500 m"
                  value={this.state.distance}
                  onChangeText={this.handleInput('DISTANCE_CHANGED')}
                />
              </View>
              <View accessible accessibilityLabel="Time">
                <Label>{'Time ⏱'}</Label>
                <TextInput
                  autoCapitalize="none"
                  style={[styles.textInput]}
                  // @ts-ignore
                  type="text"
                  name="time"
                  placeholder="e.g. 3:26.00 or 3 hours"
                  value={this.state.time}
                  onChangeText={this.handleInput('TIME_CHANGED')}
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
                {PRESETS.presets.map((preset) => {
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
            </View>
          </Card>
        </View>

        <View style={{ marginBottom: 30 }}>
          <View style={{ paddingVertical: 10 }}>
            <Text style={[styles.text, styles.textBold, styles.textLarge]}>
              Splits
            </Text>
          </View>

          <Card>
            <View
              style={[
                // @ts-ignore
                (!meters || !seconds) && { filter: 'blur(6px)', opacity: 0.5 },
                { padding: 20 },
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
          <Text style={[styles.text, styles.textBold, styles.textLarge]}>
            Timing data
          </Text>
        </View>

        {this.props.render({
          meters,
          seconds,
        })}
      </View>
    );
  }
}
export default PaceCalculator;
