// @flow

import React, { PureComponent } from 'react';
import PaceCalculatorInputController from './PaceCalculatorInputController';
import PaceCalculatorView from './PaceCalculatorView';

class App extends PureComponent<{}> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            <span role="img" aria-label="runner">
              🏃‍♂️
            </span>How <em>fast</em> must I run?<span
              role="img"
              aria-label="runner"
            >
              🏃🏽‍♀️
            </span>
          </h1>
        </header>

        <div className="App-content">
          <PaceCalculatorInputController
            render={props => <PaceCalculatorView {...props} />}
          />
        </div>

        <footer className="App-footer">
          Made by <a href="https://koren.im">koren.im</a>
        </footer>
      </div>
    );
  }
}

export default App;
