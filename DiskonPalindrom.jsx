
import { useState } from 'react';
import './DiskonPalindrom.css';

function DiskonPalindrom() {
  const [harga, setHarga] = useState('');
  const [nama, setNama] = useState('');
  const [hasil, setHasil] = useState(null);

  const handleCek = (e) => {
    e.preventDefault();

    if (!nama.trim() || harga === '' || Number(harga) <= 0) {
      alert('Masukkan nama pelanggan dan total harga yang valid!');
      return;
    }

    // Mengabaikan spasi dan huruf besar/kecil
    const namaBersih = nama.toLowerCase().replace(/\s/g, '');

    // Menghitung karakter unik
    const karakterUnik = new Set(namaBersih).size;

    // Memeriksa palindrom
    const namaTerbalik = namaBersih.split('').reverse().join('');
    const isPalindrom =
      namaBersih.length >= 3 && namaBersih === namaTerbalik;

    // Menentukan diskon
    let diskon = 0;
    let status = '';

    if (isPalindrom) {
      status = 'Palindrom';
      diskon = 25;
    } else {
      status = 'Bukan Palindrom';
      diskon = karakterUnik;
    }

    const totalHarga = Number(harga);
    const potongan = totalHarga * diskon / 100;
    const hargaAkhir = totalHarga - potongan;

    setHasil({
      status,
      karakterUnik,
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
    <div className="palindrom-container">
      <h2>Program Diskon Palindrom Nama</h2>

      <form onSubmit={handleCek}>
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
          placeholder="Contoh: Anna"
          required
        />

        <button type="submit">Cek & Hitung</button>
      </form>

      {hasil && (
        <div className="palindrom-result">
          <h3>Hasil Perhitungan</h3>
          <p>Status Nama: {hasil.status}</p>
          <p>Jumlah Karakter Unik: {hasil.karakterUnik}</p>
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

export default DiskonPalindrom;
