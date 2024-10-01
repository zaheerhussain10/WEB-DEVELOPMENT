const inputSlider= document.querySelector("[data-lengthSlider]");
const lengthDisplay= document.querySelector("[data-lengthNumber]");

const passwordDisplay= document.querySelector("[data-passwordDisplay]");
const copyBtn= document.querySelector("[data-copy]");
const copyMsg= document.querySelector("[data-copyMsg]");
const uppercaseCheck= document.querySelector("#uppercase");
const lowercaseCheck= document.querySelector("#lowercase");
const numbersCheck= document.querySelector("#numbers");
const symbolsCheck= document.querySelector("#symbols");
const indicator= document.querySelector("[data-indicator]");
const generateBtn= document.querySelector(".generateButton");
const allCheckBox= document.querySelectorAll("input[type=checkbox]");
const symbols='~`!@#$%^&*()_-=+{[]}\|;:"<,>.?/'

let password ="";
let passwordLength=15;
let checkCount=0;
handleSlider();
setIndiactor("#ccc")


function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerHTML=passwordLength;
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min)) +"% 100%"
}

function setIndiactor(color){
    indicator.style.backgroundColor =color;
    indicator.style.boxShadow =`0px 0px 12px 1px ${color}`;
}

function getRndInteger(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
} 

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){
    const randNum = getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    
    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasLower=true;
    if(numbersCheck.checked) hasNum=true;
    if(symbolsCheck.checked) hasSym=true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength>=8){
        setIndiactor("#0f0");
    } else if(
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >=6
    ){
        setIndiactor("#ff0");
    } else{
        setIndiactor("#f00")
    }
}

async function copyContaint(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerHTML="copyed";
    }
    catch(e){
        copyMsg.innerHTML="failed"

    }
    copyMsg.classList.add("active");

    setTimeout( () =>{
        copyMsg.classList.remove("active");
    },2000);
}

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked){
            checkCount++;
        }
    });

    if(passwordLength < checkCount){
        passwordLength= checkCount;
        handleSlider();
    }
}

copyBtn.addEventListener('click', () => {
    if(passwordDisplay){
        copyContaint();
    }
})

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change',handleCheckBoxChange);
})

inputSlider.addEventListener('input',(e) =>{
    passwordLength =e.target.value;
    handleSlider();
})



generateBtn.addEventListener('click', () => {

    if(checkCount == 0) 
        return;

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

  
    password = "";

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }

    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);
        password += funcArr[randIndex]();
    }
 
    password = shufflePassword(Array.from(password));

    passwordDisplay.value = password;

    calcStrength();
});