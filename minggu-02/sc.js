function balikkan() {
  let kata = document.getElementById("inputKata").value;
  let hasil = kata.split("").reverse().join("");

  let hasilBox = document.getElementById("hasil");
  hasilBox.textContent = hasil;

  // Restart animasi setiap kali tombol ditekan
  hasilBox.style.animation = "none";
  hasilBox.offsetHeight; // trigger reflow
  hasilBox.style.animation = "showResult 0.6s forwards";
}
