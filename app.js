const numButton = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for(let i=0; i<numButton.length; i++){
    numButton[i] = document.querySelector(`#button${i}`);
}
const acButton = document.querySelector(".ac");
const ceButton = document.querySelector(".ce");
const divButton = document.querySelector(".div");
const multButton = document.querySelector(".mult");
const minusButton = document.querySelector(".minus");
const plusButton = document.querySelector(".plus");
const dotButton = document.querySelector(".dot");
const eqButton = document.querySelector(".eq");

const displayOperations = document.querySelector('.display-operations');
const displayMain = document.querySelector('.display-main');

let haveDot = false;
let eq = false;
let eq1 = true;


//add event listener for key pressing
document.addEventListener("keydown", (e)=>{
    if(!isNaN(e.key)){ //numbers
        Numbers(e.key);
    }else if(e.key === '/' || e.key === '*' || e.key === '-' || e.key === '+'){ //operators
        Operator(e.key);
    }else if(e.key === '=' || e.key === 'Enter'){ //equal
        Equal();
    }else if(e.key === '.'){ //dot
        Dot();
    }else if(e.key === 'Delete'){ //AC
        Delete();
    }else if(e.key === 'Backspace' || e.key === 'End'){ //CE
       Cancel();
    }
});

//add event listener for mouse click

//numbers
numButton.forEach(num =>{ num.addEventListener('click', (e) => Numbers(num.innerText)); });

//ac button
acButton.addEventListener('click', (e) => Delete());

//ce button
ceButton.addEventListener('click', (e) => Cancel());

//equal button
eqButton.addEventListener('click', (e) =>Equal());

//dot button
dotButton.addEventListener('click', (e) =>Dot());

//operators buttons
divButton.addEventListener('click', (e) => Operator('/'));

multButton.addEventListener('click', (e) => Operator('x'));

minusButton.addEventListener('click', (e) => Operator('-'));

plusButton.addEventListener('click', (e) => Operator('+'));


//FUNCTIONS

//function which determine whether there is still place or not in the text field
function isMax(){
    if(displayMain.innerText.length===12){
        document.querySelector('.display-indicate').style.color = 'white';
        return true;
    } else {
        return false;
    }
}

//function used by the operators
function Operator(operator){
    if(displayOperations.innerText == '0' || eq){
        displayOperations.innerText = `${displayMain.innerText}${operator}`;
        eq = false;
    }else{
        let equal = compute(displayOperations.innerText.substring
                    (0, displayOperations.innerText.length-1), displayMain.innerText, 
                    displayOperations.innerText[displayOperations.innerText.length-1]);
        displayOperations.innerText = `${equal}${operator}`;
    }
    displayMain.innerText = '0';
    haveDot = false;

}

//function used to compute operations
function compute(num1, num2=0, operator='-'){
    let com;
    switch(operator){
        case 'x', '*':
            com = num1 * num2;
            break;
        case '/':
            if(num2==0){
                alert('Sorry, the denominator can not be 0');
            }else{
                com = num1 / num2;
            }
            break;
        case '-':
            com = num1 - num2;
            break;
        case '+':
            com = (num1*1) + (num2*1);
            break;
        default:
            console.log('error');
            break;
    }
    return com;
}

//function for Number
function Numbers(num){
    if(displayMain.innerText == '0'){
        displayMain.innerText = `${num}`;
        // displayMain.innerText += num.innerText;
    }else if(eq1 && eq){
        if(haveDot){
            displayMain.innerText += num;
        }else{
            displayMain.innerText = `${num}`;
        }
        eq1 = false;
    }else if(!isMax()){
        displayMain.innerText += num;
    }
    
}

//function for dot
function Dot(){
    if(!isMax() && !haveDot){
        if(eq){
            displayMain.innerText =`0${dotButton.innerText}`;
        }else{
            displayMain.innerText += dotButton.innerText;
        }
        haveDot = true;
    }
}

//Function for Equal
function Equal(){
    let equal;
    if(displayOperations.innerText == '0'){
        equal = compute(displayMain.innerText);
    }else{
        equal = compute(displayOperations.innerText.substring
                (0, displayOperations.innerText.length-1), displayMain.innerText, 
                displayOperations.innerText[displayOperations.innerText.length-1]);
    }
    
    displayOperations.innerText += displayMain.innerText +='=';
    if(`${equal}`.length<=12){
        displayMain.innerText = `${equal}`;
    }else{
        const equ = `${equal}`;
        displayMain.innerText = `${equ.substr(0, 9)}...`;
    }
    eq = true;
    eq1 = true;
    haveDot = false;
}

//Function for Delete a.k.a AC
function Delete(){
    displayMain.innerText = '0';
        displayOperations.innerText = '0';
        haveDot = false;
        document.querySelector('.display-indicate').style.color = 'rgba(255, 255, 255, 0.05)';
}

//Function for Cancel a.k.a CE
function Cancel(){
    if(displayMain.innerText != '0'){
        if(displayMain.innerText.length == 1){
            displayMain.innerText = '0';
        }else{
            if(displayMain.innerText[displayMain.innerText.length-1] == '.'){
                haveDot = false;
            }
            document.querySelector('.display-indicate').style.color = 'rgba(255, 255, 255, 0.05)';
            displayMain.innerText = displayMain.innerText.substring(0,displayMain.innerText.length-1);
        }
    }
}
