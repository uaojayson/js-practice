const display = document.querySelector('.display');
const clear = document.querySelector('.clear');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const decimal = document.querySelector('.decimal');
const equal = document.querySelector('.equal');

let currentValue = '';
let previousValue = '';
let currentOperator = null;
let shouldReset = false;

function clearDisplay() {
  display.textContent = '';
  currentValue = '';
  previousValue = '';
  currentOperator = null;
}

function appendValue(value) {
  if (value === '.' && currentValue.includes('.')) return;
  currentValue += value;
  display.textContent = currentValue;
}

function selectOperator(operator) {
  if (currentValue === '') return;
  if (previousValue !== '') {
    compute();
  }
  currentOperator = operator;
  previousValue = currentValue;
  currentValue = '';
}

function compute() {
  let computation;
  const previous = parseFloat(previousValue);
  const current = parseFloat(currentValue);
  if (isNaN(previous) || isNaN(current)) return;
  switch (currentOperator) {
    case '+':
      computation = previous + current;
      break;
    case '-':
      computation = previous - current;
      break;
    case '*':
      computation = previous * current;
      break;
    case '/':
      computation = previous / current;
      break;
    default:
      return;
  }
  shouldReset = true;
  currentValue = computation;
  currentOperator = null;
  display.textContent = currentValue;
}

clear.addEventListener('click', () => {
  clearDisplay();
});

numbers.forEach(number => {
  number.addEventListener('click', () => {
    if (shouldReset) {
      clearDisplay();
      shouldReset = false;
    }
    appendValue(number.textContent);
  });
});

operators.forEach(operator => {
  operator.addEventListener('click', () => {
    selectOperator(operator.textContent);
  });
});

decimal.addEventListener('click', () => {
  if (shouldReset) {
    clearDisplay();
    shouldReset = false;
  }
  appendValue('.');
});

equal.addEventListener('click', () => {
  compute();
});