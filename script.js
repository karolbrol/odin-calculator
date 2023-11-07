
let operand1 = null;
let operand2 = null;
let operator = null;
let result = null;

const display = document.querySelector('#display');

const keyboard = document.querySelector('#keyboard');
keyboard.addEventListener('click', event => {
    if (event.target.value === '') return;
    const button = event.target.value;
    console.log(button);

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
});

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