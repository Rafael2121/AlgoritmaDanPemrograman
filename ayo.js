function parseInput(str) {
  return str.split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(s => Number(s))
    .filter(n => !Number.isNaN(n));
}
function findTop3(arr) {
  if (arr.length === 0) return [];
  let max1 = -Infinity, max2 = -Infinity, max3 = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    const v = arr[i];
    if (v > max1) {
      max3 = max2;
      max2 = max1;
      max1 = v;
    } else if (v > max2) {
      max3 = max2;
      max2 = v;
    } else if (v > max3) {
      max3 = v;
    }
  }
  const result = [];
  if (max1 !== -Infinity) result.push(max1);
  if (max2 !== -Infinity) result.push(max2);
  if (max3 !== -Infinity) result.push(max3);
  return result;
}
function findTop3Unique(arr) {
  let uniq = [];
  for (let i = 0; i < arr.length; i++) {
    const v = arr[i];
    if (uniq.includes(v)) continue;
    let placed = false;
    for (let j = 0; j < uniq.length; j++) {
      if (v > uniq[j]) {
        uniq.splice(j, 0, v);
        placed = true;
        break;
      }
    }
    if (!placed) uniq.push(v);
    if (uniq.length > 3) uniq.pop();
  }
  return uniq;
}
document.getElementById('btnCompute').addEventListener('click', () => {
  const arr = parseInput(document.getElementById('inputValues').value);
  const top = findTop3(arr);
  const out = document.getElementById('output');
  if (top.length === 0) out.innerHTML = '<i>Tidak ada nilai valid</i>';
  else {
    out.innerHTML = '<div class="rank">Top 3 (boleh duplikat):</div>' +
  '<ol>' + top.map(x => `<li>${x}</li>`).join('') + '</ol>';
  }
});

document.getElementById('btnComputeUnique').addEventListener('click', () => {
  const arr = parseInput(document.getElementById('inputValues').value);
  const top = findTop3Unique(arr);
  const out = document.getElementById('output');
  if (top.length === 0) out.innerHTML = '<i>Tidak ada nilai valid</i>';
  else {
    out.innerHTML = '<div class="rank">Top 3 (nilai unik):</div>' +
     '<ol>' + top.map(x => `<li>${x}</li>`).join('') + '</ol>';
  }
});
