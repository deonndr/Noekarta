<p align="center">
  <img src="./src/assets/logo-noekarta2.webp" alt="Logo Noekarta" width="240" />
</p>

<p align="center">Platform interaktif untuk mengenal dan menjelajahi Jakarta.</p>

Noekarta mengajak pengunjung menyusuri sejarah Jakarta, mengenal budaya Betawi, menemukan kuliner khas, serta mengeksplorasi landmark kota lewat peta interaktif dan Street View.

## Fitur

- **Apa Itu Jakarta** — Pengenalan kota Jakarta dengan statistik, fakta menarik, dan video drone.
- **Lorong Waktu** — Timeline interaktif sejarah Jakarta dari Sunda Kelapa hingga era digital.
- **Budaya Betawi** — Flipbook interaktif untuk menjelajahi warisan budaya Betawi.
- **Kuliner Jakarta** — Jelajahi dan bookmark kuliner khas Betawi lengkap dengan pencarian.
- **Landmark Explorer** — Peta interaktif berbasis Leaflet dengan 18 landmark Jakarta, popup info, dan Street View 360°.
- **NoeQuiz** — Game edukasi interaktif menjelajahi pengetahuan tentang Jakarta.
- **Inventory** — Koleksi bookmark kuliner favorit yang tersimpan di localStorage.

## Teknologi

- React 19 + Vite
- Tailwind CSS v4
- React Router v7
- React Leaflet + Leaflet
- GSAP + ScrollTrigger, Lenis, Motion
- React PageFlip

## Menjalankan proyek

Prasyarat: Node.js 18+.

```bash
npm install
npm run dev
```

Build produksi dan preview:

```bash
npm run build
npm run preview
```

Lint:

```bash
npm run lint
```

## Rute

| Rute | Keterangan |
| --- | --- |
| `/` | Halaman utama — Hero, About, Sejarah, Budaya Betawi, Kuliner, Landmark Explorer, NoeQuiz |
| `/apa-itu-jakarta` | Halaman informasi lengkap tentang Jakarta |
| `/landmark-explorer` | Peta interaktif dan eksplorasi landmark Jakarta |
| `/noequiz` | Permainan kuis interaktif seputar Jakarta |
| `/kuliner` | Katalog kuliner khas Betawi dengan pencarian dan bookmark |
| `/inventory` | Koleksi bookmark kuliner yang disimpan |

## SEO

SEO per halaman dikelola oleh komponen `Seo.jsx` yang mengatur judul, deskripsi, Open Graph, Twitter Card, dan canonical URL secara dinamis. `robots.txt`, web manifest, serta favicon sudah tersedia di `public/`.

Saat domain produksi tersedia, daftarkan situs ke Google Search Console dan kirim sitemap agar pengindeksan bisa dipantau.
