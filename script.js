const buttons = document.querySelector("#buttons-container");
const primaryDisplay = document.querySelector("#display-current");
const secondaryDisplay = document.querySelector("#display-previous");

const STATES = {
    IDLE: "idle",
    FIRST_OPERAND: "first_operand",
    OPERATOR_CHOSEN: "operator_chosen",
    SECOND_OPERAND: "second_operand",
};

let calculator = {
    state: STATES.IDLE,
    numberOne: "",
    operator: "",
    numberTwo: "",
};

function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    if (b == 0) {
        throw new RangeError("Cannot divide by zero!");
    }
    return a / b;
};

function operate() {
    let result;
    switch (calculator.operator) {
        case "+":
            result = add(+calculator.numberTwo, +calculator.numberOne);
            break;
        case "-":
            result = subtract(+calculator.numberTwo, +calculator.numberOne);
            break;
        case "*":
            result = multiply(+calculator.numberTwo, +calculator.numberOne);
            break;
        case "/":
            result = divide(+calculator.numberTwo, +calculator.numberOne);
            break;
    }
    return String(result);
};

function handleClick(target) {
    if (target.dataset.value == "clear") {
        calculator.numberOne = "";
        calculator.operator = "";
        calculator.numberTwo = "";
        secondaryDisplay.textContent = "";
        primaryDisplay.textContent = "";
        return;    
    }

    if (target.dataset.value == "delete" && calculator.numberOne !== "") {
        calculator.numberOne = calculator.numberOne.slice(0, -1);
        primaryDisplay.textContent = calculator.numberOne;
        return;
    }

    if (target.classList.contains("number")) {
        calculator.numberOne += target.dataset.value;
        primaryDisplay.textContent = calculator.numberOne;
    }

    
    if (!target.classList.contains("number") && calculator.numberOne !== "" && calculator.operator !== "" && calculator.numberTwo !== ""){
        if(target.classList.contains("operator")) {
            calculator.numberTwo = operate();
            calculator.numberOne = "";
            calculator.operator = target.dataset.value;
            secondaryDisplay.textContent = `${calculator.numberTwo} ${calculator.operator}`;
            primaryDisplay.textContent = "";
        } else if(target.dataset.value == "operate") {
            calculator.numberOne = operate();
            calculator.numberTwo = "";
            calculator.operator = ""
            secondaryDisplay.textContent = "";
            primaryDisplay.textContent = calculator.numberOne;
        }
    }

    if(calculator.numberOne !== "" && target.classList.contains("operator")) {
        calculator.numberTwo = calculator.numberOne;
        calculator.numberOne = "";
        calculator.operator = target.dataset.value;
        secondaryDisplay.textContent = `${calculator.numberTwo} ${calculator.operator}`;
        primaryDisplay.textContent = "";
    }
    console.log(target.dataset.value);
};

buttons.addEventListener("click", (e) => {
    if (!e.target.id) {
        handleClick(e.target)
    }
});