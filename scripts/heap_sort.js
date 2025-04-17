async function Heap() {
    document.getElementById("Time_Worst").innerText = "O(N log N)";
    document.getElementById("Time_Average").innerText = "Θ(N log N)";
    document.getElementById("Time_Best").innerText = "Ω(N log N)";
    document.getElementById("Space_Worst").innerText = "O(1)";

    await heap_sort();
    enable_buttons();
}

async function heap_sort() {
    const size = div_sizes.length;

    for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
        incrementIteration(); // 🔵 Count outer iteration
        await max_heapify(size, i);
    }

    for (let i = size - 1; i > 0; i--) {
        incrementIteration(); // 🔵 Count second phase iteration
        await swap(i, 0);
        await updateBarAndValue(i, "green");
        await max_heapify(i, 0);
    }

    await updateBarAndValue(0, "green");
}

async function max_heapify(n, i) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    // 🔵 Comparison when checking left child
    if (l < n) {
        incrementComparison();
        if (div_sizes[l] > div_sizes[largest]) largest = l;
    }

    // 🔵 Comparison when checking right child
    if (r < n) {
        incrementComparison();
        if (div_sizes[r] > div_sizes[largest]) largest = r;
    }

    if (largest !== i) {
        incrementComparison(); // 🔵 Swap condition is a type of comparison too
        await swap(i, largest);
        await max_heapify(n, largest);
    }
}

async function swap(i, j) {
    await updateBarAndValue(i, "red");
    await updateBarAndValue(j, "red");

    let temp = div_sizes[i];
    setHeightAndValue(i, div_sizes[j]);
    setHeightAndValue(j, temp);

    await updateBarAndValue(i, "blue");
    await updateBarAndValue(j, "blue");

    await delay(getDelayTime());
}