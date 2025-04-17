// Variables
let iterationCount = 0;
let comparisonCount = 0;
const inp_as = document.getElementById("a_size");
const inp_gen = document.getElementById("a_generate");
const inp_aspeed = document.getElementById("a_speed");
const butts_algos = document.querySelectorAll(".algos button");
const cont = document.getElementById("array_container");

let div_sizes = [];
let divs = [];
let margin_size = 0.1;

// Generate the array
function generate_array() {
    iterationCount = 0;
comparisonCount = 0;
document.getElementById("Iteration_Count").innerText = iterationCount;
document.getElementById("Comparison_Count").innerText = comparisonCount;
    document.getElementById("Time_Worst").innerText = "";
document.getElementById("Time_Average").innerText = "";
document.getElementById("Time_Best").innerText = "";
document.getElementById("Space_Worst").innerText = "";
cont.innerHTML = "";
document.getElementById("array_values").innerHTML = "";

let arraySize = parseInt(inp_as.value);

for (let i = 0; i < arraySize; i++) {
    // Height range: 5 to 95%
    let value = Math.floor(Math.random() * 91) + 5;
    div_sizes[i] = value;

    // Create bar
    divs[i] = document.createElement("div");
    divs[i].style.height = `${value}%`;
    divs[i].style.width = `${100 / arraySize - 0.5}%`;
    divs[i].style.backgroundColor = "#3498db";
    divs[i].style.margin = "0 1px";

    cont.appendChild(divs[i]);

   // Create corresponding value
    const valSpan = document.createElement("span");
    valSpan.innerText = value;
    valSpan.className = "array-value";
    document.getElementById("array_values").appendChild(valSpan);
    }
}

function setHeightAndValue(index, value) {
    div_sizes[index] = value;
    divs[index].style.height = value + "%";
    document.querySelectorAll(".array-value")[index].innerText = value;
}

async function updateBarAndValue(index, color = "blue") {
    divs[index].style.backgroundColor = color;
    document.querySelectorAll(".array-value")[index].style.color = color;
    await delay(getDelayTime());
}

// Array size update
function update_array_size() {
    document.getElementById("Time_Worst").innerText = "";
document.getElementById("Time_Average").innerText = "";
document.getElementById("Time_Best").innerText = "";
document.getElementById("Space_Worst").innerText = "";
    generate_array();
}

// Delay utility
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Dynamic delay based on slider
function getDelayTime() {
    let speed = parseInt(inp_aspeed.value);
    const maxDelay = 700;
    const minDelay = 250;
    return maxDelay - ((speed - 1) * ((maxDelay - minDelay) / 4));
}

// Swap utility (also updates values)
async function swap(i, j) {
    let temp = div_sizes[i];
    div_sizes[i] = div_sizes[j];
    div_sizes[j] = temp;

    divs[i].style.height = div_sizes[i] + "%";
    divs[j].style.height = div_sizes[j] + "%";

    document.querySelectorAll(".array-value")[i].innerText = div_sizes[i];
    document.querySelectorAll(".array-value")[j].innerText = div_sizes[j];

    await delay(getDelayTime());
}

// Button control
function disable_buttons() {
    for (let i = 0; i < butts_algos.length; i++) {
        butts_algos[i].classList = [];
        butts_algos[i].classList.add("butt_locked");

        butts_algos[i].disabled = true;
        inp_as.disabled = true;
        inp_gen.disabled = true;
        // inp_aspeed.disabled = true;
    }
}

function runalgo() {
    disable_buttons();

    this.classList.add("butt_selected");
    switch (this.innerHTML) {
        case "Bubble": Bubble(); break;
        case "Selection": Selection_sort(); break;
        case "Insertion": Insertion(); break;
        case "Merge": Merge(); break;
        case "Quick": Quick(); break;
        case "Heap": Heap(); break;
    }
}

// Initialize
inp_gen.addEventListener("click", generate_array);
inp_as.addEventListener("input", update_array_size);
butts_algos.forEach(btn => btn.addEventListener("click", runalgo));
window.onload = update_array_size;

function incrementIteration() {
    iterationCount++;
    document.getElementById("Iteration_Count").innerText = iterationCount;
}

function incrementComparison() {
    comparisonCount++;
    document.getElementById("Comparison_Count").innerText = comparisonCount;
}