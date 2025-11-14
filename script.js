document.getElementById("formKalori").addEventListener("submit", function(e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const usia = parseInt(document.getElementById("usia").value);
    const kelamin = document.getElementById("kelamin").value;
    const aktivitas = document.getElementById("aktivitas").value;

    const karbo = parseFloat(document.getElementById("karbo").value);
    const protein = parseFloat(document.getElementById("protein").value);
    const lemak = parseFloat(document.getElementById("lemak").value);

    // Menghitung kalori makanan
    const kalori = (karbo * 4) + (protein * 4) + (lemak * 9);

    // Menghitung BMR
    let BMR;
    if (kelamin === "pria") {
        BMR = 88.36 + (13.4 * 60) + (4.8 * 170) - (5.7 * usia);
    } else {
        BMR = 447.6 + (9.2 * 55) + (3.1 * 160) - (4.3 * usia);
    }

    // Faktor aktivitas
    let faktor;
    if (aktivitas === "sangat-rendah") faktor = 1.2;
    if (aktivitas === "rendah") faktor = 1.375;
    if (aktivitas === "sedang") faktor = 1.55;
    if (aktivitas === "tinggi") faktor = 1.725;
    if (aktivitas === "sangat-tinggi") faktor = 1.9;

    const kebutuhanKalori = BMR * faktor;

    // Evaluasi hasil
    let evaluasi = "";
    if (kalori < kebutuhanKalori * 0.9) {
        evaluasi = "Kamu kekurangan kalori.";
    } else if (kalori > kebutuhanKalori * 1.1) {
        evaluasi = "Kamu kelebihan kalori.";
    } else {
        evaluasi = "Sudah sesuai kebutuhan kalori.";
    }

    // Tampilkan hasil
    document.getElementById("hasil").innerHTML = `
        <h3>Hasil Perhitungan</h3>
        Halo <b>${nama}</b>! <br><br>
        Kalori makanan: <b>${kalori.toFixed(1)} kkal</b><br>
        Kebutuhan harian: <b>${kebutuhanKalori.toFixed(1)} kkal</b><br><br>
        <b>${evaluasi}</b>
    `;

    // Grafik
    buatGrafik(karbo, protein, lemak);
});

// Grafik pie chart
function buatGrafik(karbo, protein, lemak) {
    const ctx = document.getElementById("grafik").getContext("2d");

    if (window.grafikKalori) {
        window.grafikKalori.destroy();
    }

    window.grafikKalori = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Karbohidrat", "Protein", "Lemak"],
            datasets: [{
                data: [karbo, protein, lemak],
                backgroundColor: ["#2196f3", "#4caf50", "#ffeb3b"]
            }]
        }
    });
}
