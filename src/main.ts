// import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

//buttons:

import tb from "./tb.png";
import baja from "./bbt.jpg";
import gordita from "./cgc.jpg";
import taco from "./dlt.jpg";
import nacho from "./cac.jpg";
import wrap from "./cs.jpg";

// document.body.innerHTML = `
//   <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
// `;

//variables:

let counter = 0;
let growthRate = 0;
let running = false; //to track upgrades
let prev = performance.now();

//upgrades:

interface Upgrade {
  name: string;
  cost: number;
  rate: number;
  multiplier: number;
  count: number;
  icon: string;
}

const availableItems: Upgrade[] = [
  { name: "baja", cost: 10, rate: 0.5, multiplier: 1.15, count: 0, icon: baja },
  {
    name: "nacho",
    cost: 50,
    rate: 2.0,
    multiplier: 1.15,
    count: 0,
    icon: nacho,
  },
  {
    name: "taco",
    cost: 200,
    rate: 10.0,
    multiplier: 1.15,
    count: 0,
    icon: taco,
  },
  {
    name: "gordita",
    cost: 1000,
    rate: 20.0,
    multiplier: 1.15,
    count: 0,
    icon: gordita,
  },
  {
    name: "wrap",
    cost: 2000,
    rate: 50.0,
    multiplier: 1.15,
    count: 0,
    icon: wrap,
  },
];

//html:

document.body.innerHTML = `
  <div id="inventory" class="inventory">
    <div id="bajaIcons" class="icon-row"></div>
    <div id="nachoIcons" class="icon-row"></div>
    <div id="tacoIcons" class="icon-row"></div>
    <div id="gorditaIcons" class="icon-row"></div>
    <div id="wrapIcons" class="icon-row"></div>
  </div>

  <h1>Get Me More Taco Bell!</h1>
  <h3 id="counter">${counter} tacos</h3>

  <button id="TacoBellButton">
    <img src="${tb}" class="icon" alt="Taco Bell Icon" />
  </button>

  <h4>Upgrades:</h4>
  <div class="upgrade-panel">
    <div id="left-column" class="upgrade-column"></div>
    <div id="right-column" class="upgrade-column"></div>
  </div>


  <p id="growth">Taco Multiplier: ${growthRate}</p>
`;

//counters:

const counterElement = document.getElementById("counter")!;
const growthRateElement = document.getElementById("growth")!;
//const upgradePanel = document.querySelector(".upgrade-panel")!;

//clicking:

const leftColumn = document.getElementById("left-column")!;
const rightColumn = document.getElementById("right-column")!;

availableItems.forEach((item, index) => {
  const targetColumn = index < 3 ? leftColumn : rightColumn;

  const upgradeDiv = document.createElement("div");
  upgradeDiv.className = "upgrade";

  const costElement = document.createElement("h2");
  costElement.id = `${item.name}Cost`;
  costElement.textContent = `${item.cost} tacos`;

  const button = document.createElement("button");
  button.id = `${item.name}Button`;
  const img = document.createElement("img");
  img.src = item.icon;
  img.className = "icon";
  button.appendChild(img);

  const countElement = document.createElement("p");
  countElement.id = `${item.name}Upgrades`;
  countElement.textContent = `${capitalize(item.name)} Upgrades: ${item.count}`;

  upgradeDiv.append(costElement, button, countElement);
  targetColumn.appendChild(upgradeDiv);

  button.addEventListener(
    "click",
    () => buyUpgrade(item, costElement, countElement),
  );
});

document.getElementById("TacoBellButton")?.addEventListener("click", () => {
  counter++;
  updateCounter();
});

//upgrade logic:

function buyUpgrade(
  item: Upgrade,
  costElement: HTMLElement,
  countElement: HTMLElement,
) {
  if (counter >= item.cost) {
    counter -= item.cost;
    item.count++;

    item.cost = Math.ceil(item.cost * item.multiplier);
    costElement.textContent = `${item.cost} tacos`;
    countElement.textContent = `${
      capitalize(item.name)
    } Upgrades: ${item.count}`;

    // Append icon to the correct row
    const img = document.createElement("img");
    img.src = item.icon;
    img.className = "icon";

    switch (item.name) {
      case "baja":
        document.getElementById("bajaIcons")?.appendChild(img);
        break;
      case "nacho":
        document.getElementById("nachoIcons")?.appendChild(img);
        break;
      case "taco":
        document.getElementById("tacoIcons")?.appendChild(img);
        break;
      case "gordita":
        document.getElementById("gorditaIcons")?.appendChild(img);
        break;
      case "wrap":
        document.getElementById("wrapIcons")?.appendChild(img);
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

  // calculate growth rate
  growthRate = 0;
  availableItems.forEach((item) => {
    growthRate += item.count * item.rate;
  });

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
