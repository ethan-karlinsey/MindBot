import React from 'react';
import { LogBox, Platform } from 'react-native';
import Providers from './app/navigation';

if (Platform.OS !== 'web') {
  LogBox.ignoreLogs(['Setting a timer'])
}

export default function App() {
  return <Providers />
}
