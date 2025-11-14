// =========================
// Utility functions
// =========================

function $(id) {
  return document.getElementById(id);
}

function show(el) {
  el.classList.add("fade-in");
  el.style.display = "block";
}

function hide(el) {
  el.style.display = "none";
}


// =========================
// Hitung BMR
// =========================

function hitungBMR(jk, bb, tb, usia) {
  if (jk === "L") {
    return 88.362 + (13.397 * bb) + (4.799 * tb) - (5.677 * usia);
  } else {
    return 447.593 + (9.247 * bb) + (3.098 * tb) - (4.330 * usia);
  }
}


// =========================
// Aktivitas faktor (bahasa Indonesia)
// =========================

function faktorAktivitas(level) {
  switch (level) {
    case "sangat-rendah": return 1.2;
    case "ringan": return 1.375;
    case "sedang": return 1.55;
    case "tinggi": return 1.725;
    case "sangat-tinggi": return 1.9;
    default: return 1.2;
  }
}


// =========================
// Hitung TDEE
// =========================

function hitungTDEE(bmr, aktivitas) {
  return bmr * faktorAktivitas(aktivitas);
}


// =========================
// Rekomendasi saran makanan
// =========================

function saranMenu(kurangKalori) {
  if (kurangKalori < 120) {
    return [
      "1 buah pisang",
      "Roti gandum 1 slice",
      "Segelas susu rendah lemak"
    ];
  } else if (kurangKalori < 300) {
    return [
      "Nasi + Telur 1 butir",
      "Oat 1 mangkuk + buah",
      "Ayam panggang 80g"
    ];
  } else if (kurangKalori < 500) {
    return [
      "Nasi + ayam 100g + sayur",
      "Ikan panggang 100g + kentang",
      "Tahu tempe + sayur + buah"
    ];
  } else {
    return [
      "Nasi 1 porsi + lauk lengkap",
      "Ayam / ikan 150g + sayur",
      "Snack sehat seperti roti gandum + susu"
    ];
  }
}


// =========================
// Main Calculation
// =========================

function hitungKalori() {

  // ambil input
  const nama = $("nama").value.trim();
  const jk = $("jk").value;
  const usia = parseInt($("usia").value);
  const bb = parseFloat($("bb").value);
  const tb = parseFloat($("tb").value);
  const aktivitas = $("aktivitas").value;
  const kaloriSaatIni = parseInt($("kalori-saat-ini").value);

  // validasi
  if (!nama || !jk || !usia || !bb || !tb || !aktivitas || !kaloriSaatIni) {
    alert("Harap isi semua data dengan lengkap!");
    return;
  }

  // hitung BMR
  const bmr = hitungBMR(jk, bb, tb, usia);

  // hitung TDEE
  const tdee = hitungTDEE(bmr, aktivitas);

  // kekurangan kalori
  const selisih = tdee - kaloriSaatIni;

  // output
  $("hasil-nama").innerText = nama;
  $("hasil-bmr").innerText = Math.round(bmr);
  $("hasil-tdee").innerText = Math.round(tdee);

  if (selisih > 0) {
    $("status-kalori").innerText = "Kalori kamu hari ini masih kurang";
    $("angka-selisih").innerText = Math.round(selisih) + " kkal";
    $("warna-status").style.background = "#F59E0B";
  } else {
    $("status-kalori").innerText = "Kalori sudah terpenuhi ✔";
    $("angka-selisih").innerText = "";
    $("warna-status").style.background = "#16A34A";
  }

  // rekomendasi makanan
  const list = saranMenu(selisih > 0 ? selisih : 0);
  $("saran-makan").innerHTML = list.map(i => `<li>${i}</li>`).join("");

  // tampilkan card hasil
  show($("result-card"));
}


// =========================
// Tombol Reset
// =========================

function resetForm() {
  $("result-card").style.display = "none";
  document.querySelector("form").reset();
}


// =========================
// Event Listener tombol
// =========================

document.addEventListener("DOMContentLoaded", () => {
  const btnHitung = $("btn-hitung");
  const btnReset = $("btn-reset");

  if (btnHitung) {
    btnHitung.addEventListener("click", (e) => {
      e.preventDefault();
      hitungKalori();
    });
  }

  if (btnReset) {
    btnReset.addEventListener("click", (e) => {
      e.preventDefault();
      resetForm();
    });
  }
});
