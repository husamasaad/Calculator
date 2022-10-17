let runningTotal = 0;

let buffer = "0";

let previousOperator = null;

const screen = document.querySelector(".screen");

function buttonClick(value) {
    if (isNaN(value)){
        // this is not a number
        handleSymbol(value)
    } else {
        // this is a number
        handleNumber(value)
    }

    // this is just a secret message to a friend...
    if (buffer == '40440') {  
        screen.innerText = "مرحبًا آنسة فيء أحمد، نتمنى لك تمام الشفاء والعافية والسعادة، إن قدرك عندنا لو تعلمين لعظيم، ونرجو ألا يمسك سوء أو مكروه أبدًا أبدًا، وكذلك نرجو منك العفو لما بدر منّا من تقصير أو غلظة في الحديث، أسعدك الله وحفظك ورعاك...";
    } else {
        screen.innerText = buffer  // here is the actual code
    }
}

function handleSymbol(symbol){
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        
        case '=':
            if (previousOperator === null) {
                return
            }

            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0'
            } else {
                buffer = buffer.substring(0, buffer.length - 1)
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;

    buffer = '0'
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer
    }
}

function handleNumber(numberString){
    if (buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init () {
    document.querySelector(".calc-buttons")
    .addEventListener('click', function(event) {
        buttonClick(event.target.innerText);
    })
}


init();