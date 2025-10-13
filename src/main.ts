// import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

//buttons:

import tb from "./tb.png";
import baja from "./bbt.jpg";
import gordita from "./cgc.jpg";
import taco from "./dlt.jpg";
import nacho from "./cac.jpg";

// document.body.innerHTML = `
//   <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
// `;

//variables:

let counter = 0;
let growthRate = 0;
let running = false; //to track upgrades
let prev = performance.now();

//upgrades:

const upgrades = { //upgrades! A, B, C, & D
  baja: { count: 0, cost: 10, rate: 0.5 },
  nacho: { count: 0, cost: 50, rate: 2.0 },
  taco: { count: 0, cost: 200, rate: 10.0 },
  gordita: { count: 0, cost: 1000, rate: 20.0 },
};

//html:

document.body.innerHTML = `
  <h1>Get Me More Taco Bell!</h1>

  <h3 id="counter">${counter} tacos</h3>

  <button id="TacoBellButton">
    <img src="${tb}" class="icon" alt="Taco Bell Icon" />
  </button>

  <div class="upgrade-panel">
    <div class="upgrade">
      <h2 id="bajaCost">10 tacos</h2>
      <button id="BajaButton"><img src="${baja}" class="icon" alt="Baja Blast Icon" /></button>
      <p id="bajaUpgrades">Baja Upgrades: 0</p>
    </div>

    <div class="upgrade">
      <h2 id="nachoCost">50 tacos</h2>
      <button id="NachoButton"><img src="${nacho}" class="icon" alt="Chips and Cheese Icon" /></button>
      <p id="nachoUpgrades">Nacho Upgrades: 0</p>
    </div>

    <div class="upgrade">
      <h2 id="tacoCost">200 tacos</h2>
      <button id="TacoButton"><img src="${taco}" class="icon" alt="Doritos Locos Taco Icon" /></button>
      <p id="tacoUpgrades">Taco Upgrades: 0</p>
    </div>

    <div class="upgrade">
      <h2 id="gorditaCost">1000 tacos</h2>
      <button id="GorditaButton"><img src="${gordita}" class="icon" alt="Cheesy Gordita Crunch Icon" /></button>
      <p id="gorditaUpgrades">Gordita Upgrades: 0</p>
    </div>
  </div>


  <p id="growth">Taco Multiplier: ${growthRate}</p>
`;

//counters:

const counterElement = document.getElementById("counter")!;
const bajaUpgradeCounterElement = document.getElementById("bajaUpgrades")!;
const nachoUpgradeCounterElement = document.getElementById("nachoUpgrades")!;
const tacoUpgradeCounterElement = document.getElementById("tacoUpgrades")!;
const gorditaUpgradeCounterElement = document.getElementById(
  "gorditaUpgrades",
)!;
const growthRateElement = document.getElementById("growth")!;

//clicking:

document.getElementById("TacoBellButton")?.addEventListener("click", () => {
  counter++;
  updateCounter();
});

document.getElementById("BajaButton")?.addEventListener(
  "click",
  () => buyUpgrade("baja", bajaUpgradeCounterElement),
);

document.getElementById("NachoButton")?.addEventListener(
  "click",
  () => buyUpgrade("nacho", nachoUpgradeCounterElement),
);

document.getElementById("TacoButton")?.addEventListener(
  "click",
  () => buyUpgrade("taco", tacoUpgradeCounterElement),
);

document.getElementById("GorditaButton")?.addEventListener(
  "click",
  () => buyUpgrade("gordita", gorditaUpgradeCounterElement),
);

//upgrade logic:

function buyUpgrade(type: keyof typeof upgrades, element: HTMLElement) {
  const upgrade = upgrades[type];
  if (counter >= upgrade.cost) {
    counter -= upgrade.cost;
    upgrade.count++;

    element.textContent = `${
      capitalize(type)
    } Upgrades: ${upgrade.count} (Cost: ${upgrade.cost})`;

    updateCounter();

    if (!running) {
      running = true;
      prev = performance.now();
      requestAnimationFrame(animate);
    }
  } else {
    console.log("Insufficient Taco Funds");
  }
}

// growth
function animate(time: number) {
  const timePassed = (time - prev) / 1000;
  prev = time;

  growthRate = 0;
  for (const key in upgrades) {
    growthRate += upgrades[key as keyof typeof upgrades].count *
      upgrades[key as keyof typeof upgrades].rate;
  }

  growthRateElement.textContent = `Taco Rate: ${
    growthRate.toFixed(1)
  } tacos/sec`;

  counter += growthRate * timePassed;

  updateCounter();

  requestAnimationFrame(animate);
}

// update counter
function updateCounter() {
  const rounded = Math.floor(counter);
  counterElement.textContent = `${rounded} taco${rounded !== 1 ? "s" : ""}`;
}

// capitilization since I made everything lowercase and I am lazy
function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
