(function() {
  const input = document.getElementById('angka');
  const btn = document.getElementById('btnCek');
  const hasil = document.getElementById('hasil');

  btn.addEventListener('click', function() {
    const nilai = input.value;

    if (nilai === '') {
      tampilkanHasil('⚠️ Silakan masukkan bilangan terlebih dahulu.', 'orange');
      return;
    }

    const angka = Number(nilai);

    if (!Number.isInteger(angka)) {
      tampilkanHasil('⚠️ Masukkan bilangan bulat (integer).', 'red');
      return;
    }

    if (angka % 2 === 0) {
      tampilkanHasil(`${angka} adalah bilangan GENAP ✅`, 'cyan');
    } else {
      tampilkanHasil(`${angka} adalah bilangan GANJIL 🔹`, 'magenta');
    }
  });

  function tampilkanHasil(teks, warna) {
    hasil.textContent = teks;
    hasil.style.color = warna;

    
    hasil.style.animation = "none";
    hasil.offsetHeight;
    hasil.style.animation = "showResult 0.6s forwards";
  }
})();
