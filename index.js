/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// console.log = function () {};
// console.error = function () {};
// console.warn = function () {};
// console.info = function () {};

AppRegistry.registerComponent(appName, () => App);
