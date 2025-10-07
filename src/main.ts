// import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";
import tb from "./tb.png";

// document.body.innerHTML = `
//   <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
// `;

let counter = 0;

document.body.innerHTML = `
  <p>Get me more Taco Bell</p>
  <p id="counter">${counter} tacos</p>
  <button id="TacoBellButton" style="background:none, pointer:none, cursor:none;">
  <img src="${tb}" class="icon" alt="Taco Bell Icon" />
  </button>
`;

const counterElement = document.getElementById("counter");

document.getElementById("TacoBellButton")?.addEventListener("click", () => {
  counter++;
  console.log("Amount of Taco Bell: ", counter);
  if (counterElement) {
    counterElement.textContent = counter.toString();
  }
});
