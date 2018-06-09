// @flow

import React, { PureComponent } from 'react';
import cx from 'classnames';

const PREDEFINED_LAPS = [10000, 5000, 3000, 1500, 1000, 800, 400, 200, 100];

type ToHHMMSSMode = 'units' | 'normal' | null;

const toHHMMSS = (value, mode: ToHHMMSSMode = 'units') => {
  const hours = (value / 3600) | 0;
  const minutes = (value / 60 - hours * 60) | 0;
  const seconds = Math.ceil(value - minutes * 60 - hours * 3600);

  const parts = [[hours, 'hours'], [minutes, 'min'], [seconds, 'sec']];

  if (!hours) {
    parts.shift();
  }

  if (mode === 'units') {
    return parts.map(([value, unit]) => `${value} ${unit}`).join(' ');
  }

  return parts.map(([value]) => (value < 10 ? `0${value}` : value)).join(':');
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

class PaceCalculatorView extends PureComponent<Props> {
  render() {
    const { meters, seconds } = this.props;
    return (
      <div>
        <ul className="summary">
          <li>
            <strong>Distance</strong> <span>{withCommas(meters)}</span> m
          </li>
          <li>
            <strong>Time</strong> <span style={{ color: '#999' }}>~</span>
            <span>{toHHMMSS(seconds)}</span>
          </li>
          <li>
            <strong>Required pace</strong>{' '}
            <span>
              {toHHMMSS((seconds * 1000) / (meters || 1), null)} min/km{' '}
            </span>
            <span>({toKMH(meters, seconds)})</span>
          </li>
        </ul>
        <table>
          <thead>
            <tr>
              <th>Lap</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {PREDEFINED_LAPS.map((distance, index) => {
              const scaledSeconds = (seconds * distance) / (meters || 1);
              return (
                <tr
                  key={index}
                  className={cx({
                    track: distance === 400,
                    pace: distance === 1000
                  })}
                >
                  <td style={{ width: '50%' }}>{withCommas(distance)} m</td>
                  <td>
                    <span
                      style={{ cursor: 'help' }}
                      title={`${scaledSeconds.toFixed(2)} seconds`}
                    >
                      {toHHMMSS(scaledSeconds)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <p>
          This nifty pace calculator makes you aware of how fast you need to run
          on average to achieve your time-goals. The table shows the required
          time on each lap of different lengths to finish in the desired total
          time.{' '}
          <em>It does not show estimated equivalent race performances.</em>
        </p>

        <p>
          Use this tool to go from distance and time to pace and speed. If you
          are running on a <span className="badge track">regular track</span>,
          the time in the 400 m row should match your watch ⌚️ after each lap
          to be sure you make it in time.
        </p>
      </div>
    );
  }
}

export default PaceCalculatorView;
