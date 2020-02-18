// @flow

import { AppRegistry } from 'react-native-web';
import App from '@snittfart/shared/src/App';

AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root')
});
