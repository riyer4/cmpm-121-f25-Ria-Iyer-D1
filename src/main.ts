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
  baja: { count: 0, cost: 10, rate: 0.5, multiplier: 1.15 },
  nacho: { count: 0, cost: 50, rate: 2.0, multiplier: 1.15 },
  taco: { count: 0, cost: 200, rate: 10.0, multiplier: 1.15 },
  gordita: { count: 0, cost: 1000, rate: 20.0, multiplier: 1.15 },
};

//html:

document.body.innerHTML = `
  <div id="inventory" class="inventory">
    <div id="bajaIcons" class="icon-column"></div>
    <div id="nachoIcons" class="icon-column"></div>
    <div id="tacoIcons" class="icon-column"></div>
    <div id="gorditaIcons" class="icon-column"></div>
  </div>

  <h1>Get Me More Taco Bell!</h1>
  <h3 id="counter">${counter} tacos</h3>

  <button id="TacoBellButton">
    <img src="${tb}" class="icon" alt="Taco Bell Icon" />
  </button>

  <h4>Upgrades:</h4>

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
const bajaCostElement = document.getElementById("bajaCost")!;
const nachoCostElement = document.getElementById("nachoCost")!;
const tacoCostElement = document.getElementById("tacoCost")!;
const gorditaCostElement = document.getElementById("gorditaCost")!;
const growthRateElement = document.getElementById("growth")!;

//icons:

const bajaIcons = document.getElementById("bajaIcons")!;
const nachoIcons = document.getElementById("nachoIcons")!;
const tacoIcons = document.getElementById("tacoIcons")!;
const gorditaIcons = document.getElementById("gorditaIcons")!;

//clicking:

document.getElementById("TacoBellButton")?.addEventListener("click", () => {
  counter++;
  updateCounter();
});

document.getElementById("BajaButton")?.addEventListener(
  "click",
  () => buyUpgrade("baja", bajaUpgradeCounterElement, bajaCostElement),
);

document.getElementById("NachoButton")?.addEventListener(
  "click",
  () => buyUpgrade("nacho", nachoUpgradeCounterElement, nachoCostElement),
);

document.getElementById("TacoButton")?.addEventListener(
  "click",
  () => buyUpgrade("taco", tacoUpgradeCounterElement, tacoCostElement),
);

document.getElementById("GorditaButton")?.addEventListener(
  "click",
  () => buyUpgrade("gordita", gorditaUpgradeCounterElement, gorditaCostElement),
);

//upgrade logic:

function buyUpgrade(
  type: keyof typeof upgrades,
  upgradeElement: HTMLElement,
  costElement: HTMLElement,
) {
  const upgrade = upgrades[type];
  if (counter >= upgrade.cost) {
    counter -= upgrade.cost;
    upgrade.count++;

    // increase cost
    upgrade.cost = Math.ceil(upgrade.cost * upgrade.multiplier);

    // update
    upgradeElement.textContent = `${
      capitalize(type)
    } Upgrades: ${upgrade.count}`;
    costElement.textContent = `${upgrade.cost} tacos`;

    //get icon

    const img = document.createElement("img");
    img.src = getUpgradeImage(type);
    img.className = "icon";

    switch (type) {
      case "baja":
        bajaIcons.appendChild(img);
        break;
      case "nacho":
        nachoIcons.appendChild(img);
        break;
      case "taco":
        tacoIcons.appendChild(img);
        break;
      case "gordita":
        gorditaIcons.appendChild(img);
        break;
    }

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

//for visual farm of icons

function getUpgradeImage(type: keyof typeof upgrades) {
  switch (type) {
    case "baja":
      return baja;
    case "nacho":
      return nacho;
    case "taco":
      return taco;
    case "gordita":
      return gordita;
  }
}
