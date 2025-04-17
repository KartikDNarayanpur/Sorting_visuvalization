async function Selection_sort() {
    document.getElementById("Time_Worst").innerText = "O(N^2)";
    document.getElementById("Time_Average").innerText = "Θ(N^2)";
    document.getElementById("Time_Best").innerText = "Ω(N^2)";
    document.getElementById("Space_Worst").innerText = "O(1)";

    const n = div_sizes.length;

    for (let i = 0; i < n - 1; i++) {
        incrementIteration(); // 🔵 Added here to count each outer loop pass

        await updateBarAndValue(i, "red");

        let index_min = i;

        for (let j = i + 1; j < n; j++) {
            incrementComparison(); // 🔵 Added here to count each comparison

            await updateBarAndValue(j, "yellow");

            if (div_sizes[j] < div_sizes[index_min]) {
                if (index_min !== i) {
                    await updateBarAndValue(index_min, "blue");
                }
                index_min = j;
                await updateBarAndValue(index_min, "red");
            } else {
                await updateBarAndValue(j, "blue");
            }
        }

        if (index_min !== i) {
            let temp = div_sizes[index_min];
            setHeightAndValue(index_min, div_sizes[i]);
            setHeightAndValue(i, temp);
        }

        await updateBarAndValue(i, "green");
    }

    await updateBarAndValue(n - 1, "green");

    enable_buttons();
}