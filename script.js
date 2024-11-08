let interval = 3000; 
let timerId;
let isPaused = false;
let startTime;
let clickCount = 0;

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const intervalInput = document.getElementById("intervalInput");
const playArea = document.getElementById("playArea");
const resultsTable = document.querySelector("#resultsTable tbody");

let redBox = document.createElement("div");
redBox.id = "redBox";
playArea.appendChild(redBox);
redBox.style.display = "none";

let boxClicked = false;


startBtn.addEventListener("click", () => {
  if (isPaused) {
    isPaused = false;
  } else {
    interval =
      intervalInput.value &&
      intervalInput.value >= 1 &&
      intervalInput.value <= 10
        ? intervalInput.value * 1000
        : 3000;
  }
  startGame();
});


pauseBtn.addEventListener("click", () => {
  clearInterval(timerId);
  isPaused = true;
});


resetBtn.addEventListener("click", () => {
  clearInterval(timerId);
  isPaused = false;
  clickCount = 0;
  resultsTable.innerHTML = "";
  redBox.style.display = "none";
});


function startGame() {
  clearInterval(timerId);
  showRedBox();
  timerId = setInterval(showRedBox, interval);
}


function showRedBox() {
  boxClicked = false; 
  redBox.style.display = "block";
  const x = Math.floor(
    Math.random() * (playArea.clientWidth - redBox.clientWidth)
  );
  const y = Math.floor(
    Math.random() * (playArea.clientHeight - redBox.clientHeight)
  );
  redBox.style.left = `${x}px`;
  redBox.style.top = `${y}px`;

  startTime = Date.now();
  clickCount++;

  
  setTimeout(() => {
    if (!boxClicked) {
      redBox.style.display = "none";
    }
  }, interval);
}


redBox.addEventListener("click", () => {
  if (boxClicked) return; 

  const reactionTime = ((Date.now() - startTime) / 1000).toFixed(2);
  logReaction(clickCount, `${reactionTime} s`);
  boxClicked = true; 
  redBox.style.display = "none";
});


function logReaction(clickNum, reaction) {
  const row = document.createElement("tr");
  const appearanceCell = document.createElement("td");
  const reactionCell = document.createElement("td");

  appearanceCell.textContent = `Appearance #${clickNum}`;
  reactionCell.textContent = reaction;

  row.appendChild(appearanceCell);
  row.appendChild(reactionCell);
  resultsTable.appendChild(row);
}
