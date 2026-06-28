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

// 2. Tambah Item
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
    
    div.innerHTML = `
        <label style="font-size: 12px; color: #aaa;">Harga awal di Mall sebelum klik keranjang</label>
        <input type="number" class="harga-input" placeholder="Contoh: 1300" oninput="hitungTotal()">
        <div class="controls-row">
            <select class="durasi-select" onchange="hitungTotal()">
                <option value="1">7 Hari</option>
                <option value="2">30 Hari</option>
                <option value="6">Permanen</option>
            </select>
            <input type="number" class="jumlah-input" placeholder="Jml" min="1" value="1" oninput="hitungTotal()">
            <button class="btn-hapus" onclick="this.parentElement.parentElement.remove(); hitungTotal();">❌</button>
        </div>
    `;
    
    container.appendChild(div);
});

// 3. Fungsi Simpan Riwayat
document.getElementById("simpanRiwayat").addEventListener("click", function() {
    let total = document.getElementById("hasil").innerText;
    if (total === "Total Setelah di rate: Rp 0") {
        alert("⚠️ Tidak ada data untuk disimpan!");
        return;
    }
    
    let riwayatList = document.getElementById("riwayat");
    let entry = document.createElement("p");
    entry.innerText = new Date().toLocaleTimeString() + " - " + total;
    riwayatList.appendChild(entry);
    alert("✅ Berhasil disimpan!");
});

// 4. Fungsi Toggle History
document.getElementById("btnHistory").addEventListener("click", function() {
    let box = document.getElementById("historyBox");
    if (box.style.display === "none" || box.style.display === "") {
        box.style.display = "block";
    } else {
        box.style.display = "none";
    }
});
