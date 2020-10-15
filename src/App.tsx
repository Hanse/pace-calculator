import * as React from 'react';

import PaceCalculatorInputController from './PaceCalculatorInputController';
import PaceCalculatorView from './PaceCalculatorView';
import { TARTAN as theme } from './theme';

const PADDING = 24;

const HEADER_HEIGHT = 60;

const ExternalLink: React.FunctionComponent<{ style?: any; href: string }> = ({
  style,
  ...props
}) => <a style={{ color: '#999', ...style }} {...props} />;

class App extends React.PureComponent<{}> {
  render() {
    return (
      <div style={{ flex: 1 }}>
        <div style={styles.scrollView}>
          <div style={styles.container}>
            <div style={{ padding: PADDING, paddingBottom: 0 }}>
              <PaceCalculatorInputController
                render={({ meters, seconds }) => (
                  <PaceCalculatorView {...{ meters, seconds }} />
                )}
              />
            </div>

            <div style={{ padding: '20px 40px' }}>
              Feedback can be sent to{' '}
              <ExternalLink href="mailto:feedback@koren.im">
                feedback@koren.im
              </ExternalLink>{' '}
              or to{' '}
              <ExternalLink href="https://twitter.com/Hanse">
                @Hanse
              </ExternalLink>{' '}
              on Twitter
            </div>
          </div>
        </div>
        <div style={styles.header}>
          <div style={styles.container}>
            <span style={styles.headerText}>Snittfart</span>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  header: {
    backgroundColor: theme.backgroundColor,
    paddingLeft: PADDING,
    paddingRight: PADDING,
    paddingTop: PADDING / 2,
    paddingBottom: PADDING / 2,
    display: 'flex',
    position: 'absolute' as const,
    right: 0,
    left: 0,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: HEADER_HEIGHT,
  },
  container: {
    maxWidth: 700,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 700,
    color: theme.color,
  },
};

export default App;
