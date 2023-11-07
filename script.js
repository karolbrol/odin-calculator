
let operand1 = null;
let operand2 = null;
let operator = null;
let result = null;

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
            evaluate(operand1, operand2, operator);
            break;
        case (button === '.'):
            addDot();
            break;
        
    }
}

function clearCalculator() {
    [operand1, operand2, operator, result] = [null, null, null, null];
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

function evaluate(operand1, operand2, operator) {
    if (operand2 === null) {
        result = operand1;
        updateDisplay();
        return;
    }
    switch (operator) {
        case '+' :
            result = +operand1 + +operand2;
            break;
        case '-' :
            result = +operand1 - +operand2;
            break;
        case '*' :
            result = +operand1 * +operand2;
            break;
        case '/' :
            result = +operand1 / +operand2;
            break;
    }
    updateDisplay();
}

function addDot() {

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