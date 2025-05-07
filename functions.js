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
    array.push("Allergys:" + allergyInput);
};

window.Restrictions = function(option, button) {
    array.push(option);
    darkenButton(button);
};

function darkenButton(button) {
    button.style.backgroundColor = '#e65c00';
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

function showLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.style.position = 'fixed';
    loadingScreen.style.top = '0';
    loadingScreen.style.left = '0';
    loadingScreen.style.width = '100%';
    loadingScreen.style.height = '100%';
    loadingScreen.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    loadingScreen.style.color = 'white';
    loadingScreen.style.display = 'flex';
    loadingScreen.style.justifyContent = 'center';
    loadingScreen.style.alignItems = 'center';
    loadingScreen.style.zIndex = '1000';
    loadingScreen.innerText = 'Loading... Please wait.';
    document.body.appendChild(loadingScreen);
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        document.body.removeChild(loadingScreen);
    }
}

// Modify submitToGemini to show and hide the loading screen
function submitToGemini() {
    showLoadingScreen(); // Show loading screen before API call
    console.log("Submitting to Gemini API with user input:", array);
    callGeminiApi(array).finally(() => {
        hideLoadingScreen(); // Hide loading screen after API call completes
    });
}