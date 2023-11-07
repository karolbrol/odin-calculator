
let operand1;
let operand2;
let operator;

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

}

function insertDigit(digit) {

}

function insertOperator(operator) {

}

function evaluate(operand1, operand2, operator) {
    
}

function addDot() {

}