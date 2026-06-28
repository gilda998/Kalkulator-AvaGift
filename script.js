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
            <input type="number" class="jumlah-input" placeholder="Jumlah" min="1" value="1" oninput="hitungTotal()">
            <button class="btn-hapus" onclick="this.parentElement.parentElement.remove(); hitungTotal();">❌</button>
        </div>
    `;
    
    container.appendChild(div);
});

// 3. Fungsi Simpan Riwayat
document.getElementById("simpanRiwayat").addEventListener("click", function() {
    let items = document.querySelectorAll(".item-container");
    if (items.length === 0) { alert("⚠️ Tidak ada item untuk disimpan!"); return; }

    let riwayatList = document.getElementById("riwayat");
    let wrapper = document.createElement("div");
    wrapper.style.cssText = "background: rgba(60, 60, 90, 0.4); padding: 15px; border-radius: 12px; margin-bottom: 15px; border: 1px solid #6c5ce7; position: relative;";
    
    let date = new Date();
    let dateStr = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    wrapper.innerHTML = `<div style="font-size: 12px; color: #ff99cc; margin-bottom: 10px;">📅 ${dateStr}</div>`;

    let rate = parseFloat(document.getElementById("rate").value) / 100;
    let totalKeseluruhan = 0;

    items.forEach(div => {
        let h = div.querySelector(".harga-input").value;
        let dSelect = div.querySelector(".durasi-select");
        let dText = dSelect.options[dSelect.selectedIndex].text;
        let dVal = parseFloat(dSelect.value);
        let jml = div.querySelector(".jumlah-input").value;
        let subtotal = Math.round((h * dVal * jml) * rate);
        totalKeseluruhan += subtotal;

        let p = document.createElement("p");
        p.style.margin = "5px 0";
        p.innerText = `${h} (${dText}) -> ${subtotal.toLocaleString('id-ID')}`;
        wrapper.appendChild(p);
    });

    let totalP = document.createElement("p");
    totalP.style.fontWeight = "bold";
    totalP.style.marginTop = "10px";
    totalP.innerText = `💸 Total: Rp ${totalKeseluruhan.toLocaleString('id-ID')}`;
    wrapper.appendChild(totalP);

    let btnGroup = document.createElement("div");
    btnGroup.innerHTML = `
        <button class="btn-sm" onclick="this.parentElement.parentElement.remove()">Hapus</button>
        <button class="btn-sm" onclick="salinRiwayat(this.parentElement.parentElement)">Salin</button>
    `;
    wrapper.appendChild(btnGroup);

    riwayatList.prepend(wrapper);
});

// Fungsi Salin
window.salinRiwayat = function(el) {
    let text = el.innerText.replace("HapusSalin", "");
    navigator.clipboard.writeText(text).then(() => alert("✅ Disalin!"));
};

// 4. Fungsi Toggle History
document.getElementById("btnHistory").addEventListener("click", function() {
    let box = document.getElementById("historyBox");
    box.style.display = (box.style.display === "none" || box.style.display === "") ? "block" : "none";
});
