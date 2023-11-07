
let operand1 = null;
let operand2 = null;
let operator = null;
let result = null;
let isError = false;

const display = document.querySelector('#display');

// Mouse click
const keyboard = document.querySelector('#keyboard');
keyboard.addEventListener('click', event => {
    const button = event.target.value;
    if (button === '') return;
    handleClick (button);
});

// Keyboard click
window.addEventListener('keypress', event => {
    let button = event.key;
    //check if valid key
    if (button === 'Enter') button ='=';
    const isDigit = Number.isInteger(+button);
    const isOtherValid = ['+','-', '*', '/', '=', 'AC', '.'].includes(button)
    if (isDigit || isOtherValid) {
        handleClick(button);
    };
})

function handleClick(button) {
    if (isError) {
        clearCalculator();  //if was error
    }

    switch (true) {
        case (button === 'AC'):
            clearCalculator();
            break;
        case (Number.isInteger(+button)):
            insertDigit(button);
            break;
        case (['+', '-', '*', '/'].includes(button)):
            insertOperator(button);
            break;
        case (button === '='):
            operate(operand1, operand2, operator);
            break;
        case (button === '.'):
            addDot();
            break;
        
    }
}

function clearCalculator() {
    [operand1, operand2, operator, result] = [null, null, null, null];
    resetError();
    updateDisplay();
}

function insertDigit(digit) {
    if (result !== null) {
        clearCalculator();  //if inserted after evaluated
    }
    if (operator === null){
        
        operand1 = (operand1 === null) ? digit : operand1+digit;
    }
    else {
        operand2 = (operand2 === null) ? digit : operand2+digit;
    }
    updateDisplay();
}

function insertOperator(newOperator) {
    if (result !== null) {  // after evaluated
        operand1 = result;
        operand2 = null;
        result = null;
    }
    if (operand1 === null) return;

    operator = newOperator;
    updateDisplay();
}

function operate(operand1, operand2, operator) {
    if (operand2 === null) {
        result = +operand1;
        updateDisplay();
        return;
    }
    [operand1, operand2] = [+operand1, +operand2];
    switch (operator) {
        case '+' :
            result = add(operand1, operand2);
            break;
        case '-' :
            result = subtract(operand1, operand2);
            break;
        case '*' :
            result = multiply(operand1, operand2);
            break;
        case '/' :
            result = divide(operand1, operand2);
            break;
    }

    
    if (!isError && !Number.isInteger(result)) {
        result = roundDecimals(result, 6); //Round floats to 6 places after dot
    };
    updateDisplay();
}
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (b === 0) {
        setError()
        return "ERROR"
    }
    return a / b;
}

function addDot() {
    switch (true) {
        case (operand1 === null) :
            operand1 = '0.';
            break;
        case (operator === null && !operand1.includes('.')) :
            operand1 += '.';
            break;
        case (operator !== null && operand2 === null) :
            operand2 = '0.';
            break;
        case (!operand2.includes('.')) :
            operand2 += '.';
    }
    updateDisplay();
    return;
}

function updateDisplay() {
    if (result !== null) {
        display.textContent = result;
    }
    else {
        display.textContent = 
            ((operand1 !== null) ? operand1 : '') + ' ' +
            ((operator !== null) ? operator : '') + ' ' +
            ((operand2 !== null) ? operand2 : '');
    }
}

function setError() {
    if (!display.classList.contains('error')){
        display.classList.add('error');
    }
    isError = true;
}
function resetError() {
    if (display.classList.contains('error')){
        display.classList.remove('error');
    }
    isError = false;
}

function roundDecimals(number, places) {
    return Math.round(number * 10**places)/10**places;
};