async function Insertion() {
    document.getElementById("Time_Worst").innerText = "O(N^2)";
    document.getElementById("Time_Average").innerText = "Θ(N^2)";
    document.getElementById("Time_Best").innerText = "Ω(N)";
    document.getElementById("Space_Worst").innerText = "O(1)";

    for (let j = 0; j < div_sizes.length; j++) {
        incrementIteration(); // 🔵 Added here
        await updateBarAndValue(j, "yellow");

        let key = div_sizes[j];
        let i = j - 1;

        while (i >= 0) {
            incrementComparison(); // 🔵 Each time comparing inside while

            if (div_sizes[i] > key) {
                await updateBarAndValue(i, "red");
                await updateBarAndValue(i + 1, "red");

                setHeightAndValue(i + 1, div_sizes[i]);

                await updateBarAndValue(i, "blue");
                await updateBarAndValue(i + 1, i === j - 1 ? "yellow" : "blue");

                i--;
            } else {
                break; // important: stop when no more shifting
            }
        }

        setHeightAndValue(i + 1, key);

        for (let t = 0; t <= j; t++) {
            divs[t].style.backgroundColor = "green";
            // document.querySelectorAll(".array-value")[t].style.color = "green"; // ❌ can comment this since no numbers now
        }

        await delay(getDelayTime());
    }

    enable_buttons();
}