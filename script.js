// 1. Fungsi Hitung Total
window.hitungTotal = function() {
    let totalKeseluruhan = 0;
    let rateInput = document.getElementById("rate").value;
    let rate = parseFloat(rateInput) / 100 || 0;

    document.querySelectorAll(".item-container").forEach(div => {
        let h = parseFloat(div.querySelector(".harga-input").value) || 0;
        let dVal = parseFloat(div.querySelector(".durasi-select").value); 
        let jml = parseInt(div.querySelector(".jumlah-input").value) || 1;

        let subtotal = (h * dVal) * jml;
        totalKeseluruhan += (subtotal * rate);
    });
    
    document.getElementById("hasil").innerText = "Total Setelah di rate: Rp " + Math.round(totalKeseluruhan).toLocaleString('id-ID');
};

// 2. Tambah Item (dengan validasi Rate)
document.getElementById("btnTambah").addEventListener("click", function() {
    let rateInput = document.getElementById("rate").value;
    if (!rateInput || parseFloat(rateInput) <= 0) {
        alert("⚠️ Mohon isi Rate (%) terlebih dahulu!");
        document.getElementById("rate").focus();
        return;
    }

    let container = document.getElementById("items");
    let div = document.createElement("div");
    div.className = "item-container";
    div.style.cssText = "display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; padding: 15px; border: 1px solid #333; border-radius: 8px;";
    
    div.innerHTML = `
        <input type="number" class="harga-input" placeholder="Harga awal di Mall sebelum klik keranjang" style="padding: 8px;" oninput="hitungTotal()">
        <div class="controls-row" style="display: flex; gap: 10px; align-items: center; justify-content: space-between;">
            <select class="durasi-select" style="flex: 2; padding: 8px;" onchange="hitungTotal()">
                <option value="1">7 Hari</option>
                <option value="2">30 Hari</option>
                <option value="6">Permanen</option>
            </select>
            <input type="number" class="jumlah-input" placeholder="Jumlah" style="flex: 1; padding: 8px; min-width: 60px;" min="1" value="1" oninput="hitungTotal()">
            <button onclick="this.parentElement.parentElement.remove(); hitungTotal();" style="background: none; border: none; cursor: pointer; font-size: 18px;">❌</button>
        </div>
    `;
    container.appendChild(div);
});

// 3. Simpan Riwayat
document.getElementById("simpanRiwayat").addEventListener("click", function() {
    let items = document.querySelectorAll(".item-container");
    if (items.length === 0) return alert("Tambahkan item!");
    
    let detailItems = [];
    let rate = parseFloat(document.getElementById("rate").value) / 100 || 0;
    
    items.forEach(div => {
        let h = parseFloat(div.querySelector(".harga-input").value) || 0;
        let dSelect = div.querySelector(".durasi-select");
        let namaDurasi = dSelect.options[dSelect.selectedIndex].text;
        let dVal = parseFloat(dSelect.value);
        let jml = parseInt(div.querySelector(".jumlah-input").value) || 1;
        
        let subtotal = (h * dVal) * jml;
        let hasil = subtotal * rate;
        detailItems.push(`${h} (${namaDurasi}) x ${jml} -> ${Math.round(hasil)}`);
    });

    let totalTeks = document.getElementById("hasil").innerText;
    let waktu = new Date().toLocaleDateString('id-ID');
    let entri = `📅 ${waktu}\n${detailItems.join("\n")}\n💸 ${totalTeks}`;
    
    let data = JSON.parse(localStorage.getItem("riwayat") || "[]");
    data.push(entri);
    localStorage.setItem("riwayat", JSON.stringify(data));
    window.tampilkanRiwayat();
    alert("Berhasil disimpan!");
});

// 4. Tampilkan Riwayat
window.tampilkanRiwayat = function() {
    let list = document.getElementById("riwayat");
    if(!list) return;
    list.innerHTML = "";
    JSON.parse(localStorage.getItem("riwayat") || "[]").forEach((item, i) => {
        let div = document.createElement("div");
        div.innerHTML = `<pre style="white-space: pre-line; border-bottom: 1px solid #444; padding-bottom: 5px;">${item}</pre><button onclick="salinRiwayat(${i})">Salin</button> <button onclick="hapusRiwayat(${i})">Hapus</button>`;
        list.appendChild(div);
    });
};

window.salinRiwayat = (i) => { 
    navigator.clipboard.writeText(JSON.parse(localStorage.getItem("riwayat"))[i]).then(() => alert("Disalin!")); 
};

window.hapusRiwayat = (i) => {
    let data = JSON.parse(localStorage.getItem("riwayat"));
    data.splice(i, 1);
    localStorage.setItem("riwayat", JSON.stringify(data));
    window.tampilkanRiwayat();
};

document.getElementById("btnHistory").addEventListener("click", () => {
    let box = document.getElementById("historyBox");
    box.style.display = box.style.display === "none" ? "block" : "none";
    if (box.style.display === "block") window.tampilkanRiwayat();
});
