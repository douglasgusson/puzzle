export function setupPuzzle(element: HTMLDivElement) {
  let gridSize = 4;
  let tiles: number[] = [];
  let moveCount = 0;

  initPuzzle();

  function initPuzzle() {
    resetPuzzle();
    shuffleTiles();

    document
      .querySelector<HTMLButtonElement>("#shuffleTiles")!
      .addEventListener("click", shuffleTiles);

    document
      .querySelector<HTMLButtonElement>("#resetPuzzle")!
      .addEventListener("click", resetPuzzle);
  }

  function updateGridStyle() {
    element.style.gridTemplateColumns = `repeat(${gridSize}, 80px)`;
  }

  function resetPuzzle() {
    tiles = Array.from(
      { length: gridSize * gridSize - 1 },
      (_, index) => index + 1
    );
    tiles.push(0);
    moveCount = 0;
    renderPuzzle();
    updateMoveCount();
  }

  function shuffleTiles() {
    for (let i = tiles.length - 2; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    moveCount = 0;
    renderPuzzle();
    updateMoveCount();
  }

  function renderPuzzle() {
    element.innerHTML = "";
    tiles.forEach((tile, index) => {
      const tileElement = document.createElement("div");
      tileElement.className = "tile";
      if (tile === 0) {
        tileElement.classList.add("empty");
      } else {
        tileElement.innerText = String(tile);
        tileElement.addEventListener("click", () => moveTile(index));
      }

      element.appendChild(tileElement);
    });
    updateGridStyle();
  }

  function moveTile(index: number) {
    const emptyIndex = tiles.indexOf(0);
    if (canMove(index, emptyIndex)) {
      [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
      moveCount++;
      renderPuzzle();
      updateMoveCount();
      checkSolved();
    }
  }

  function canMove(index: number, emptyIndex: number) {
    const rowDiff = Math.abs(
      Math.floor(index / gridSize) - Math.floor(emptyIndex / gridSize)
    );
    const colDiff = Math.abs((index % gridSize) - (emptyIndex % gridSize));
    return rowDiff + colDiff === 1;
  }

  function checkSolved() {
    const isSolved =
      tiles.slice(0, -1).every((tile, index) => tile === index + 1) &&
      tiles[tiles.length - 1] === 0;
    if (isSolved) {
      element.style.animation = "victory 0.5s ease";
      setTimeout(() => {
        alert(
          `Parabéns! Você resolveu o quebra-cabeça em ${moveCount} movimentos!`
        );
        element.style.animation = "";
      }, 500);
    }
  }

  function updateMoveCount() {
    const moveCounterElement =
      document.querySelector<HTMLSpanElement>("#moveCounter");
    if (moveCounterElement) {
      moveCounterElement.innerText = `Movimentos: ${moveCount}`;
    }
  }
}
