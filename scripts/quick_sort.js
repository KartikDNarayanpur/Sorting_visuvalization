async function Quick() {
    document.getElementById("Time_Worst").innerText = "O(N^2)";
    document.getElementById("Time_Average").innerText = "Θ(N log N)";
    document.getElementById("Time_Best").innerText = "Ω(N log N)";
    document.getElementById("Space_Worst").innerText = "O(log N)";

    await quick_sort(0, div_sizes.length - 1);
    enable_buttons();
}

async function quick_sort(start, end) {
    if (start < end) {
        incrementIteration(); // 🔵 Count each recursive quick_sort call

        let pivot_pos = await quick_partition(start, end);
        await quick_sort(start, pivot_pos - 1);
        await quick_sort(pivot_pos + 1, end);
    }
}

async function quick_partition(start, end) {
    let i = start + 1;
    let pivot = div_sizes[start];
    await updateBarAndValue(start, "yellow");

    for (let j = start + 1; j <= end; j++) {
        incrementComparison(); // 🔵 Each time div_sizes[j] < pivot is checked

        if (div_sizes[j] < pivot) {
            await updateBarAndValue(j, "yellow");
            await updateBarAndValue(i, "red");
            await updateBarAndValue(j, "red");

            let temp = div_sizes[i];
            setHeightAndValue(i, div_sizes[j]);
            setHeightAndValue(j, temp);

            await updateBarAndValue(i, "blue");
            await updateBarAndValue(j, "blue");

            i++;
        }
    }

    await updateBarAndValue(start, "red");
    await updateBarAndValue(i - 1, "red");

    let temp = div_sizes[start];
    setHeightAndValue(start, div_sizes[i - 1]);
    setHeightAndValue(i - 1, temp);

    for (let t = start; t <= i; t++) {
        await updateBarAndValue(t, "green");
    }

    return i - 1;
}