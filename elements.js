import { callGeminiApi } from "./ai";

array = [];

function BLD(option, button) {
    array.push(option);
    darkenButton(button);
}

function SSS(option, button) {
    array.push(option);
    darkenButton(button);
}

function Genre(option, button) {
    array.push(option);
    darkenButton(button);
}

function Allergy() {
    const allergyInput = document.getElementById('Allergy').value;
    array.push(allergyInput);
}

function Restrictions(option, button) {
    array.push(option);
    darkenButton(button);
}

function darkenButton(button) {
    button.style.backgroundColor = '#e65c00';
}

function printOptions() {
    console.log(array);
    hideEverything();
}

function hideEverything(){
   const elements = document.getElementsByClassName('quiz-container');
   for (let i = 0; i < elements.length; i++) {
       elements[i].style.display = 'none';
   }
   const sub_btn = document.getElementById("butoon").style.display = 'none';
}

function submitRecipe() {
    console.log("send req to Gemini API with array", array);
    callGeminiApi(array);
}