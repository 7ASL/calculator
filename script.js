const buttons = document.querySelector("#buttons-container");
const primaryDisplay = document.querySelector("#display-current");
const secondaryDisplay = document.querySelector("#display-previous");

const STATES = {
	WAITING_FOR_FIRST_NUMBER: "waiting_for_first_number",
	OPERATOR_CHOSEN: "operator_chosen",
	WAITING_FOR_SECOND_NUMBER: "second_operand",
};

let calculator = {
	state: STATES.WAITING_FOR_FIRST_NUMBER,
	numberOne: "",
	operator: "",
	numberTwo: "",
};

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
}

function handleClear(target) {
	calculator.numberOne = "";
	calculator.operator = "";
	calculator.numberTwo = "";
	secondaryDisplay.textContent = "";
	primaryDisplay.textContent = "";
	calculator.state = STATES.WAITING_FOR_FIRST_NUMBER;
}

function handleDelete(target) {
	if (target.dataset.value == "delete" && calculator.numberOne !== "") {
		calculator.numberOne = calculator.numberOne.slice(0, -1);
		primaryDisplay.textContent = calculator.numberOne;
		if (
			calculator.state === STATES.WAITING_FOR_SECOND_NUMBER &&
			calculator.numberOne === ""
		) {
			calculator.state = STATES.OPERATOR_CHOSEN;
		}
	}
}

function handleCalculate(target) {
	if (target.dataset.value == "operate" && calculator.numberOne !== "") {
		calculator.numberOne = operate();
		calculator.numberTwo = "";
		calculator.operator = "";
		secondaryDisplay.textContent = "";
		primaryDisplay.textContent = calculator.numberOne;
		calculator.state = STATES.WAITING_FOR_FIRST_NUMBER;
	}
}

function handleNumberInput(target) {
	if (target.classList.contains("number")) {
		calculator.numberOne += target.dataset.value;
		primaryDisplay.textContent = calculator.numberOne;
		if (calculator.state === STATES.OPERATOR_CHOSEN) {
			calculator.state = STATES.WAITING_FOR_SECOND_NUMBER;
		}
	}
}

function handleOperatorInput(target) {
	if (
		target.classList.contains("operator") &&
		(calculator.numberOne !== "" || calculator.state === STATES.OPERATOR_CHOSEN)
	) {
		if (
			calculator.state === STATES.WAITING_FOR_SECOND_NUMBER &&
			calculator.numberOne !== ""
		) {
			calculator.numberTwo = operate();
		} else if (calculator.state === STATES.WAITING_FOR_FIRST_NUMBER) {
			calculator.numberTwo = calculator.numberOne;
		}
		calculator.numberOne = "";
		calculator.operator = target.dataset.value;
		secondaryDisplay.textContent = `${calculator.numberTwo} ${calculator.operator}`;
		primaryDisplay.textContent = "";
		calculator.state = STATES.OPERATOR_CHOSEN;
	}
}

function handleClick(target) {
	if (target.dataset.value === "clear") {
		handleClear(target);
		return;
	}

	switch (calculator.state) {
		case STATES.WAITING_FOR_FIRST_NUMBER:
			handleNumberInput(target);
			handleOperatorInput(target);
			handleDelete(target);
			break;
		case STATES.OPERATOR_CHOSEN:
			handleNumberInput(target);
			handleOperatorInput(target);
			break;
		case STATES.WAITING_FOR_SECOND_NUMBER:
			handleNumberInput(target);
			handleOperatorInput(target);
			handleDelete(target);
			handleCalculate(target);
			break;
	}
	console.log(target.dataset.value);
}

buttons.addEventListener("click", (e) => {
	if (!e.target.id) {
		handleClick(e.target);
	}
});