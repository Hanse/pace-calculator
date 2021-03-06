import * as React from 'react';

import { Header } from './Header';
import PaceCalculator from './PaceCalculator';

function App() {
  return (
    <>
      <Header title="Snittfart" />
      <div className="content-container">
        <div className="content-view">
          <main>
            <PaceCalculator />
          </main>

          <footer>
            Feedback and requests can be sent to{' '}
            <a href="mailto:post@snittfart.no">post@snittfart.no</a> or to{' '}
            <a href="https://twitter.com/hanse">@hanse</a> on Twitter
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
