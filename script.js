const previousOperandText = document.getElementById("previous-operand");
const currentOperandText = document.getElementById("current-operand");
const errorSound = new Audio(src="sounds/ErrorSound.mp3");

let currentOperand = "";
let previousOperand = "";
let operator = "";

function updateDisplay() {
  currentOperandText.textContent = currentOperand || "_";
  previousOperandText.textContent = previousOperand;
}
function resetDisplay(){
  currentOperandText.textContent = currentOperand || "0";
}
function clearAll() {
  currentOperand = "";
  previousOperand = "";
  operator = "";
  resetDisplay();
}

function appendNumber(number) {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand += number;
  updateDisplay();
}

function chooseOperation(selectedOperator) {
  if (currentOperand === "") return;
  if (previousOperand !== "") calculate();
  operator = selectedOperator;
  previousOperand = currentOperand + ` ${operator}`;
  currentOperand = "";
  updateDisplay();
}

function calculate() {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(curr)) return;

  switch (operator) {
    case "+":
      currentOperand = (prev + curr).toString();
      break;
    case "-":
      currentOperand = (prev - curr).toString();
      break;
    case "x":
      currentOperand = (prev * curr).toString();
      break;
    case "÷":
      if (curr === 0) { 
        currentOperand = "Math error";
        errorSound.play(); 
      } else {
          currentOperand = (prev / curr).toString();
      }
      break;
    case "%":
      currentOperand = (prev % curr).toString();
      break;
    default:
      return;
  }
  operator = "";
  previousOperand = "";
  updateDisplay();
}

function toggleSign() {
  if (currentOperand === "") return;
  currentOperand = (parseFloat(currentOperand) * -1).toString();
  updateDisplay();
}

document.querySelector(".button-container").addEventListener("click", (event) => {
  const target = event.target;
  if (target.matches("[data-number]")) {
    appendNumber(target.dataset.number);
  } else if (target.matches("[data-action='clear']")) {
    clearAll();
  } else if (target.matches("[data-action='toggle-sign']")) {
    toggleSign();
  } else if (target.matches("[data-action='equals']")) {
    calculate();
  } else if (target.matches(".operator")) {
    chooseOperation(target.textContent.trim());
  }
});

updateDisplay();
