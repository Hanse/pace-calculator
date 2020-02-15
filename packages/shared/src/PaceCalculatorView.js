// @flow

import React, { PureComponent } from 'react';
import { View, Text, Platform } from 'react-native';
import styles from './styles';
import Card from './Card';
import { toHHMMSS, getPace, withCommas } from './formatting';

const PREDEFINED_LAPS = [10000, 5000, 3000, 1500, 1000, 800, 400, 200, 100];

type Props = {
  meters: number,
  seconds: number
};

const Summary = ({ data }) => (
  <View style={styles.summary}>
    {data.map(([key, value]) => (
      <View key={key} style={{ flexDirection: 'row', paddingVertical: 5 }}>
        <View style={{ width: '50%' }}>
          <Text
            style={[
              styles.text,
              styles.textSmall,
              styles.textBold,
              { color: '#fff' }
            ]}
          >
            {key}
          </Text>
        </View>
        <Text style={[styles.text, { color: '#fff' }]}>{value}</Text>
      </View>
    ))}
  </View>
);

class PaceCalculatorView extends PureComponent<Props> {
  render() {
    const { meters, seconds } = this.props;

    const isMissingInputs = !meters || !seconds;

    return (
      <Card>
        <View
          style={[isMissingInputs && { filter: 'blur(6px)', opacity: 0.5 }]}
        >
          <Summary
            data={[
              ['Distance', `${withCommas(meters)} m`],
              ['Time', toHHMMSS(seconds, 'normal', 2)],
              ['Required pace', getPace(meters, seconds)]
            ]}
          />
          <View style={{ padding: 20 }}>
            <View style={[styles.row, { padding: 8 }]}>
              <View style={[{ flex: 1 }]}>
                <Text style={[styles.text, styles.textBold]}>Lap</Text>
              </View>
              <View style={[{ flex: 1 }]}>
                <Text style={[styles.text, styles.textBold]}>Time</Text>
              </View>
            </View>
            {PREDEFINED_LAPS.map((distance, index) => {
              const scaledSeconds = (seconds * distance) / (meters || 1);
              const highlight = value =>
                distance === value && { fontWeight: '700' };
              return (
                <View
                  key={index}
                  style={[
                    {
                      flexDirection: 'row'
                    },
                    index % 2 === 0 && {
                      backgroundColor: '#f3f3f3'
                    },
                    { padding: 12 }
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[styles.text, styles.textSmall, highlight(1000)]}
                    >
                      {withCommas(distance)} m
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.text,
                        styles.textSmall,
                        highlight(1000),
                        Platform.select({
                          web: { cursor: 'help' }
                        })
                      ]}
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

        <View style={{ padding: 20 }}>
          <Text style={[styles.paragraph, styles.text, styles.textSmall]}>
            This nifty pace calculator shows how fast you need to run on average
            to achieve your time-goals. The table shows required lap-times to
            finish in the desired total time.{' '}
            <Text style={{ fontStyle: 'italic' }}>
              It does not show estimated equivalent race performances.
            </Text>
          </Text>

          <Text style={[styles.paragraph, styles.text, styles.textSmall]}>
            Use this tool to go figure out how fast you must run or see how
            incredibly fast people have managed to run various distances.{' '}
            <Text style={{ fontStyle: 'italic' }}>
              If you are running on a regular track, the time in the 400 m row
              should match your watch {'⌚️'} after each lap to be sure you make
              it in time.
            </Text>
          </Text>
        </View>
      </Card>
    );
  }
}

export default PaceCalculatorView;
