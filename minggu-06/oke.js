const mahasiswa = [
  { nama: 'Yanto', nilai: 75 },
  { nama: 'Siti', nilai: 92 },
  { nama: 'Supri', nilai: 81 },
  { nama: 'Jamilah', nilai: 88 },
  { nama: 'Mamat', nilai: 70 },
  { nama: 'Silvi', nilai: 95 },
  { nama: 'Gogon', nilai: 60 },
  { nama: 'Rusti', nilai: 78 }
];

const container = document.getElementById("arrayContainer");
const hasilBox = document.getElementById("hasil");

function tampilkanData(arr) {
  container.innerHTML = "";
  arr.forEach((mhs, i) => {
    const div = document.createElement("div");
    div.classList.add("box");
    div.style.setProperty("--pos", i);
    div.innerHTML = `
      <span class="nama">${mhs.nama}</span>
      <span class="nilai">${mhs.nilai}</span>
    `;
    container.appendChild(div);
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort(arr, ascending = true) {
  tampilkanData(arr);
  const boxes = () => document.querySelectorAll(".box");
  let n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      const allBoxes = boxes();
      const boxA = allBoxes[j];
      const boxB = allBoxes[j + 1];

      boxA.classList.add("active");
      boxB.classList.add("active");

      await sleep(500);

      const condition = ascending
        ? arr[j].nilai > arr[j + 1].nilai
        : arr[j].nilai < arr[j + 1].nilai;

      if (condition) {
      
        boxA.style.transform = "translateX(120px)";
        boxB.style.transform = "translateX(-120px)";
        boxA.classList.add("swap");
        boxB.classList.add("swap");
        await sleep(600);

        
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        
        tampilkanData(arr);
        await sleep(300);
        swapped = true;
      }

      boxA.classList.remove("active");
      boxB.classList.remove("active");
      boxA.style.transform = "translateX(0)";
      boxB.style.transform = "translateX(0)";
    }

    if (!swapped) break;
  }

  const finalBoxes = boxes();
  finalBoxes.forEach((b, index) => {
    setTimeout(() => {
      b.classList.add("sorted");
    }, index * 150);
  });

  hasilBox.textContent = ascending
    ? "✅ Data berhasil diurutkan dari TERKECIL ke TERBESAR!"
    : "✅ Data berhasil diurutkan dari TERBESAR ke TERKECIL!";
}

document.getElementById("btnAsc").addEventListener("click", () => {
  tampilkanData([...mahasiswa]);
  bubbleSort([...mahasiswa], true);
});

document.getElementById("btnDesc").addEventListener("click", () => {
  tampilkanData([...mahasiswa]);
  bubbleSort([...mahasiswa], false);
});

tampilkanData(mahasiswa);

