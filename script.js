const buttons = document.querySelector("#buttons-container");
const primaryDisplay = document.querySelector("#display-current");
const secondaryDisplay = document.querySelector("#display-previous")


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
    if (b == 0) {
        throw new RangeError("Cannot divide by zero!");
    }
    return a / b;
}

let numberOne = "";
let operator = "";
let numberTwo = "";

function operate() {
    let result;
    switch (operator) {
        case "+":
            result = add(+numberTwo, +numberOne);
            break;
        case "-":
            result = subtract(+numberTwo, +numberOne);
            break;
        case "*":
            result = multiply(+numberTwo, +numberOne);
            break;
        case "/":
            result = divide(+numberTwo, +numberOne);
            break;
    }
    return String(result);
}

function handleClick(target) {
    if (target.dataset.value == "clear") {
        numberOne = "";
        operator = "";
        numberTwo = "";
        secondaryDisplay.textContent = "";
        primaryDisplay.textContent = "";
        return;    
    }

    if (target.dataset.value == "delete" && numberOne !== "") {
        numberOne = numberOne.slice(0, -1);
        primaryDisplay.textContent = numberOne;
        return;
    }

    if (target.classList.contains("number")) {
        numberOne += target.dataset.value;
        primaryDisplay.textContent = numberOne;
    }

    
    if (!target.classList.contains("number") && numberOne !== "" && operator !== "" && numberTwo !== ""){
        if(target.classList.contains("operator")) {
            numberTwo = operate();
            numberOne = "";
            operator = target.dataset.value;
            secondaryDisplay.textContent = `${numberTwo} ${operator}`;
            primaryDisplay.textContent = "";
        } else if(target.dataset.value == "operate") {
            numberOne = operate();
            numberTwo = "";
            operator = ""
            secondaryDisplay.textContent = "";
            primaryDisplay.textContent = numberOne;
        }
    }

    if(numberOne !== "" && target.classList.contains("operator")) {
        numberTwo = numberOne;
        numberOne = "";
        operator = target.dataset.value;
        secondaryDisplay.textContent = `${numberTwo} ${operator}`;
        primaryDisplay.textContent = "";
    }
    console.log(target.dataset.value);
}

buttons.addEventListener("click", (e) => {
    if (!e.target.id) {
        handleClick(e.target)
    }
});