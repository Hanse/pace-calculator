import * as React from 'react';

import Card from './Card';
import { getPace, toHHMMSS, withCommas } from './formatting';

const PREDEFINED_LAPS = [10000, 5000, 3000, 1500, 1000, 800, 400, 200, 100];

interface SummaryProps {
  data: [string, string][];
}

const Summary = ({ data }: SummaryProps) => (
  <div>
    {data.map(([key, value]) => (
      <div key={key} style={{ flexDirection: 'row' }}>
        <div style={{ width: '50%' }}>
          <span>{key}</span>
        </div>
        {value}
      </div>
    ))}
  </div>
);

interface PaceCalculatorViewProps {
  meters: number;
  seconds: number;
}

function PaceCalculatorView({ meters, seconds }: PaceCalculatorViewProps) {
  const isMissingInputs = !meters || !seconds;

  return (
    <Card>
      <div
        style={
          isMissingInputs ? { filter: 'blur(6px)', opacity: 0.5 } : undefined
        }
      >
        <Summary
          data={[
            ['Distance', `${withCommas(meters)} m`],
            ['Time', toHHMMSS(seconds, 'normal', 2)],
            ['Required pace', getPace(meters, seconds)],
          ]}
        />
        <div style={{ padding: 20 }}>
          <div>
            <strong>Lap</strong>
            <strong>Time</strong>
          </div>
          {PREDEFINED_LAPS.map((distance, index) => {
            const scaledSeconds = (seconds * distance) / (meters || 1);

            const highlight = (value: number) =>
              distance === value ? { fontWeight: 700 } : undefined;

            return (
              <div
                key={index}
                style={{
                  ...{
                    flexDirection: 'row',
                  },
                  ...(index % 2 === 0 && {
                    backgroundColor: '#f3f3f3',
                  }),
                  ...{ padding: 12 },
                }}
              >
                <div style={{ flex: 1 }}>
                  <span style={highlight(1000)}>{withCommas(distance)} m</span>
                </div>
                <div style={{ flex: 1 }}>
                  {/*@ts-ignore*/}
                  <span
                    style={highlight(1000)}
                    title={`${scaledSeconds.toFixed(2)} seconds`}
                  >
                    <span style={{ color: '#ccc' }}>~ </span>
                    {toHHMMSS(scaledSeconds)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ padding: 20 }}>
        <p>
          This nifty pace calculator shows how fast you need to run on average
          to achieve your time-goals. The table shows required lap-times to
          finish in the desired total time.{' '}
          <em>It does not show estimated equivalent race performances.</em>
        </p>

        <p>
          Use this tool to go figure out how fast you must run or see how
          incredibly fast people have managed to run various distances.{' '}
          <em>
            If you are running on a regular track, the time in the 400 m row
            should match your watch {'⌚️'} after each lap to be sure you make
            it in time.
          </em>
        </p>
      </div>
    </Card>
  );
}

export default PaceCalculatorView;
