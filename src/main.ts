import { setupPuzzle } from "./puzzle.ts";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container">
    <h1>Quebra-cabeça</h1>
    <div id="puzzle-container" class="puzzle-container"></div>
    <div id="moveCounterContainer">
      <span id="moveCounter">Movimentos: 0</span>
    </div>
    <div class="buttons">
      <button id="shuffleTiles">Embaralhar</button>
      <button id="resetPuzzle">Resetar</button>
    </div>
  </div>
`;

setupPuzzle(document.querySelector<HTMLDivElement>("#puzzle-container")!);
