
import { useState } from 'react';
import './DiskonKonsonan.css';

function DiskonKonsonan() {
  const [harga, setHarga] = useState('');
  const [nama, setNama] = useState('');
  const [hasil, setHasil] = useState(null);

  const handleHitung = (e) => {
    e.preventDefault();

    if (!nama.trim() || harga === '' || Number(harga) <= 0) {
      alert('Masukkan nama pelanggan dan total harga yang valid!');
      return;
    }

    // Menghitung jumlah huruf konsonan
    const huruf = nama.toLowerCase().match(/[a-z]/g) || [];
    const konsonan = huruf.filter(
      (huruf) => !'aeiou'.includes(huruf)
    ).length;

    // Menghitung jumlah kata
    const jumlahKata = nama.trim().split(/\s+/).length;

    // Diskon konsonan 2% per huruf
    let diskon = konsonan * 2;

    // Bonus 5% jika nama lebih dari 2 kata
    if (jumlahKata > 2) {
      diskon += 5;
    }

    // Diskon maksimal 20%
    diskon = Math.min(diskon, 20);

    const totalHarga = Number(harga);
    const potongan = totalHarga * diskon / 100;
    const hargaAkhir = totalHarga - potongan;

    setHasil({
      konsonan,
      jumlahKata,
      diskon,
      potongan,
      hargaAkhir
    });
  };

  const formatRupiah = (angka) =>
    angka.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    });

  return (
    <div className="konsonan-container">
      <h2>Program Diskon Huruf Konsonan</h2>

      <form onSubmit={handleHitung}>
        <label>Total Harga Pembelian (Rp)</label>
        <input
          type="number"
          min="1"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          placeholder="Masukkan total harga"
          required
        />

        <label>Nama Pelanggan</label>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Masukkan nama pelanggan"
          required
        />

        <button type="submit">Hitung Diskon</button>
      </form>

      {hasil && (
        <div className="konsonan-result">
          <h3>Hasil Perhitungan</h3>
          <p>Jumlah Huruf Konsonan: {hasil.konsonan}</p>
          <p>Jumlah Kata: {hasil.jumlahKata}</p>
          <p>Persentase Diskon: {hasil.diskon}%</p>
          <p>Total Potongan Harga: {formatRupiah(hasil.potongan)}</p>
          <p>
            <strong>
              Harga Setelah Diskon: {formatRupiah(hasil.hargaAkhir)}
            </strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default DiskonKonsonan;
