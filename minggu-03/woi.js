class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.shift();
  }

  front() {
    if (this.isEmpty()) return null;
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}
let antrianLoket = new Queue();
let nomorUrut = 1;
function updateDaftarAntrian() {
  const daftar = document.getElementById("daftarAntrian");
  if (antrianLoket.isEmpty()) {
    daftar.innerHTML = "Belum ada antrian";
  } else {
    daftar.innerHTML = antrianLoket.items.join("<br>");
  }
}
function updateStatus(teks) {
  document.getElementById("status").innerHTML = teks;
}
function tambahAntrian() {
  const input = document.getElementById("namaInput");
  const nama = input.value.trim();
  if (nama) {
    let data = `No.${nomorUrut} ${nama}`;
    antrianLoket.enqueue(data);
    updateDaftarAntrian();
    updateStatus(`${data} masuk ke antrian.`);
    nomorUrut++; 
    input.value = "";
  } else {
    updateStatus("Masukkan nama terlebih dahulu!");
  }
}
function layaniAntrian() {
  if (!antrianLoket.isEmpty()) {
    const orang = antrianLoket.dequeue();
    updateDaftarAntrian();
    updateStatus(`${orang} sedang diproses.`);
  } else {
    updateStatus("Tidak ada antrian untuk dilayani.");
  }
}
