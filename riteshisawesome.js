import { callGeminiApi } from "./ai.js";
let array = [];

// Make functions globally accessible for HTML onclick attributes
window.BLD = function(option, button) {
    array.push(option);
    darkenButton(button);
};

window.SSS = function(option, button) {
    array.push(option);
    darkenButton(button);
};

window.Genre = function(option, button) {
    array.push(option);
    darkenButton(button);
};

window.Allergy = function() {
    const allergyInput = document.getElementById('Allergy').value;
    array.push(allergyInput);
};

window.Restrictions = function(option, button) {
    array.push(option);
    darkenButton(button);
};

function darkenButton(button) {
    button.style.backgroundColor = '#e65c00';
}

function submitToGemini() {
    console.log("Submitting to Gemini API with user input:", array);
    callGeminiApi(array);
}

window.printOptions = function() {
    console.log(array);
    hideEverything();
    document.getElementById("button").style.display = 'none';
    submitToGemini(); // Trigger API call
};

function hideEverything(){
   const elements = document.getElementsByClassName('quiz-container');
   for (let i = 0; i < elements.length; i++) {
       elements[i].style.display = 'none';
   }
}