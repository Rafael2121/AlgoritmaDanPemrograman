const kamus = ["apel", "banana", "jeruk", "mangga", "pepaya", "semangka", "stroberi"];
const container = document.getElementById("arrayContainer");
kamus.forEach((item, idx) => {
    const div = document.createElement("div");
    div.classList.add("array-item");
    div.id = "item-" + idx;
    div.innerText = item;
    container.appendChild(div);
});

async function cariKata() {
    const kata = document.getElementById("kataInput").value.toLowerCase();
    const hasilBox = document.getElementById("hasil");


    document.querySelectorAll(".array-item").forEach(el => {
        el.className = "array-item";
    });
    hasilBox.innerHTML = "";

    if (kata === "") {
        hasilBox.innerHTML = "⚠️ Masukkan kata dulu!";
        return;
    }

    let left = 0;
    let right = kamus.length - 1;
    let found = false;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let midEl = document.getElementById("item-" + mid);
        midEl.classList.add("middle");
        await sleep(1000);

        if (kamus[mid] === kata) {
            midEl.classList.remove("middle");
            midEl.classList.add("found");
            hasilBox.innerHTML = `✅ Kata "<b>${kata}</b>" ditemukan di indeks <b>${mid}</b>`;
            found = true;
            break;
        } else if (kamus[mid] < kata) {

            for (let i = left; i <= mid; i++) {
                document.getElementById("item-" + i).classList.add("fade");
            }
            left = mid + 1;
        } else {
           
            for (let i = mid; i <= right; i++) {
                document.getElementById("item-" + i).classList.add("fade");
            }
            right = mid - 1;
        }
        await sleep(500);
    }

    if (!found) {
        hasilBox.innerHTML = `❌ Kata "<b>${kata}</b>" tidak ditemukan dalam kamus.`;
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
