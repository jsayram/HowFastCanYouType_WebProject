const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");


var timer = [0, 0, 0, 0]; // this array will capture the minutes, seconds, hundethds, & thousandths.
// Add leading zero to numbers 9 or below (purely for aesthetics):


// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = timer[0] + ":" + timer[1] + ":" + timer[2]; //this is the clock setu m,s,hund
    theTimer.innerHTML = currentTime;
    timer[3]++; //this updates the 4th postion on the array

    //Math.floor means you just wont get any decimals
    timer[0] = Math.floor((timer[3] / 100) / 60); //this will give just seconds/60 to give minutes
    timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60)) //everytime we hit 60 sec this value goes to 0
    /*thousanths of second - the seconds*100 - minutes*6000, that way we clear out every time we get to a hundredth of a second, and also subract the minutes*6000 , thats every time the minutes reach 100 so we dont count higher than there.*/
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    console.log(textEntered);
}

// Start the timer:
function start() {
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0) {
        setInterval(runTimer, 10); //this will run the every 1000 of a second
    }
    console.log(textEnteredLength);
}

// Reset everything:
function reset() {
    console.log("Reset button has been pressed!");
}

// Event listeners for keyboard input and the reset button:
//detects keyboard events
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false); // when you lift up the mouse
resetButton.addEventListener("click", reset, false);
