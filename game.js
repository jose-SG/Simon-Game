var buttonColours = ["red", "blue", "green", "yellow"]; // These are the options available

var usedClickedPattern = []; // Array for allocating the users's clicks
var gamePattern = []; // Array for allocating the random combination generated in nextSequence()

var hasStarted = false; // Toggle this variable for letting the browser know if the game has started
var level = 0; // Counter of the game level

/* When the user presses a key, call nextSequence and after the call ends toggle hasStarted */
$(document).keydown(function() {
  if (!hasStarted) {
    /* nextSequence() empties the usedClickedPattern, increments the number of the level,
    generates a new button for the random pattern */
    nextSequence();
    hasStarted = true;
  }
});

/* Select the button clicked by the user using its ID */
$(".btn").on("click", function() {

  /* Allocate the buttons clicked in usedClickedPattern */
  var userChosenColour = $(this).attr('id');
  usedClickedPattern.push(userChosenColour);

  /* Animation for the buttons clicked calling to playSound and animatePress */
  playSound(userChosenColour);
  animatePress(userChosenColour);

  /* Check if the pattern is correct by using checkAnswer */
  checkAnswer(usedClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

  /* First check if the index of both arrays are the same */
  if (gamePattern[currentLevel] === usedClickedPattern[currentLevel]) {
    /* If both arrays are the same, check if the lengths of both arrays are the same
    If both conditions are true, then generate one more sequence */
    if (usedClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
    /* If the user clicks a wrong button */
  } else {
    playSound("wrong"); // Play the audio for wrong click

    /* Animation when the user clicks a wrong button */
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    /* Call to startOver for reset the variables and the array.
    After this, the game will be ready for start again when the user presses a key again */
    startOver();
  }
}

function nextSequence() {

  usedClickedPattern = []; // Empty usedClickPattern
  level++; // Increment the number of the level

  $("#level-title").text("Level: " + level); // Show the current level number

  /* Generate a random number between 0 and 3 and get that color (index)
  from the array of buttons available */

  var randomNumber = Math.floor(Math.random() * buttonColours.length);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour); // Push the random color generated to the array

  /* Animation when a button gets clicked */
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour); // Play the sound of the color selected
}

function startOver() {

  /* The function resets the values of hasStarted, level and gamePattern so,
  the game can start again if the user wants */
  hasStarted = false;
  level = 0;
  gamePattern = [];
}

function animatePress(currentColour) {

  /* Select the button passed as parameter and add a CSS class */
  var activeButton = $("#" + currentColour);
  activeButton.addClass("pressed"); // Add the CSS classed "pressed"

  /* Remove the class added after a second so it creates an animation */
  setTimeout(function() {
    activeButton.removeClass("pressed");
  }, 100);
}

function playSound(name) {

  /* Using the parameter name, play the sound from the folder "sounds" */
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
