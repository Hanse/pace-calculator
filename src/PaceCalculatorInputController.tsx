import debounce from 'debounce';
import qs from 'qs';
import React, { PureComponent } from 'react';

import Card from './Card';
import PRESETS from './data.json';
import { parseMeters, parseSeconds } from './parsers';
import SplitCalculator from './SplitCalculator';
import styles from './styles';

const Label: React.FunctionComponent<any> = ({ children, ...props }) => (
  <span style={{ color: '#555' }} {...props}>
    {children}
  </span>
);

type Props = {
  render: (props: { meters: number; seconds: number }) => React.ReactNode;
};

type State = {
  time: string;
  distance: string;
  splitValue: string;
};

function getInitialState() {
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

  handlePresetSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    this.setState(
      update({
        type: 'PRESET_SELECTED',
        preset: e.currentTarget.value,
      })
    );
  };

  handleInput = (type: string) => ({
    currentTarget: { value },
  }: React.FormEvent<HTMLInputElement>) => {
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
      this.state.time !== prevState.time ||
      this.state.distance !== prevState.distance ||
      this.state.splitValue !== prevState.splitValue
    ) {
      this.updateQueryParams();
    }
  }

  render() {
    const meters = parseMeters(this.state.distance);
    const seconds = parseSeconds(this.state.time);
    const splitValue = parseSeconds(this.state.splitValue);

    return (
      <div>
        <div style={{ marginBottom: 30 }}>
          <div style={{ paddingTop: 10, paddingBottom: 10 }}>Enter a goal</div>
          <Card>
            <div style={{ padding: 20 }}>
              <div style={{ marginBottom: 15 }}>
                <Label>{'Distance 👟'}</Label>
                <input
                  style={styles.textInput}
                  autoCapitalize="none"
                  autoFocus
                  // @ts-ignore
                  type="text"
                  name="distance"
                  placeholder="e.g. a marathon or 1500 m"
                  value={this.state.distance}
                  onChange={this.handleInput('DISTANCE_CHANGED')}
                />
              </div>
              <div>
                <Label>{'Time ⏱'}</Label>
                <input
                  autoCapitalize="none"
                  style={styles.textInput}
                  type="text"
                  name="time"
                  placeholder="e.g. 3:26.00 or 3 hours"
                  value={this.state.time}
                  onChange={this.handleInput('TIME_CHANGED')}
                />
              </div>

              <div style={{ paddingTop: 40 }}>
                <Label numberOfLines={1}>
                  Or you can select from our presets
                </Label>
              </div>
              <select onChange={this.handlePresetSelect} style={styles.picker}>
                <option value="">Select a preset</option>
                {PRESETS.presets.map((preset) => {
                  const description = `${preset.event} ${preset.name}`;
                  return (
                    <option key={preset.id} value={preset.id}>
                      {description}
                    </option>
                  );
                })}
              </select>
            </div>
          </Card>
        </div>

        <div style={{ marginBottom: 30 }}>
          <div style={{ paddingTop: 10, paddingBottom: 10 }}>Splits</div>

          <Card>
            <div
              style={{
                ...((!meters || !seconds) && {
                  filter: 'blur(6px)',
                  opacity: 0.5,
                }),
                ...{ padding: 20 },
              }}
            >
              <SplitCalculator
                meters={meters}
                seconds={seconds}
                value={splitValue}
                onChange={this.handleSplitChange}
              />
            </div>
          </Card>
        </div>

        <div>Timing data</div>

        {this.props.render({
          meters,
          seconds,
        })}
      </div>
    );
  }
}
export default PaceCalculator;
