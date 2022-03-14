import { StatusBar } from 'react-native';
import React from 'react';
import { NativeBaseProvider } from 'native-base'

import Routes from './src/routes';
import moment from 'moment';

moment.locale("pt-br")

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor="transparent" translucent barStyle='light-content' />
      <Routes />
    </NativeBaseProvider>
  )
}
