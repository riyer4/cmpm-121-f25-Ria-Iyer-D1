// import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";
import tb from "./tb.png";
import baja from "./bbt.jpg";

// document.body.innerHTML = `
//   <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
// `;

let counter = 0;

document.body.innerHTML = `
  <p>Get me more Taco Bell</p>
  <p id="counter">${counter} taco</p>
  <button id="TacoBellButton" style="background:none, pointer:none, cursor:none;">
  <img src="${tb}" class="icon" alt="Taco Bell Icon" />
  </button>
  <button id="BajaButton" style="background:none, pointer:none, cursor:none;">
  <img src="${baja}" class="icon" alt="Baja Blast Icon" />
  </button>
`;

const counterElement = document.getElementById("counter")!;

document.getElementById("TacoBellButton")?.addEventListener("click", () => {
  counter++;
  console.log("Amount of Taco Bell: ", counter);
  if (counterElement) {
    counterElement.textContent = `${counter} taco${counter !== 1 ? "s" : ""}`; // 1 taco !== 1 tacos
  }
});

let prev = performance.now();

function animate(time: number) {
  const timeSpent = (time - prev) / 1000; // to find how much time has passed
  prev = time;

  counter += timeSpent;
  const rounded = Math.floor(counter); //no decimals
  counterElement.textContent = `${rounded} taco${rounded !== 1 ? "s" : ""}`; // 1 taco !== 1 tacos

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate); //start
