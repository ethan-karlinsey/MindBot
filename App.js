import React from 'react';
import { LogBox } from 'react-native';
import Providers from './app/navigation';

LogBox.ignoreLogs(['Setting a timer'])

export default function App() {
  return <Providers /> // call providers for routing
}
