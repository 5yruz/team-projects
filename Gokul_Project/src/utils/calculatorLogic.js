export const calculate = (currentValue, buttonPressed) => {
  if (buttonPressed === 'C') return '0';

  if (buttonPressed === '=') {
    try {
      return eval(currentValue).toString();
    } catch (e) {
      return 'Error';
    }
  }

  if (currentValue === '0') return buttonPressed;
  return currentValue + buttonPressed;
};
