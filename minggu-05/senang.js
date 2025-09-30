const daftarProduk = [
  { barcode: 1008, produk: 'Sabun Lifebuoy Total 10' },
  { barcode: 1015, produk: 'Shampo Pantene Anti Dandruff' },
  { barcode: 1023, produk: 'Sikat Gigi Pepsodent' },
  { barcode: 1045, produk: 'Pasta Gigi Colgate MaxFresh' },
  { barcode: 1061, produk: 'Kecap Manis Bango 275ml' },
  { barcode: 1078, produk: 'Saus Sambal ABC' },
  { barcode: 1092, produk: 'Minyak Goreng Sania 2L' },
  { barcode: 1113, produk: 'Teh Celup Sariwangi' },
  { barcode: 1124, produk: 'Kopi Kapal Api Special' },
  { barcode: 1139, produk: 'Gula Pasir Gulaku 1kg' },
  { barcode: 1156, produk: 'Tepung Terigu Segitiga Biru' },
  { barcode: 1177, produk: 'Mie Instan Indomie Goreng' },
  { barcode: 1198, produk: 'Biskuit Roma Kelapa' },
  { barcode: 1219, produk: 'Snack Twisko Jagung Bakar' },
  { barcode: 1234, produk: 'Wafer Tango Cokelat' },
  { barcode: 1251, produk: 'Susu UHT Ultra Milk Cokelat' },
  { barcode: 1266, produk: 'Yogurt Cimory Strawberry' },
  { barcode: 1282, produk: 'Jus Buavita Jambu' },
  { barcode: 1305, produk: 'Air Mineral Aqua 600ml' },
  { barcode: 1321, produk: 'Deterjen Rinso Anti Noda' },
  { barcode: 1344, produk: 'Pewangi Molto Pure' },
  { barcode: 1367, produk: 'Pembersih Lantai Super Pell' },
  { barcode: 1388, produk: 'Sabun Cuci Piring Sunlight' },
  { barcode: 1409, produk: 'Obat Nyamuk Baygon' },
  { barcode: 1423, produk: 'Baterai ABC Alkaline AA' },
  { barcode: 1447, produk: 'Deodoran Rexona Men' },
  { barcode: 1468, produk: 'Parfum Axe Cokelat' },
  { barcode: 1489, produk: 'Sabun Muka Garnier Men' },
  { barcode: 1512, produk: 'Hand Sanitizer Antis' },
  { barcode: 1533, produk: 'Tisu Wajah Paseo' },
  { barcode: 1555, produk: 'Popok Bayi MamyPoko' },
  { barcode: 1578, produk: 'Beras Sania 5kg' },
  { barcode: 1599, produk: 'Telur Ayam Negeri (per kg)' },
  { barcode: 1621, produk: 'Roti Tawar Sari Roti' },
  { barcode: 1645, produk: 'Selai Cokelat Nutella' },
  { barcode: 1666, produk: 'Keju Kraft Cheddar' },
  { barcode: 1687, produk: 'Sarden ABC Tomat' },
  { barcode: 1708, produk: 'Kornet Sapi Pronas' },
  { barcode: 1729, produk: 'Bubur Bayi Sun Pisang' },
  { barcode: 1751, produk: 'Pembalut Charm Body Fit' },
  { barcode: 1774, produk: 'Cokelat SilverQueen' },
  { barcode: 1798, produk: 'Permen Kiss Mint' },
  { barcode: 1823, produk: 'Keripik Kentang Chitato' },
  { barcode: 1845, produk: 'Minuman Soda Coca-Cola' },
  { barcode: 1867, produk: 'Sirup Marjan Cocopandan' },
  { barcode: 1888, produk: 'Es Krim Walls Magnum' },
  { barcode: 1910, produk: 'Sereal Koko Krunch' },
  { barcode: 1932, produk: 'Mentega Blue Band' },
  { barcode: 1956, produk: 'Sambal Terasi Uleg' },
  { barcode: 1999, produk: 'Kopi Sachet Nescafe Classic' }
];

const container = document.getElementById("arrayContainer");
const hasilBox = document.getElementById("hasil");

daftarProduk.forEach((item, idx) => {
  const div = document.createElement("div");
  div.classList.add("array-item");
  div.id = "item-" + idx;
  div.innerHTML = `<div class="barcode">${item.barcode}</div><div class="produk">${item.produk}</div>`;
  container.appendChild(div);
});

function resetTampilan() {
  document.querySelectorAll(".array-item").forEach(el => {
    el.className = "array-item";
  });
  hasilBox.innerHTML = "";
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function cariLinear() {
  resetTampilan();
  const target = parseInt(document.getElementById("barcodeInput").value);
  let langkah = 0;

  for (let i = 0; i < daftarProduk.length; i++) {
    langkah++;
    let el = document.getElementById("item-" + i);
    el.classList.add("checking");
    await sleep(300);

    if (daftarProduk[i].barcode === target) {
      el.classList.remove("checking");
      el.classList.add("found");
      hasilBox.innerHTML = `
        <div class="hasil-box linear">
          ✅ Linear Search menemukan produk: <b>${daftarProduk[i].produk}</b> di indeks ${i} dengan ${langkah} langkah.
        </div>`;
      return { found: true, langkah, produk: daftarProduk[i].produk, index: i };
    } else {
      el.classList.add("fade");
    }
  }
  hasilBox.innerHTML = `
    <div class="hasil-box linear">
      ❌ Produk tidak ditemukan dengan Linear Search (${langkah} langkah).
    </div>`;
  return { found: false, langkah };
}

async function cariBinary() {
  resetTampilan();
  const target = parseInt(document.getElementById("barcodeInput").value);
  let langkah = 0;
  let left = 0, right = daftarProduk.length - 1;

  while (left <= right) {
    langkah++;
    let mid = Math.floor((left + right) / 2);
    let el = document.getElementById("item-" + mid);
    el.classList.add("checking");
    await sleep(400);

    if (daftarProduk[mid].barcode === target) {
      el.classList.remove("checking");
      el.classList.add("found");
      hasilBox.innerHTML = `
        <div class="hasil-box binary">
          ✅ Binary Search menemukan produk: <b>${daftarProduk[mid].produk}</b> di indeks ${mid} dengan ${langkah} langkah.
        </div>`;
      return { found: true, langkah, produk: daftarProduk[mid].produk, index: mid };
    } else if (daftarProduk[mid].barcode < target) {
      for (let i = left; i <= mid; i++) document.getElementById("item-" + i).classList.add("fade");
      left = mid + 1;
    } else {
      for (let i = mid; i <= right; i++) document.getElementById("item-" + i).classList.add("fade");
      right = mid - 1;
    }
  }
  hasilBox.innerHTML = `
    <div class="hasil-box binary">
      ❌ Produk tidak ditemukan dengan Binary Search (${langkah} langkah).
    </div>`;
  return { found: false, langkah };
}

async function bandingkan() {
  resetTampilan();
  const target = parseInt(document.getElementById("barcodeInput").value);

  if (isNaN(target)) {
    hasilBox.innerHTML = "⚠️ Masukkan barcode terlebih dahulu!";
    return;
  }

  let hasilLinear = await cariLinear();
  await sleep(1000);

  let hasilBinary = await cariBinary();
  hasilBox.innerHTML = `
    <div class="hasil-box linear">
      ${hasilLinear.found 
        ? `✅ Linear Search menemukan produk: <b>${hasilLinear.produk}</b> di indeks ${hasilLinear.index} dengan ${hasilLinear.langkah} langkah.` 
        : `❌ Produk tidak ditemukan dengan Linear Search (${hasilLinear.langkah} langkah).`}
    </div>
    <div class="hasil-box binary">
      ${hasilBinary.found 
        ? `✅ Binary Search menemukan produk: <b>${hasilBinary.produk}</b> di indeks ${hasilBinary.index} dengan ${hasilBinary.langkah} langkah.` 
        : `❌ Produk tidak ditemukan dengan Binary Search (${hasilBinary.langkah} langkah).`}
    </div>
  `;
}
