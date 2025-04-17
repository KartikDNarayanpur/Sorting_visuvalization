async function Merge() {
    document.getElementById("Time_Worst").innerText = "O(N log N)";
    document.getElementById("Time_Average").innerText = "Θ(N log N)";
    document.getElementById("Time_Best").innerText = "Ω(N log N)";
    document.getElementById("Space_Worst").innerText = "O(N)";

    await merge_partition(0, div_sizes.length - 1);
    enable_buttons();
}

async function merge_partition(start, end) {
    if (start < end) {
        incrementIteration(); // 🔵 Count partitioning step

        let mid = Math.floor((start + end) / 2);
        await updateBarAndValue(mid, "yellow");

        await merge_partition(start, mid);
        await merge_partition(mid + 1, end);

        await merge_sort(start, mid, end);
    }
}

async function merge_sort(start, mid, end) {
    let p = start, q = mid + 1;
    let Arr = [], k = 0;

    while (p <= mid && q <= end) {
        incrementComparison(); // 🔵 Comparing left and right side elements

        if (div_sizes[p] < div_sizes[q]) {
            Arr[k++] = div_sizes[p];
            await updateBarAndValue(p++, "red");
        } else {
            Arr[k++] = div_sizes[q];
            await updateBarAndValue(q++, "red");
        }
    }

    while (p <= mid) {
        Arr[k++] = div_sizes[p];
        await updateBarAndValue(p++, "red");
    }

    while (q <= end) {
        Arr[k++] = div_sizes[q];
        await updateBarAndValue(q++, "red");
    }

    for (let t = 0; t < k; t++) {
        setHeightAndValue(start + t, Arr[t]);
        await updateBarAndValue(start + t, "green");
    }
}