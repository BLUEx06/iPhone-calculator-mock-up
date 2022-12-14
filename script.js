"use strict";

// prior: deal with multiplication and division first
// secondary: then deal with addition and subtraction

const operator = {
  secondary: "",
  prior: "",
  clicked: "",
};
const value = {
  secondary: 0,
  prior: 0,
  second: 0,
  temp: 0,
};

const plusOrMinusBtn = document.getElementById("plusOrMinus");
const percentKeyBtn = document.getElementById("percentKey");
const orangeButtons = document.querySelectorAll("button.orange");
const equalBtn = document.getElementById("equal");
const numbers = document.querySelectorAll("button.number");

//
// functions that change displayed content
function display(c) {
  document.getElementById("display").textContent = `${c}`;
}

function appendNumber(numberPressed) {
  const numberDisplayed = document.getElementById("display").textContent;
  // check for decimal point
  if (numberPressed === "." && numberDisplayed.includes(".")) {
    return;
  } else if (numberPressed === "." && !numberDisplayed.includes(".")) {
    display(numberDisplayed + ".");
    return;
  }
  // check for negative zero (if press plus or minus first)
  if (numberDisplayed === "-0") {
    display("-" + numberPressed);
    return;
  }
  if (numberDisplayed === "0") {
    display(numberPressed);
  } else {
    display(numberDisplayed + numberPressed);
  }
}

function plusOrMinusFunction(numberDisplayed) {
  if (numberDisplayed === "0") {
    display("-0");
    return;
  }
  if (numberDisplayed.includes("-")) {
    display(numberDisplayed.slice(1));
    plusOrMinusBtn.classList.remove("onclick");
  } else {
    display("-" + numberDisplayed);
  }
}

function percentageFunction(numberDisplayed) {
  if (numberDisplayed === "0") {
    display("0.0");
  } else {
    display(Number(numberDisplayed) / 100);
  }
  percentKeyBtn.classList.remove("onclick");
}

//
// set state functions
function nox() {
  orangeButtons.forEach((button) => button.classList.remove("clicked"));
}

function findClickedOrange() {
  orangeButtons.forEach((button) => {
    if (button.classList.contains("clicked")) {
      operator.clicked = button.id;
    }
  });
}

//
// calculate functions
function getPriorResult() {
  if (operator.prior === "multiply") {
    return (value.prior * value.second).toPrecision(6);
  }
  if (operator.prior === "devide") {
    return (value.prior / value.second).toPrecision(6);
  }
}

function getSecondaryResult() {
  if (operator.secondary === "plus") {
    return value.secondary + value.second;
  }
  if (operator.secondary === "minus") {
    return value.secondary - value.second;
  }
}

//
// events

// NUMBERS pads
numbers.forEach((button) => {
  button.addEventListener("click", function (e) {
    //has clicked operator?
    findClickedOrange();
    //set operator
    if (operator.clicked) {
      switch (operator.clicked) {
        case "plus":
        case "minus":
          operator.secondary = operator.clicked;
          value.secondary = value.temp;
          break;
        case "multiply":
        case "devide":
          operator.prior = operator.clicked;
          value.prior = value.temp;
          break;
      }
      display("");
      nox();
      operator.clicked = "";
    }
    appendNumber(this.textContent);
    document.getElementById("plusOrMinus").classList.remove("onclick");
    document.getElementById("percentKey").classList.remove("onclick");
  });
});

// OPERATORS
orangeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const numberDisplayed = document.getElementById("display").textContent;
    if (numberDisplayed === "0") {
      return;
    }
    value.temp = parseFloat(numberDisplayed);

    if (value.secondary && value.prior) {
      value.second = value.temp;
      value.temp = getPriorResult();
      display(parseFloat(value.temp));
      operator.prior = "";
    }

    if (operator.secondary || operator.prior) {
      if (value.secondary && this.classList.contains("prior")) {
        value.prior = value.temp;
        operator.prior = this.id;
        nox();
        this.classList.add("clicked");
        return;
      }
      value.second = value.temp;
      value.temp = getPriorResult() || getSecondaryResult();
      display(parseFloat(value.temp));
      operator.prior = operator.secondary = "";
    }
    //reset
    if (this === equalBtn) {
      value.secondary = value.prior = value.second = 0;
    }
    //choosing operator
    nox();
    this.classList.add("clicked");
  });
});

//
//lightrey buttons
const lightgreyButtons = document.querySelectorAll("button.lightgrey");
lightgreyButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    this.classList.add("onclick");
    switch (this) {
      case document.getElementById("AC"):
        location.reload();
        break;
      case document.getElementById("plusOrMinus"):
        plusOrMinusFunction(document.getElementById("display").textContent);
        break;
      case document.getElementById("percentKey"):
        setTimeout(() => {
          percentageFunction(document.getElementById("display").textContent);
        }, 80);
        break;
    }
  });
});
