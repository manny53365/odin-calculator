//global vars section
let firstNum, secondNum, operator = '';

// math operations

const add = (a,b) => {
    return a + b;
}

const subtract = (a,b) => {
    return a - b; 
}

const multiply = (a,b) => {
    return a * b;
}

const divide = (a,b) => {
    return a / b;
}

const operate = (firstNum, operator, secondNum) => {
    let num1 = Number(firstNum);
    let num2 = Number(secondNum);

    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1,num2);
        case "x" || "*":
            return multiply(num1, num2);
        case "/" || '÷':
            return divide(num1, num2);
        default:
            return null;
    }
}