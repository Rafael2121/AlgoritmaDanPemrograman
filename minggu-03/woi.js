class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(item) { this.items.push(item); }
  dequeue() { return this.isEmpty() ? null : this.items.shift(); }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
}

let antrianLoket = new Queue();
let nomorUrut = 1;
let riwayat = [];

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString("id-ID");
  document.getElementById("clock").textContent = time;
}
setInterval(updateClock, 1000);

function updateDaftarAntrian() {
  const daftar = document.getElementById("daftarAntrian");
  document.getElementById("jumlahAntrian").textContent = antrianLoket.size();
  if (antrianLoket.isEmpty()) {
    daftar.innerHTML = "Belum ada antrian";
  } else {
    daftar.innerHTML = antrianLoket.items
      .map((item, i) => `${i + 1}. ${item.nama} (No.${item.noUrut}, Masuk: ${item.waktu})`)
      .join("<br>");
  }
}

function updateStatus(teks) {
  document.getElementById("status").innerHTML = teks;
}

function tambahAntrian() {
  const input = document.getElementById("namaInput");
  const nama = input.value.trim();
  if (nama) {
    const waktu = new Date().toLocaleTimeString("id-ID");
    let data = { noUrut: nomorUrut, nama: nama, waktu: waktu };
    antrianLoket.enqueue(data);
    updateDaftarAntrian();
    updateStatus(`✅ No.${nomorUrut} (${nama}) masuk ke antrian pada jam ${waktu}.`);
    nomorUrut++;
    input.value = "";
  } else {
    updateStatus("⚠️ Masukkan nama terlebih dahulu!");
  }
}

function layaniAntrian() {
  if (!antrianLoket.isEmpty()) {
    const orang = antrianLoket.dequeue();
    updateDaftarAntrian();
    updateStatus(` Sedang melayani: No.${orang.noUrut} (${orang.nama}), datang pada jam ${orang.waktu}.`);
    riwayat.push(orang);
    updateRiwayat();
  } else {
    updateStatus("⚠️ Tidak ada antrian untuk dilayani.");
  }
}

function resetAntrian() {
  antrianLoket = new Queue();
  nomorUrut = 1;
  updateDaftarAntrian();
  updateStatus("♻️ Antrian telah direset.");
}

function updateRiwayat() {
  const rDiv = document.getElementById("riwayat");
  if (riwayat.length === 0) {
    rDiv.innerHTML = "Belum ada";
  } else {
    rDiv.innerHTML = riwayat
      .map((item, i) => `${i + 1}. ${item.nama} (No.${item.noUrut}) selesai dilayani`)
      .join("<br>");
  }
}
