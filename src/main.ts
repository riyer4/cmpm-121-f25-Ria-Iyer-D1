// import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";
import tb from "./tb.png";
import baja from "./bbt.jpg";

// document.body.innerHTML = `
//   <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
// `;

let counter = 0;
let upgradeCounter = 0;
let growthRate = 0;
let running = false; //to track upgrades
let prev = performance.now();

document.body.innerHTML = `
  <p>Get me more Taco Bell</p>
  <p id="counter">${counter} taco</p>
  <p id="upgrades">Baja Blast Upgrades: ${upgradeCounter}</p>
  <button id="TacoBellButton" style="background:none, pointer:none, cursor:none;">
  <img src="${tb}" class="icon" alt="Taco Bell Icon" />
  </button>
  <button id="BajaButton" style="background:none, pointer:none, cursor:none;">
  <img src="${baja}" class="icon" alt="Baja Blast Icon" />
  </button>
  <p id="growth">Taco Multiplier: ${growthRate}</p>
`;

const counterElement = document.getElementById("counter")!;
const upgradeCounterElement = document.getElementById("upgrades")!;
const growthRateElement = document.getElementById("growth")!;

document.getElementById("TacoBellButton")?.addEventListener("click", () => {
  counter++;
  console.log("Amount of Taco Bell: ", counter);
  if (counterElement) {
    counterElement.textContent = `${counter} taco${counter !== 1 ? "s" : ""}`; // 1 taco !== 1 tacos
  }
});

document.getElementById("BajaButton")?.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    upgradeCounter++;
    console.log("Baja Upgrade acquired!");
    if (upgradeCounterElement) {
      upgradeCounterElement.textContent =
        `Baja Blast Upgrades: ${upgradeCounter}`;
    }
    if (!running) {
      running = true;
      prev = performance.now(); //tracks timestamp(?)
      requestAnimationFrame(animate);
    }
  } else {
    console.log("Insufficient Taco Funds");
  }
});

function animate(time: number) {
  const timePassed = (time - prev) / 1000; // to find how much time has passed
  prev = time;

  counter += timePassed * upgradeCounter;
  growthRate = 1 + (0.1 * upgradeCounter);
  const rounded = Math.floor(counter); //no decimals
  counterElement.textContent = `${rounded} taco${rounded !== 1 ? "s" : ""}`; // 1 taco !== 1 tacos
  if (growthRateElement) {
    growthRateElement.textContent = `Taco Multiplier: ${growthRate}x`;
  }
  requestAnimationFrame(animate);
}
