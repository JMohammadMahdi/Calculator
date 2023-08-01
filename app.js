const keysElements = document.querySelectorAll(".keys")
const operatorsElements = document.querySelectorAll(".operator")
const dataSaver = document.querySelector(".dataSaver")

document.addEventListener("keydown", keyHandler)

const display = document.querySelector(".result")

let CalculateClick = false;
keysElements.forEach(element => {
    element.addEventListener("click", GetInnerKey)
});

function GetInnerKey(event) {
    ButtonHandler(event.target.innerText)
}

function ButtonHandler(key) {
    const digits = key;
    let displayValue = display.innerText;

    if (CalculateClick) {
        displayValue = "0";
        dataSaver.innerText = null;

        CalculateClick = false;
    }

    (displayValue > 0 || displayValue == ".") ? display.innerText += String(digits) : display.innerText = String(digits);
}

operatorsElements.forEach(operator => {
    operator.addEventListener("click", GetInnerOpt)
});

function GetInnerOpt(event) {
    OperatorHandler(event.target.innerText)
}

function OperatorHandler(opt) {
    const displayValue = display.innerText.replace("=", "");
    let MathString = "";

    if (CalculateClick) {
        dataSaver.innerText = displayValue + opt;
        display.innerText = "0"

        CalculateClick = false;
    } else if (display.innerText > 0) {
        MathString += opt;
        dataSaver.innerText += displayValue + MathString;
        display.innerText = 0;

        CalculateClick = false;
    }
}

const RadicalKey = document.getElementById("sqrt").
    addEventListener("click", RadicalHandler);

function RadicalHandler() {
    const displayValue = display.innerText.replace("=", "");
    const dataSaverValue = dataSaver.innerText;

    const result = Math.sqrt(displayValue);
    display.innerText = `=${result}`;
    dataSaver.innerText = ("√" + displayValue);

    CalculateClick = true;
}

const power = document.getElementById("powerTwo").
    addEventListener("click", PowerHandler);

function PowerHandler() {
    const displayValue = display.innerText.replace("=", "");
    display.innerText = "=" + displayValue * displayValue;
    dataSaver.innerText = displayValue + "^" + 2;

    CalculateClick = true;
}

document.querySelector("#clear").addEventListener("click", CleanAll)
function CleanAll() {
    display.innerText = "0";
    dataSaver.innerText = null;
}

document.querySelector("#delete").addEventListener("click", RemoveDigits)
function RemoveDigits() {
    let displayValue = display.innerText;
    displayValue = displayValue.substring(0, displayValue.length - 1);

    if (CalculateClick) {
        display.innerText = 0;
        dataSaver.innerText = null;
    } else {
        if (displayValue.length > 0) {
            display.innerText = displayValue
        } else {
            display.innerText = 0;
        }
    }
}

document.querySelector(".submit").addEventListener("click", Calculating);
function Calculating() {
    let dataSaverValue = "";
    let str = null;

    // calculation
    let result = 0;
    if (display.innerText > 0) {
        dataSaverValue = dataSaver.innerText;
        str = dataSaverValue + display.innerText;
        result = eval(str);

        CalculateClick = true;
    } else {
        dataSaverValue = dataSaver.innerText;
        str = dataSaverValue.substring(0, dataSaverValue.length - 1)
        result = eval(str);

        CalculateClick = true;
    }

    display.innerText = `=${result}`;
    dataSaver.innerText = str;
}

function keyHandler(event) {
    const key = event.key;

    if (10 > key && key >= 0 || key == ".") {
        ButtonHandler(key);
    } else if (key == "*" || key == "+" || key == "/" || key == "-") {
        OperatorHandler(key)
    } else if (key == "Enter") {
        Calculating();
    } else if (key == "Backspace") {
        RemoveDigits();
    } else if (key == "Escape") {
        CleanAll();
    } else if (event.shiftKey && event.keyCode === 54) {
        event.preventDefault();
        PowerHandler();
    }
}

const Theme = document.getElementById("CheckTheme");
Theme.addEventListener("change", event => {
    const checkbox = event.target;

    if (checkbox.checked) {
        document.documentElement.style.setProperty('--KeyBackground', 'rgb(48, 49, 54, 0.6)');
        document.documentElement.style.setProperty('--ResultColor', '#fff');
        document.documentElement.style.setProperty('--OperatorBackground', 'rgb(0, 93, 178, 0.6)');
        document.documentElement.style.setProperty('--CalculatorBackground', 'rgb(25, 145, 255, 1)');
        document.documentElement.style.setProperty('--KeyColor', '#29A8FF');
        document.documentElement.style.setProperty('--CleanColor', 'rgb(166, 166, 166, 0.5)');
        document.documentElement.style.setProperty('--CelanBakcground', 'rgb(97, 97, 97, 0.6)');
        document.documentElement.style.setProperty('--keyColorBorder', '#303136');
        document.documentElement.style.setProperty('--OperatorDropShadow', 'none');
    } else {
        document.documentElement.style.setProperty('--KeyBackground', 'rgba(255, 255, 255, 0.6)');
        document.documentElement.style.setProperty('--ResultColor', '#424242');
        document.documentElement.style.setProperty('--OperatorBackground', 'rgba(97, 197, 255, 0.6)');
        document.documentElement.style.setProperty('--CalculatorBackground', 'rgba(25, 172, 255, 1)');
        document.documentElement.style.setProperty('--KeyColor', '#fff');
        document.documentElement.style.setProperty('--CleanColor', 'rgb(97, 197, 255, 0.5)');
        document.documentElement.style.setProperty('--CelanBakcground', 'rgba(255, 255, 255, 0.6)');
        document.documentElement.style.setProperty('--keyColorBorder', '1px solid #D2DEE4');
        document.documentElement.style.setProperty('--OperatorDropShadow', 'inset -0.5px 0.5px 3px #bec8d6');
    }
});
