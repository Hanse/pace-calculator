// @flow

import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

const PREDEFINED_LAPS = [10000, 5000, 3000, 1500, 1000, 800, 400, 200, 100];

type ToHHMMSSMode = 'units' | 'normal' | null;
type Seconds = number;

export const toHHMMSS = (
  time: Seconds,
  mode: ToHHMMSSMode = 'units',
  digits: number = 0
) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - hours * 3600) / 60);
  const seconds = time - hours * 3600 - minutes * 60;

  const parts = [
    [hours, 'hours'],
    [minutes, 'min'],
    [seconds.toFixed(digits), 'sec']
  ];

  if (!hours) {
    parts.shift();
  }

  if (mode === 'units') {
    return parts.map(([value, unit]) => `${value} ${unit}`).join(' ');
  }

  return parts.map(([value]) => (+value < 10 ? `0${value}` : value)).join(':');
};

const toKMH = (meters, seconds) => {
  return (seconds === 0 ? 0 : (meters / seconds) * 3.6).toFixed(1) + ' km/h';
};

const withCommas = value => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

type Props = {
  meters: number,
  seconds: number
};

const Summary = ({ data }) => (
  <View style={{ backgroundColor: '#fff8d3', padding: 15 }}>
    {data.map(([key, value]) => (
      <View key={key} style={{ flexDirection: 'row' }}>
        <View style={{ width: 120 }}>
          <Text style={{ fontWeight: 700 }}>{key}</Text>
        </View>
        <Text>{value}</Text>
      </View>
    ))}
  </View>
);

const Badge = ({ backgroundColor, color, children }) => (
  <View style={{ backgroundColor }}>
    <Text style={{ color }}>{children}</Text>
  </View>
);

class PaceCalculatorView extends PureComponent<Props> {
  render() {
    const { meters, seconds } = this.props;
    return (
      <View>
        <Summary
          data={[
            ['Distance', `${withCommas(meters)} m`],
            ['Time', toHHMMSS(seconds, 'normal', 2)],
            [
              'Required pace',
              `${toHHMMSS(
                (seconds * 1000) / (meters || 1),
                'normal'
              )} min/km (${toKMH(meters, seconds)})`
            ]
          ]}
        />
        <View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text>Lap</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>Time</Text>
            </View>
          </View>
          <View>
            {PREDEFINED_LAPS.map((distance, index) => {
              const scaledSeconds = (seconds * distance) / (meters || 1);
              return (
                <View
                  key={index}
                  style={[
                    {
                      flexDirection: 'row'
                    },
                    distance === 400 && {
                      backgroundColor: '#dd6137',
                      color: 'white'
                    },
                    distance === 1000 && {
                      backgroundColor: '#e2f7b2'
                    }
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text>{withCommas(distance)} m</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{ cursor: 'help' }}
                      title={`${scaledSeconds.toFixed(2)} seconds`}
                    >
                      <Text style={{ color: '#ccc' }}>~ </Text>
                      {toHHMMSS(scaledSeconds)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <Text>
          This nifty pace calculator makes you aware of how fast you need to run
          on average to achieve your time-goals. The View shows the required
          time on each lap of different lengths to finish in the desired total
          time.
          <Text style={{ fontStyle: 'italic' }}>
            It does not show estimated equivalent race performances.
          </Text>
        </Text>

        <Text>
          Use this tool to go from distance and time to pace and speed. If you
          are running on a{' '}
          <Badge backgroundColor="#dd6137" color="white">
            regular track
          </Badge>, the time in the 400 m row should match your watch ⌚️ after
          each lap to be sure you make it in time.
        </Text>
      </View>
    );
  }
}

export default PaceCalculatorView;
