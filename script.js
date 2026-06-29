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
                <option value="1b">12 Jam–VIP room/SVIP</option>
                <option value="1c">30 Hari–Platform/Unicorn/PMP</option>
                <option value="2a">30 Hari–Ava/Extra Item/Gitar/Move</option>
                <option value="2b">90 Hari</option>
                <option value="6a">365 Hari–Mascot/DJ/PMP</option>
                <option value="6b">Permanen</option>
            </select>
            <input type="number" class="jumlah-input" placeholder="Jumlah" min="1" value="1" oninput="hitungTotal()">
            <button class="btn-hapus" onclick="this.parentElement.parentElement.remove(); hitungTotal();">❌</button>
        </div>
    `;
    
    container.appendChild(div);
});

// // 3. Fungsi Simpan Riwayat
document.getElementById("simpanRiwayat").addEventListener("click", function() {
    let items = document.querySelectorAll(".item-container");
    if (items.length === 0) { alert("⚠️ Tidak ada item!"); return; }

    let riwayatList = document.getElementById("riwayat");
    let wrapper = document.createElement("div");
    wrapper.className = "riwayat-wrapper"; // class untuk identifikasi
    wrapper.style.cssText = "background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 12px; margin-bottom: 15px; border: 1px solid #4a6fa5;";
    
    let dateStr = new Date().toLocaleDateString('id-ID');
    
    let totalKeseluruhan = 0;
    let listDetail = "";

    items.forEach(div => {
        let h = div.querySelector(".harga-input").value;
        let dSelect = div.querySelector(".durasi-select");
        let dText = dSelect.options[dSelect.selectedIndex].text;
        let dVal = parseFloat(dSelect.value);
        let jml = div.querySelector(".jumlah-input").value;
        let subtotal = Math.round((h * dVal * jml) * (parseFloat(document.getElementById("rate").value)/100));
        totalKeseluruhan += subtotal;

        listDetail += `${h} (${dText}) x ${jml} -> ${subtotal.toLocaleString('id-ID')}\n`;
    });

    // Struktur HTML dengan class yang jelas
    wrapper.innerHTML = `
        <div class="riwayat-date" style="font-size: 11px; color: #89c2d9; margin-bottom: 5px;">📅 ${dateStr}</div>
        <pre class="riwayat-text" style="font-family: sans-serif; font-size: 13px; margin: 5px 0; color: #e0e6ed;">${listDetail}</pre>
        <div class="riwayat-total" style="font-weight: bold; border-top: 1px solid #4a6fa5; padding-top: 5px; color: #fff;">💸 Total: Rp ${totalKeseluruhan.toLocaleString('id-ID')}</div>
        <div style="margin-top: 10px; display: flex; gap: 5px;">
            <button onclick="this.closest('.riwayat-wrapper').remove()" style="background:#555; color:white; border:none; padding:5px 10px; border-radius:5px;">Hapus</button>
            <button onclick="salinRiwayat(this.closest('.riwayat-wrapper'))" style="background:#4a6fa5; color:white; border:none; padding:5px 10px; border-radius:5px;">Salin</button>
        </div>
    `;

    riwayatList.prepend(wrapper);
    document.getElementById("historyBox").style.display = "block";
});

// Fungsi Salin yang sangat akurat
window.salinRiwayat = function(el) {
    let date = el.querySelector(".riwayat-date").innerText;
    let text = el.querySelector(".riwayat-text").innerText;
    let total = el.querySelector(".riwayat-total").innerText;
    
    // Menggabungkan hanya bagian yang diinginkan
    let hasilSalin = `${date}\n\n${text}${total}`;
    
    navigator.clipboard.writeText(hasilSalin).then(() => alert("✅ Disalin!"));
};

// 4. Fungsi Toggle History
document.getElementById("btnHistory").addEventListener("click", function() {
    let box = document.getElementById("historyBox");
    box.style.display = (box.style.display === "none" || box.style.display === "") ? "block" : "none";
});
