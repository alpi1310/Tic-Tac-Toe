const boxes = Array.from(document.getElementsByClassName('box'));
const resetBtn = document.getElementById('resetBtn');
const headerText = document.getElementById('header-text');
const areas = Array(9).fill(null);
const o_text = "o";
const x_text = "x";
let currentPlayer = o_text;

function handleBoxClick(e) {
  const id = e.target.id;
  if (!areas[id]) {
    areas[id] = currentPlayer;
    e.target.innerHTML = currentPlayer;

    if (hasPlayerWon(currentPlayer)) {
      headerText.innerHTML = `${currentPlayer} has won!!`;
      headerText.style.background = 'lightgreen';
      return;
    }

    currentPlayer = currentPlayer === o_text ? x_text : o_text;
  }
}

function bindClickEvent() {
  boxes.forEach(box => {
    box.addEventListener('click', handleBoxClick);
  });
}

bindClickEvent();

function hasPlayerWon(cPlayer) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (areas[a] === cPlayer && areas[b] === cPlayer && areas[c] === cPlayer) {
      highlightWinningBoxes(pattern);
      return true;
    }
  }

  return false;
}

function highlightWinningBoxes(pattern) {
  pattern.forEach(id => {
    boxes[id].style.background = 'lightgreen';
  });

  boxes.forEach(box => {
    box.style.cursor = 'not-allowed';
  });
}

function reset() {
  areas.fill(null);
  boxes.forEach(box => {
    box.innerHTML = '';
    box.style.background = '';
    box.style.cursor = 'pointer';
  });

  headerText.innerHTML = "Let's play..";
  headerText.style.background = "";
  currentPlayer = o_text;
}

resetBtn.addEventListener('click', reset);