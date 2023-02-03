/**
 * @format
 */

import App from './src/App';
import {AppRegistry} from 'react-native';

import {name as appName} from './app.json';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import MainLayout from './src/components/MainLayout';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    error: 'red',
    primary: 'purple',
    secondary: 'red',
  },
};

const Main = () => (
  <PaperProvider theme={theme}>
    <App />
  </PaperProvider>
);

AppRegistry.registerComponent(appName, () => Main);
