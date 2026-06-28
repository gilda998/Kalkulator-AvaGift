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

