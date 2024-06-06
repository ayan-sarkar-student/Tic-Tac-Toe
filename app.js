let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turn0 = true; // player0, playerX
const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const disableBoxes = () => {
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

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return true; // Return true if a winner is found
            }
        }
    }
    return false; // Return false if no winner
};

const checkDraw = () => {
    // Check if all boxes are filled
    for (let box of boxes) {
        if (box.innerText === "") {
            return false; // Return false if any box is empty
        }
    }
    // If all boxes are filled and no winner, it's a draw
    if (!checkWinner()) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
        return true;
    }
    return false;
};

// Add event listeners for each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") { // Prevent overwriting a box
            if (turn0) {
                box.innerText = "0";
                box.style.color = "green";
                
                turn0 = false;
            } else {
                box.innerText = "X";
                turn0 = true;
            }
            // First check if there's a winner
            if (!checkWinner()) {
                // If no winner, check for draw
                checkDraw();
            }
        }
    });
});

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Add event listener for the reset button
resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);
