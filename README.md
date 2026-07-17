<p align="center">
  <img src="./src/assets/logo-noekarta2.webp" alt="Logo Noekarta" width="240" />
</p>

<h1 align="center">Noekarta</h1>

<p align="center">Platform interaktif untuk mengenal dan menjelajahi Jakarta.</p>

Noekarta mengajak pengunjung menyusuri sejarah Jakarta, mengenal budaya Betawi, menemukan kuliner khas, serta mengeksplorasi landmark kota lewat peta interaktif dan Street View.

## Fitur

- Eksplorasi cerita Jakarta dari Sunda Kelapa hingga Jakarta modern.
- Pengenalan budaya Betawi dan kuliner khas Jakarta.
- Peta interaktif landmark Jakarta berbasis Leaflet.
- Street View untuk melihat lokasi landmark secara langsung.
- NoeQuiz sebagai pengalaman belajar yang lebih interaktif.

## Teknologi

- React 19 + Vite
- Tailwind CSS v4
- React Router
- React Leaflet + Leaflet
- GSAP, Lenis, dan Motion

## Menjalankan proyek

Prasyarat: Node.js 18 atau yang lebih baru.

```bash
npm install
npm run dev
```

Untuk build produksi dan preview:

```bash
npm run build
npm run preview
```

## Rute

| Rute | Keterangan |
| --- | --- |
| `/` | Halaman utama Noekarta |
| `/apa-itu-jakarta` | Pengenalan Jakarta |
| `/landmark-explorer` | Peta dan eksplorasi landmark Jakarta |

## SEO

SEO dasar sudah disiapkan: judul dan deskripsi per halaman, Open Graph/Twitter Card, canonical URL otomatis, `robots.txt`, web manifest, serta favicon dari `public/logo1.png`.

Saat domain produksi tersedia, daftarkan situs ke Google Search Console dan kirim sitemap agar pengindeksan bisa dipantau.
