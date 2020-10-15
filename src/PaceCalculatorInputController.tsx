import qs from 'qs';
import * as React from 'react';

import Card from './Card';
import PRESETS from './data.json';
import { parseMeters, parseSeconds } from './parsers';
import SplitCalculator from './SplitCalculator';

interface Props {
  render: (props: { meters: number; seconds: number }) => React.ReactNode;
}

interface State {
  time: string;
  distance: string;
  splitValue: string;
}

function getInitialState(): State {
  const query = qs.parse(window.location.search.slice(1) || '');
  return {
    time: (query.time || '') as string,
    distance: (query.distance || '') as string,
    splitValue: (query.splitValue || '') as string,
  };
}

type Action =
  | {
      type: 'PRESET_SELECTED';
      preset: string;
    }
  | {
      type: 'DISTANCE_CHANGED';
      value: string;
    }
  | {
      type: 'TIME_CHANGED';
      value: string;
    }
  | {
      type: 'SPLIT_CHANGED';
      value: string;
    };

function reducer(state: State, action: Action): State {
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
}

function PaceCalculator({ render }: Props) {
  const [state, dispatch] = React.useReducer(
    reducer,
    undefined,
    getInitialState
  );

  const { time, distance, splitValue } = state;

  React.useEffect(() => {
    (global as any).history.pushState(
      null,
      null,
      `?time=${time}&distance=${distance}&splitValue=${splitValue}`
    );
  }, [time, distance, splitValue]);

  const handlePresetSelect: React.FormEventHandler<HTMLSelectElement> = (e) => {
    dispatch({
      type: 'PRESET_SELECTED',
      preset: e.currentTarget.value,
    });
  };

  const handleInput = (
    type: 'SPLIT_CHANGED' | 'DISTANCE_CHANGED' | 'TIME_CHANGED'
  ) => ({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) => {
    dispatch({ type, value });
  };

  const handleSplitChange = (e: any) => {
    dispatch({
      type: 'SPLIT_CHANGED',
      value: e.target.value,
    });
  };

  const meters = parseMeters(distance);
  const seconds = parseSeconds(time);
  const splitValueP = parseSeconds(splitValue);

  return (
    <div>
      <section>
        <h2>Enter a goal</h2>
        <Card>
          <div>
            <label htmlFor="distance">{'Distance 👟'}</label>
            <input
              id="distance"
              autoCapitalize="none"
              autoFocus
              type="text"
              name="distance"
              placeholder="e.g. a marathon or 1500 m"
              value={distance}
              onChange={handleInput('DISTANCE_CHANGED')}
            />
          </div>
          <div>
            <label htmlFor="time">{'Time ⏱'}</label>
            <input
              id="time"
              autoCapitalize="none"
              type="text"
              name="time"
              placeholder="e.g. 3:26.00 or 3 hours"
              value={time}
              onChange={handleInput('TIME_CHANGED')}
            />
          </div>

          <h3>Or you can select from our presets</h3>

          <select onChange={handlePresetSelect}>
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
        </Card>
      </section>

      <section>
        <h2>Splits</h2>
        <Card>
          <div
            style={{
              ...((!meters || !seconds) && {
                filter: 'blur(6px)',
                opacity: 0.5,
              }),
            }}
          >
            <SplitCalculator
              meters={meters}
              seconds={seconds}
              value={splitValueP}
              onChange={handleSplitChange}
            />
          </div>
        </Card>
      </section>

      <h2>Timing data</h2>

      {render({
        meters,
        seconds,
      })}
    </div>
  );
}

export default PaceCalculator;
