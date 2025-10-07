import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CalculatorScreen from './src/screens/CalculatorScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CalculatorScreen />
    </SafeAreaView>
  );
};
