// @flow

import React, { PureComponent, type Node } from 'react';
import timestring from './timestring';

const keyMap = array =>
  array.reduce((map, item) => {
    map[item.join('|')] = item;
    return map;
  }, {});

const PRESETS = keyMap([
  // Men
  ['marathon', '2:00:25', 'Mens Marathon Breaking2 Eliud Kipchoge'],
  ['marathon', '2:02:57', 'Mens WR Marathon Dennis Kipruto Kimetto'],
  ['half-marathon', '58:23', 'Mens WR Half marathon Zersenay Tadese'],
  ['10000', '26:17.53', 'Mens WR 10,000 m Kenenisa Bekele'],
  ['5000', '12:37.35', 'Mens WR 5000 m Kenenisa Bekele'],
  ['3000', '7:53.63', 'Mens WR 3000 m steeplechase Saif Saaeed Shaheen'],
  ['3000', '7:20.67', 'Mens WR 3000 m Daniel Komen'],
  ['mile', '3:43.13', 'Mens WR Mile Hicham El Guerrouj'],
  ['1500', '3:26.00', 'Mens WR 1500 m Hicham El Guerrouj'],
  ['800', '1:40.91', 'Mens WR 800 m David Rudisha'],
  ['400', '46.78', 'Mens WR 400 m hurdles Kevin Young'],
  ['400', '43.03', 'Mens WR 400 m Wayde van Niekerk'],
  ['200', '19.19', 'Mens WR 200 m Usain Bolt'],
  ['110', '12.80', 'Mens WR 110 m hurdles Aries Meritt'],
  ['100', '9.58', 'Mens WR 100 m Usain Bolt'],
  // Women
  ['marathon', '2:15:25', 'Womens WR Marathon Paula Radcliffe (Mx)'],
  [
    'half-marathon',
    '1:04:51',
    'Womens WR Half marathon Joyciline Jepkosgei (Mx)'
  ],
  ['10000', '29:17.45', 'Womens WR 10,000 m Almaz Ayana'],
  ['5000', '14:11.15', 'Womens WR 5000 m Tirunesh Dibaba'],
  ['3000', '8:52.78', 'Womens WR 3000 m steeplechase Ruth Jebet'],
  ['3000', '8:06.11', 'Womens WR 3000 m Wang Junxia'],
  ['mile', '4:12.56', 'Womens WR Mile Svetlana Masterkova'],
  ['1500', '3:50.07', 'Womens WR 1500 m Genzebe Dibaba'],
  ['800', '1:53.28', 'Womens WR 800 m Jarmila Kratochvílová'],
  ['400', '42.34', 'Womens WR 400 m hurdles Yuliya Pechonkina'],
  ['400', '47.60', 'Womens WR 400 m Marita Koch'],
  ['200', '21.34', 'Womens WR 200 m Florence Griffith Joyner'],
  ['100', '12.20', 'Womens WR 100 m hurdles Kendra Harrison'],
  ['100', '10.49', 'Womens WR 100 m Florence Griffith Joyner']
]);

const hundreds = value => {
  if (!value) {
    return 0;
  }

  const number = value.slice(1);

  const digits = number.toString().length;
  return parseInt(number, 10) / 10 ** digits;
};

const TIMES = [
  [/^(\d+)(\.\d{1,3})?$/, match => parseInt(match[1], 10) + hundreds(match[2])],
  [
    /^(\d{1,2}):(\d{1,2})(\.\d{1,3})?$/,
    match => {
      return (
        60 * parseInt(match[1], 10) +
        parseInt(match[2], 10) +
        hundreds(match[3])
      );
    }
  ],
  [
    /^(\d{1,2}):(\d{1,2}):(\d{1,2})(\.\d{1,3})?$/,
    match => {
      return (
        60 * 60 * parseInt(match[1], 10) +
        60 * parseInt(match[2], 10) +
        parseInt(match[3], 10) +
        hundreds(match[4])
      );
    }
  ],
  [
    /.*/,
    match => {
      try {
        return timestring(match[0].replace(/,/g, '.'));
      } catch (error) {
        return 0;
      }
    }
  ]
];

const DISTANCES = [
  [/half[-\s]?marath?on/, 21098],
  [/marath?on/, 42195],
  [/10\s?km?/, 10000],
  [/5\s?km?/, 5000],
  [/[a|1]?\s?miles?/, 1609]
];

const parseInput = (rules, defaultEvaluator: string => number) => value => {
  for (const [regex, parsedValue] of rules) {
    const match = value.match(regex);
    if (match) {
      if (typeof parsedValue === 'function') {
        return parsedValue(match);
      }
      return parsedValue;
    }
  }

  return defaultEvaluator(value);
};

const parseSeconds = parseInput(TIMES, () => 0);
const parseMeters = parseInput(DISTANCES, value => parseFloat(value) || 0);

type Props = {
  render: ({ meters: number, seconds: number }) => Node
};

type State = {
  time: string,
  distance: string
};

class PaceCalculator extends PureComponent<Props, State> {
  state = {
    time: '',
    distance: ''
  };

  handlePresetSelect = (e: SyntheticInputEvent<*>) => {
    const key = e.target.value;
    if (!key) {
      return;
    }

    const [distance, time] = PRESETS[key];
    this.setState({ time, distance });
  };

  handleInput = (e: SyntheticInputEvent<*>) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <form onSubmit={e => e.preventDefault()}>
          <div style={{ fontSize: 26 }}>
            I want to run
            <input
              autoFocus
              type="text"
              name="distance"
              placeholder="a marathon or 1500 m"
              value={this.state.distance}
              onChange={this.handleInput}
            />👟 in
            <input
              type="text"
              name="time"
              placeholder="3:26.00 or 3 hours"
              value={this.state.time}
              onChange={this.handleInput}
            />
            ⏱
          </div>

          <hr />
          <label>
            Analyze a preset instead
            <select onChange={this.handlePresetSelect}>
              <option value="">Choose a preset</option>
              {Object.keys(PRESETS).map(key => {
                const [, , description] = PRESETS[key];
                return (
                  <option key={key} value={key}>
                    {description}
                  </option>
                );
              })}
            </select>
          </label>
        </form>
        {this.props.render({
          meters: parseMeters(this.state.distance),
          seconds: parseSeconds(this.state.time)
        })}
      </div>
    );
  }
}

export default PaceCalculator;
