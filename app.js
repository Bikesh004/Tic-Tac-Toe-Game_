let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; // true = O, false = X

let winPatterns = [
  [0, 1, 2], // horizontal
  [3, 4, 5], // horizontal
  [6, 7, 8], // horizontal
  [0, 3, 6], // vertical
  [1, 4, 7], // vertical
  [2, 5, 8], // vertical
  [0, 4, 8], // diagonal
  [2, 4, 6], // diagonal
]; // 2D array

const resetGame = () => {
  turn0 = true;
  msgContainer.classList.add("hide");
  enableBoxes();
};

// add event listener to each box

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerHTML = "O";
      box.style.color = "green"; // add O to the box
      turn0 = false; // change turn to X
    } else {
      box.innerHTML = "X";
      box.style.color = "purple"; // add X to the box
      turn0 = true; // change turn to O
    }
    box.disabled = true; // disable the box
    checkWinner(); // check if there is a winner
  });
});

const showWinner = (pos1val) => {
  msg.innerText = `Congratulation , Winner is ${pos1val}`;
  msgContainer.classList.remove("hide");
  disabledBoxes();
};

const disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;
    if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val);
      } else {
        drawGame();
      }
    }
  }
};

const drawGame = () => {
  let count = 0;
  for (let box of boxes) {
    if (box.innerText !== "") {
      count++; // if box is not empty, add 1 to count
    } else {
      break;
    }
    if (count === 9) {
      msg.innerText = "Game is Draw";
      msgContainer.classList.remove("hide");
      disabledBoxes();
    } else {
      continue;
    }
  }
};

newGameBtn.addEventListener("click", resetGame); // add event listener to new game button

resetBtn.addEventListener("click", resetGame); // add event listener to reset button
