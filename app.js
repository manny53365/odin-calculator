//global vars section
let firstNum, secondNum, operator = '';

// mapping DOM buttons to vars
const numberButtons = document.getElementsByClassName('btn-secondary');
const operatorButtons = document.getElementsByClassName('btn-warning');
const clearButton = document.getElementById('clearBtn');
const lastOperationScreen = document.getElementById('lastOperationScreen')
const currentOperationScreen = document.getElementById('currentOperationScreen')

function updateDisplay(event) {
    const buttonValue = event.target.textContent;

    const display = document.getElementById('currentOperationScreen');

    display.textContent === '0' ? display.textContent = buttonValue : display.textContent += buttonValue;
};

const convertOperator = (selectedOperator) => {
    if (selectedOperator !== null && selectedOperator !== "") calculate();
    firstNum = currentOperationScreen.textContent;
    operator = selectedOperator;
    lastOperationScreen.textContent = `${firstNum} ${operator}`;
    currentOperationScreen.textContent = 0;
}

const calculate = () => {
    if (operator === null) return
    if (operator === '÷' && currentOperationScreen.textContent === '0') alert("You can't divide by 0!");
    secondNum = currentOperationScreen.textContent
    currentOperationScreen.textContent = round(
        operate(operator, firstNum, secondNum)
    )
    lastOperationScreen.textContent = `${firstNum} ${operator} ${secondNum} =`
    operator = null
}

const round = (total) => Math.round(total * 1000) / 1000;

function clear() {
    currentOperationScreen.textContent = '0';
    lastOperationScreen.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
}

for (const button of numberButtons) {
    button.addEventListener('click', updateDisplay);
}

for (const operatorButton of operatorButtons) {
    operatorButton.addEventListener('click', () => convertOperator(operatorButton.textContent));
};

clearButton.addEventListener('click', clear)

// math operations

const add = (a, b) => {
    return a + b;
}

const subtract = (a, b) => {
    return a - b;
}

const multiply = (a, b) => {
    return a * b;
}

const divide = (a, b) => {
    return a / b;
}

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