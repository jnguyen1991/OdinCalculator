const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");
let cleared = true;
let operator = "";
let a = "";
let b = "";

function mainLogic(event){
    console.log(event.target.innerHTML)
    
    if (event.target.innerHTML === "AC"){
        display.textContent = "0";
        cleared = true;
        return;
    }
    
    if (cleared){
        if (isNumber(event.target.innerHTML)){
            display.textContent = event.target.innerHTML;
            cleared = false;
            return;
        }
    }
    
    if (isNumber(event.target.innerHTML)){
        display.textContent = display.textContent + event.target.innerHTML;
        return;
    }

    if (event.target.innerHTML === "+/-"){
        display.textContent = Number(display.textContent) * -1;
        a = Number(display.textContent);
        console.log("Change sign");
        return;
    }

    if (event.target.innerHTML === "+"){
        a = Number(display.textContent);
        operator = "+";
        console.log("operator set to +");
        cleared = true;
        return;
    }

    if (event.target.innerHTML === "-"){
        a = Number(display.textContent);
        operator = "-";
        console.log("operator set to -");
        cleared = true;
        return;
    }

    if (event.target.innerHTML === "*"){
        a = Number(display.textContent);
        operator = "*";
        console.log("operator set to *");
        cleared = true;
        return;
    }

    if (event.target.innerHTML === "/"){
        a = Number(display.textContent);
        operator = "/";
        console.log("operator set to /");
        cleared = true;
        return;
    }

    if (event.target.innerHTML === "."){
        if (!checkDecimal()){
            display.textContent = display.textContent + ".";
        }
        return;
    }

    if (event.target.innerHTML === "="){
        if (operator === ""){
            console.log("No operator");
            return;
        }
        b = Number(display.textContent);
        console.log(a, b, operator);
        let value = evaluate(a, b, operator);
        if (value === "Div by 0 Error"){
            display.textContent = value;
            a = 0;
            b = "";
            cleared = true;
            return;
        }
        else{
            a = value;
            value = String(value);
        }
        if (value.length > 16){
            value = value.slice(0,16);
        }
        operator = "";
        b = "";
        display.textContent = value;
        cleared = true;
        return;
    }
}

function checkDecimal(){
    if (display.textContent.includes(".")){
        return true;
    }
    return false;
}


function evaluate(a, b, operator){
    if (!isNumber(a)){
        a = 0;
    }
    if (operator === "+"){
        return a+b;
    }

    if (operator === "*"){
        return a*b;
    }

    if (operator === "-"){
        return a-b;
    }

    if (operator === "/"){
        if (b === 0){
            return "Div by 0 Error";
        }
        return a/b;
    }
}

function isNumber(text){
    return !isNaN(text);
}


buttons.forEach(button =>{
    button.addEventListener('click',mainLogic)
})

