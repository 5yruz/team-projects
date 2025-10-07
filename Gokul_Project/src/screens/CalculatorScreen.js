import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Display from '../components/Display';
import Button from '../components/Button';
import { calculate } from '../utils/calculatorLogic';

const CalculatorScreen = () => {
  const [value, setValue] = useState('0');

  const handlePress = (button) => {
    setValue((prev) => calculate(prev, button));
  };

  const buttons = [
    ['C', '/', '*', '-'],
    ['7', '8', '9', '+'],
    ['4', '5', '6', '='],
    ['1', '2', '3', '.'],
    ['0'],
  ];

  return (
    <View style={styles.container}>
      <Display value={value} />
      {buttons.map((row, rowIndex) => (
        <View style={styles.row} key={rowIndex}>
          {row.map((button) => (
            <Button key={button} title={button} onPress={() => handlePress(button)} />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default CalculatorScreen;
