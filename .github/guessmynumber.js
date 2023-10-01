// Generate a random number between 1 and 100
const targetNumber = Math.floor(Math.random() * 100) + 1;
let guessCount = 0;

// Function to check the user's guess
function checkGuess() {
  const guessInput = document.getElementById("guessInput");
  const guess = parseInt(guessInput.value);

  // Validate the user's guess
  if (isNaN(guess) || guess < 1 || guess > 100) {
    setMessage("Please enter a valid number between 1 and 100.");
    return;
  }

  // Increment the guess count
  guessCount++;

  // Check if the guess is correct
  if (guess === targetNumber) {
    setMessage(
      `Congratulations! You guessed the number in ${guessCount} tries.`
    );
    disableInput();
  } else if (guess < targetNumber) {
    setMessage("Too low. Try again.");
  } else {
    setMessage("Too high. Try again.");
  }

  // Clear the input field
  guessInput.value = "";
}

// Function to display a message
function setMessage(message) {
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
}

// Function to disable the input and button
function disableInput() {
  const guessInput = document.getElementById("guessInput");
  const checkButton = document.getElementsByTagName("button")[0];

  guessInput.disabled = true;
  checkButton.disabled = true;
}
