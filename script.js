const hargaTetap = [8600, 21400]; 

// 1. Fungsi Hitung Total
window.hitungTotal = function() {
    let total = 0;
    let rate = parseFloat(document.getElementById("rate").value) / 100 || 0;

    document.querySelectorAll("#items > div").forEach(div => {
        let h = parseFloat(div.querySelector(".item-input").value) || 0;
        let dVal = parseInt(div.querySelector(".durasi-select").value) || 1;

        if (hargaTetap.includes(h)) {
            total += (h * rate);
        } else {
            total += (h * dVal * rate);
        }
    });
    
    document.getElementById("hasil").innerText = "Total: Rp " + Math.round(total).toLocaleString('id-ID');
};

// 2. Tambah Item
document.getElementById("btnTambah").addEventListener("click", function() {
    let div = document.createElement("div");
    div.innerHTML = `
        <input type="number" class="item-input" placeholder="Harga" oninput="hitungTotal()">
        <select class="durasi-select" onchange="hitungTotal()">
            <option value="1">7 Hari</option>
            <option value="2">30 Hari</option>
            <option value="6">Permanen</option>
        </select>
        <button onclick="this.parentElement.remove(); hitungTotal();">❌</button>
    `;
    document.getElementById("items").appendChild(div);
});

// 3. Simpan Riwayat
document.getElementById("simpanRiwayat").addEventListener("click", function() {
    let items = document.querySelectorAll("#items > div");
    if (items.length === 0) return alert("Tambahkan item!");
    
    let detailItems = [];
    let rate = parseFloat(document.getElementById("rate").value) / 100 || 0;
    
    items.forEach(div => {
        let h = parseFloat(div.querySelector(".item-input").value) || 0;
        let dSelect = div.querySelector(".durasi-select");
        let namaDurasi = dSelect.options[dSelect.selectedIndex].text;
        let dVal = parseInt(dSelect.value);
        let hasil = hargaTetap.includes(h) ? (h * rate) : (h * dVal * rate);
        detailItems.push(`${h} (${namaDurasi}) -> ${Math.round(hasil)}`);
    });

    let totalTeks = document.getElementById("hasil").innerText;
    let waktu = new Date().toLocaleDateString('id-ID');
    let entri = `📅 ${waktu}\n${detailItems.join("\n")}\n💸 ${totalTeks}`;
    
    let data = JSON.parse(localStorage.getItem("riwayat") || "[]");
    data.push(entri);
    localStorage.setItem("riwayat", JSON.stringify(data));
    
    window.tampilkanRiwayat(); // Memastikan riwayat diperbarui
    alert("Berhasil disimpan!");
});

// 4. Tampilkan Riwayat
window.tampilkanRiwayat = function() {
    let list = document.getElementById("riwayat");
    list.innerHTML = "";
    let data = JSON.parse(localStorage.getItem("riwayat") || "[]");
    data.forEach((item, i) => {
        let div = document.createElement("div");
        div.className = "riwayat-item";
        div.style.marginBottom = "10px";
        div.style.padding = "10px";
        div.style.border = "1px solid #555";
        div.innerHTML = `<pre style="white-space: pre-line; margin: 0;">${item}</pre>
                         <button onclick="salinRiwayat(${i})">Salin</button>
                         <button onclick="hapusRiwayat(${i})">Hapus</button>`;
        list.appendChild(div);
    });
};

// 5. Fitur Salin & Hapus
window.salinRiwayat = function(i) {
    let data = JSON.parse(localStorage.getItem("riwayat"));
    navigator.clipboard.writeText(data[i]).then(() => alert("Disalin!"));
};

window.hapusRiwayat = function(i) {
    let data = JSON.parse(localStorage.getItem("riwayat"));
    data.splice(i, 1);
    localStorage.setItem("riwayat", JSON.stringify(data));
    window.tampilkanRiwayat();
};

// 6. History Toggle
document.getElementById("btnHistory").addEventListener("click", () => {
    let box = document.getElementById("historyBox");
    box.style.display = box.style.display === "none" ? "block" : "none";
    if (box.style.display === "block") window.tampilkanRiwayat();
});


