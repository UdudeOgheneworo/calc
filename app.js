const keys = document.querySelector(".keys");
const clicks = document.querySelector(".clicks");
const answer = document.querySelector(".answer");

const data = {
  betterSign: [],
  values: [],
  clicks: [],
  presNum: "",
  numGroup: [],
};

keys.addEventListener("click", (e) => {
  let { target } = e;
  let { className, dataset, innerHTML } = target;
  clickedNumber(className, dataset, innerHTML);
  clickedPercent(className, dataset, innerHTML);
  clickedOperator(className, dataset, innerHTML, target);
  clickedDecimal(className, dataset);
  clickedDelete(className);
  clickedClear(className);
  clickedEqual(className, dataset, innerHTML);
});

function updateData(dataset, className, innerHTML, letter) {
  data.values.push(dataset[className]);
  data.betterSign.push(innerHTML);
  data.clicks.push(letter);
}

function clickedNumber(className, dataset, innerHTML) {
  if (className == "num") {
    if (data.clicks.length == 1 && data.clicks[0] == "e") {
      clear();
    }
    updateData(dataset, className, innerHTML, "n");
    data.presNum = data.presNum + dataset.num;
    updateDisplay();
  }
}

function clickedPercent(className, dataset, innerHTML) {
  if (className == "percent" && data.clicks[data.clicks.length - 1] == "n") {
    updateData(dataset, className, innerHTML, "p");
    data.presNum = data.presNum + dataset.num;
    updateDisplay();
  }
}

function clickedOperator(className, dataset, innerHTML, target) {
  if (className == "operator" && data.values.length) {
    if (data.clicks[data.clicks.length - 1] == "o" && dataset.operator != "-") {
      if (data.values[data.values.length - 1] == "-") {
        console.log(data);
      }
      data.values[data.clicks.length - 1] = dataset.operator;
      data.betterSign[data.clicks.length - 1] = target.innerHTML;
    } else {
      if (data.values[data.values.length - 1] == "-" && dataset.operator == "-")
        return;
      data.numGroup.push(data.presNum);
      data.presNum = "";
      updateData(dataset, className, innerHTML, "o");
    }
    updateDisplay();
  }
}

function clickedDecimal(className, dataset) {
  if (className == "decimal") {
    if (data.clicks[0] == "e") {
      clear();
    }
    if (data.presNum.includes(".")) return;
    if (
      data.clicks[data.clicks.length - 1] == "o" ||
      !(data.numGroup && data.presNum)
    ) {
      data.betterSign.push("0.");
      data.values.push("0.");
    } else {
      data.betterSign.push(dataset.des);
      data.values.push(dataset.des);
    }
    data.clicks.push("d");
    data.presNum = data.presNum + dataset.des;
    updateDisplay();
  }
}

function clickedDelete(className) {
  if (className == "del") {
    if (data.values) {
      if (data.clicks[data.clicks.length - 1] == "o") {
        data.presNum = data.numGroup[data.numGroup.length - 1];
        data.numGroup.pop();
      } else {
        data.presNum = data.presNum.slice(0, data.presNum.length - 1);
      }
      data.values.pop();
      data.betterSign.pop();
      data.clicks.pop();
    }
    console.log(data);
    updateDisplay();
  }
}

function clear() {
  data.values = [];
  data.betterSign = [];
  data.clicks = [];
  data.presNum = "";
  data.numGroup = [];
}

function clickedClear(className) {
  if (className == "clear") {
    clear();
    updateDisplay();
  }
}

function clickedEqual(className) {
  if (
    className == "equal" &&
    data.clicks[data.clicks.length - 1] != "e" &&
    solve()
  ) {
    try {
      let value = solve();
      clicks.innerHTML = eval(value);
      answer.innerHTML = "";
      clear();
      data.presNum = data.presNum + clicks.innerHTML;
      data.values.push(clicks.innerHTML);
      data.betterSign.push(clicks.innerHTML);
      data.clicks = ["e"];
    } catch (error) {
      console.log(error);
      answer.innerHTML = "MATH error";
    }
  }
}

function solve() {
  let value = data.values.join("");
  if (
    data.clicks[data.clicks.length - 1] == "o" ||
    data.clicks[data.clicks.length - 1] == "d" ||
    data.values[data.clicks.length - 1] == "0."
  ) {
    value = data.values.join("");
    value = value.slice(0, value.length - 1);
  }
  try {
    let solved = eval(value);
    if (solved == "Infinity" || solved == "-Infinity") {
      return "can't divide by 0";
    } else {
      return Math.round(eval(value) * 1000) / 1000;
    }
  } catch (e) {
    return "";
  }
}

function updateDisplay() {
  clicks.innerHTML = data.betterSign.join("");
  if (data.clicks.includes("o") && (data.numGroup.length > 1 || data.presNum)) {
    answer.innerHTML = solve();
  } else {
    answer.innerHTML = "";
  }
}
