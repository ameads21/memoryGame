const gameContainer = document.getElementById("game");
let startButton = document.querySelector("#startButton");
startButton.addEventListener("click", startGame);
function startGame() {
  let title = document.querySelector("#title");

  title.style.maxHeight = "0";

  let clickedCard1 = null;
  let clickedCard2 = null;
  let no_click = false;
  let match = 0;
  let score = 0;

  const IMAGES = [
    "player",
    "mage",
    "playerHat",
    "goblin",
    "world",
    "player",
    "mage",
    "playerHat",
    "goblin",
    "world",
  ];

  // here is a helper function to shuffle an array
  // it returns the same array with values shuffled
  // it is based on an algorithm called Fisher Yates if you want ot research more
  function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  let shuffledImages = shuffle(IMAGES);

  // this function loops over the array of colors
  // it creates a new div and gives it a class with the value of the color
  // it also adds an event listener for a click for each card
  function createDivsForImages(imageArray) {
    for (let image of imageArray) {
      // create a new div
      const newDiv = document.createElement("div");

      // give it a class attribute for the value we are looping over
      newDiv.classList.add(image);
      newDiv.className += " notActive endGame";

      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener("click", handleCardClick);

      // append the div to the element with an id of game
      gameContainer.append(newDiv);
    }
  }

  // TODO: Implement this function!
  function handleCardClick(event) {
    console.log("you just clicked", event.target);

    //Preventing the same card to be pressed 2 times
    if (no_click) return;
    if (event.target.classList.contains("turned")) return;

    //Setting up the current card selected

    let currentCard = event.target;
    currentCard.style.backgroundImage = `url(${currentCard.classList[0]}.PNG)`;

    if (!clickedCard1 || !clickedCard2) {
      //Adding the turned class
      currentCard.classList.add("turned");
      clickedCard1 = clickedCard1 || currentCard;
      //Making sure the clickedCard1 value doesn't affect the second value.
      clickedCard2 = currentCard === clickedCard1 ? null : currentCard;
    }

    //If both cards are selected
    if (clickedCard1 && clickedCard2) {
      no_click = true;
      //If they match then do this
      if (clickedCard1.className === clickedCard2.className) {
        match += 2;
        clickedCard1.removeEventListener("click", handleCardClick);
        clickedCard2.removeEventListener("click", handleCardClick);
        clickedCard1.className += " matched";
        clickedCard2.className += " matched";
        clickedCard1 = null;
        clickedCard2 = null;
        no_click = false;
      } else {
        setTimeout(function () {
          //Resetting the background
          clickedCard1.style.backgroundImage = "";
          clickedCard2.style.backgroundImage = "";
          //Resetting the classNames
          clickedCard1.classList.remove("turned");
          clickedCard2.classList.remove("turned");

          clickedCard1.classList += " notActive";
          clickedCard2.classList += " notActive";
          //Resetting the values to null
          clickedCard1 = null;
          clickedCard2 = null;
          //Allowing the user to click cards again
          no_click = false;
          //Adding up score everytime they mess up
          score += 1;
        }, 1000);
      }
    }
    if (match === IMAGES.length) {
      const finalScore = document.createElement("div");
      const finalScoreText = document.createElement("h1");
      finalScoreText.className += "finalScore";
      finalScore.className += "finalScore";
      finalScoreText.innerText = `YOUR SCORE IS: ${score}`;
      document.getElementById("final").append(finalScore);
      document.getElementById("final").append(finalScoreText);
      document.getElementById("restart").style.display = "block";
      let done = document.getElementById("game");
      done.className += " endGame";
      done.style.maxHeight = "0";
    }
  }

  // when the DOM loads
  createDivsForImages(shuffledImages);
}
