import * as React from 'react';

import PaceCalculator from './PaceCalculator';

function App() {
  return (
    <div>
      <header>
        <h1>Snittfart</h1>
      </header>

      <main>
        <PaceCalculator />
      </main>

      <footer>
        Feedback can be sent to{' '}
        <a href="mailto:feedback@koren.im">feedback@koren.im</a> or to{' '}
        <a href="https://twitter.com/Hanse">@Hanse</a> on Twitter
      </footer>
    </div>
  );
}

export default App;
