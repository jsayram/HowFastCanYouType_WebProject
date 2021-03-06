const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");


var timer = [0, 0, 0, 0]; // this array will capture the minutes, seconds, hundethds, & thousandths.
var interval; // this is for the interval inside of start()
var timerRunning = false; //so when the script orgininaly loads ,the timer is not running

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}
// Run a standard minute/second/hundredths timer:
// added the function leadintZero helper function to get a string of numbers in return with a leading zero
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]); //this is the clock setu m,s,hund
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

    //this grabs the orgin text, add sets it up in a new variable and truncates it
    /*substring treats a string of text as an array and allows us to specify a section within the text
      -- to pull out and use as a substring, takes two arguments ,
       (where in array you want to start, how many characters you want returned)*/
    let originTextMatch = originText.substring(0, textEntered.length); // as a result you have two equal length strings

    if (textEntered == originText) {
        clearInterval(interval); // if the text maches the clock starts
        testWrapper.style.borderColor = "#429890"; //this change border of text field to green color

    } else {
        if (textEntered == originTextMatch) { //note this is the shorter string (substring),if true
            testWrapper.style.borderColor = "#65CCf3"; // blue color
        } else { //false
            testWrapper.style.borderColor = "#E95D0F"; // orange color
        }
    }

    //console.log(textEntered);
}

// Start the timer:
function start() {
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !timerRunning) {
        //this sets the timer running to zero so the timer wont start again when the script loads
        timerRunning = true;

        interval = setInterval(runTimer, 10); //this will run the every 1000 of a second
    }
    console.log(textEnteredLength);
}

// Reset everything:
function reset() {
    //we want to reset the interval timer that runs in the background, to not waste resources
    clearInterval(interval);

    /* grab interval variable and set it to null, so when re-assign setInterval the next time we start the app
    --we are not setting a new interval, because that would be mutiple processes in the browser simultanously- not cool*/
    interval = null;
    // set the timer array back to zero
    timer = [0, 0, 0, 0];
    // we need to set timerRunning back to false
    timerRunning = false;
    //clear the text area
    testArea.value = "";
    //reset timer back to zero
    theTimer.innerHTML = "00:00:00";
    //set the box back to gray color
    testWrapper.style.borderColor = "grey";

    // console.log("Reset button has been pressed!");
}

// Event listeners for keyboard input and the reset button:
//detects keyboard events
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false); // when you lift up the mouse
resetButton.addEventListener("click", reset, false);
