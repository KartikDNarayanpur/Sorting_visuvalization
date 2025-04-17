async function Bubble() {
    document.getElementById("Time_Worst").innerText = "O(N^2)";
document.getElementById("Time_Average").innerText = "Θ(N^2)";
document.getElementById("Time_Best").innerText = "Ω(N)";
document.getElementById("Space_Worst").innerText = "O(1)";
    for (let i = 0; i < div_sizes.length - 1; i++) {
        incrementIteration();
        for (let j = 0; j < div_sizes.length - i - 1; j++) {
            incrementComparison();
            await updateBarAndValue(j, "yellow");
            await updateBarAndValue(j + 1, "yellow");

            if (div_sizes[j] > div_sizes[j + 1]) {
                // Swap values
                let temp = div_sizes[j];
                setHeightAndValue(j, div_sizes[j + 1]);
                setHeightAndValue(j + 1, temp);
            }

            await updateBarAndValue(j, "blue");
            await updateBarAndValue(j + 1, "blue");
        }
        divs[div_sizes.length - i - 1].style.backgroundColor = "green";
        document.querySelectorAll(".array-value")[div_sizes.length - i - 1].style.color = "green";
    }
    divs[0].style.backgroundColor = "green";
    document.querySelectorAll(".array-value")[0].style.color = "green";

    enable_buttons();
}