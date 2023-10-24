//global vars section
let firstNum, secondNum, operator = '', shouldResetScreen = false;

// mapping DOM buttons to vars
const numberButtons = document.getElementsByClassName('btn-secondary');
const operatorButtons = document.getElementsByClassName('btn-warning');
const equalButton = document.getElementById('eqlBtn');
const clearButton = document.getElementById('clearBtn');
const deleteButton = document.getElementById('deleteBtn')
const lastOperationScreen = document.getElementById('lastOperationScreen');
const currentOperationScreen = document.getElementById('currentOperationScreen');

const appendNumber = (number) => {
    if (currentOperationScreen.textContent === '0' || shouldResetScreen) resetScreen();
    currentOperationScreen.textContent += number;
}

const resetScreen = () => {
    currentOperationScreen.textContent = '';
    shouldResetScreen = false;
}

const clear = () => {
    currentOperationScreen.textContent = '0'
    lastOperationScreen.textContent = ''
    firstNum = ''
    secondNum = ''
    operator = null
}

const appendPoint = () => {
    if (shouldResetScreen) resetScreen();
    if (currentOperationScreen.textContent === '');
        currentOperationScreen.textContent = '0';
    if (currentOperationScreen.textContent.includes('.')) return;
    currentOperationScreen.textContent += '.';
}

const deleteNumber = () => currentOperationScreen.textContent = currentOperationScreen.textContent.toString().slice(0, -1);

const setOperation = (selectedOperator) => {
    if (selectedOperator !== null) calculate();
    firstNum = currentOperationScreen.textContent;
    operator = selectedOperator;
    lastOperationScreen.textContent = `${firstNum} ${operator}`;
    shouldResetScreen = true;
}

const calculate = () =>  {
    if (operator === null || shouldResetScreen) return;
    if (operator === '÷' && currentOperationScreen.textContent === '0') alert("You can't divide by 0!");
    secondNum = currentOperationScreen.textContent
    currentOperationScreen.textContent = round(
        operate(firstNum, operator, secondNum)
    );
    lastOperationScreen.textContent = `${firstNum} ${operator} ${secondNum} =`;
    operator = null;
}

const round = (number) => Math.round(number * 1000) / 1000;

const handleKeyboardInput = (event) => {
    if (event.key >= 0 && event.key <= 9) appendNumber(event.key);
    if (event.key === '.') appendPoint();
    if (event.key === '=' || event.key === 'Enter') evaluate();
    if (event.key === 'Backspace') deleteNumber();
    if (event.key === 'Escape') clear();
    if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/');
        setOperation(convertOperator(event.key));
}

const convertOperator = (keyboardOperator) => {
    if (keyboardOperator === '/') return '÷';
    if (keyboardOperator === '*') return '×';
    if (keyboardOperator === '-') return '−';
    if (keyboardOperator === '+') return '+';
}

for (const button of numberButtons) {
    button.addEventListener('click', () => appendNumber(button.textContent));
}

for (const operatorButton of operatorButtons) {
    operatorButton.addEventListener('click', () => setOperation(operatorButton.textContent));
};

clearButton.addEventListener('click', clear);
equalButton.addEventListener('click', calculate);

// math operations

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// This function will parse the parameters passed in and call the add, subtract, multiply or divide function
const operate = (firstNum, operator, secondNum) => {
    let num1 = Number(firstNum);
    let num2 = Number(secondNum);

    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "x" || "*":
            return multiply(num1, num2);
        case "/" || '÷':
            // This check will prevent a divide by 0 error
            return num2 !== 0 ? divide(num1, num2) : null
        default:
            return null;
    }
}

