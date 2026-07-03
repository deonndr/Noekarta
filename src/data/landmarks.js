import img1 from '../assets/landmarkjakarta1.png';
import img2 from '../assets/landmarkjakarta2.png';
import img3 from '../assets/landmarkjakarta3.png';
import img4 from '../assets/landmarkjakarta4.png';
import img5 from '../assets/landmarkjakarta5.png';

const U = (id) => `https://images.unsplash.com/${id}?w=400&h=260&fit=crop`;

export const landmarks = [
    { id: 1, title: 'Monas', image: img1, position: [-6.175392, 106.827153], description: 'Monumen Nasional, ikon utama kota Jakarta yang menjulang setinggi 132 meter.' },
    { id: 2, title: 'Kota Tua', image: img2, position: [-6.136000, 106.814000], description: 'Kawasan bersejarah dengan arsitektur kolonial Belanda yang ikonik.' },
    { id: 3, title: 'Masjid Istiqlal', image: img3, position: [-6.170170, 106.831390], description: 'Masjid terbesar di Asia Tenggara, simbol toleransi beragama.' },
    { id: 4, title: 'Gereja Katedral', image: img4, position: [-6.169123, 106.833115], description: 'Gereja neo-gotik bersejarah tepat berseberangan dengan Masjid Istiqlal.' },
    { id: 5, title: 'Museum Fatahillah', image: img5, position: [-6.133983, 106.813295], description: 'Museum sejarah Jakarta yang dulunya adalah balai kota Batavia.' },
    { id: 6, title: 'Museum Nasional', image: U('photo-1565608087345-c6a20a791cec'), position: [-6.176100, 106.821700], description: 'Museum Gajah dengan koleksi arkeologi dan etnografi terbesar di Indonesia.' },
    { id: 7, title: 'Bundaran HI', image: U('photo-1610414498406-ee6f3c10b58b'), position: [-6.194979, 106.823049], description: 'Patung Selamat Datang, ikon modern Jakarta di pusat kota.' },
    { id: 8, title: 'Sunda Kelapa', image: U('photo-1576502200916-3808e07386a5'), position: [-6.123871, 106.808610], description: 'Pelabuhan tua tempat bersandarnya kapal pinis kayu tradisional.' },
    { id: 9, title: 'Museum Bahari', image: U('photo-1565608087345-c6a20a791cec'), position: [-6.126983, 106.808300], description: 'Museum maritim di bekas gudang VOC kawasan Sunda Kelapa.' },
    { id: 10, title: 'Museum Bank Indonesia', image: U('photo-1603888612126-1a1c2b6f1ce8'), position: [-6.137333, 106.812816], description: 'Museum perbankan di gedung bersejarah De Javasche Bank era kolonial.' },
    { id: 11, title: 'TMII', image: U('photo-1555899434-94d0e1c1a93c'), position: [-6.301670, 106.896670], description: 'Taman Mini Indonesia Indah, miniatur Nusantara dalam satu kawasan.' },
    { id: 12, title: 'Kebun Binatang Ragunan', image: U('photo-1534567153574-2b12153a87f0'), position: [-6.311588, 106.819918], description: 'Kebun binatang seluas 140 hektar dengan ribuan satwa dari seluruh Indonesia.' },
    { id: 13, title: 'Ancol Dreamland', image: U('photo-1587583770025-32851b463a48'), position: [-6.122743, 106.831529], description: 'Kawasan rekreasi terpadu terbesar di Asia Tenggara di tepi Teluk Jakarta.' },
    { id: 14, title: 'Gelora Bung Karno', image: U('photo-1577223625816-7546f13df25d'), position: [-6.218578, 106.802511], description: 'Stadion utama kebanggaan Indonesia, arena Asian Games 1962 dan 2018.' },
    { id: 15, title: 'Museum MACAN', image: U('photo-1561214115-f2f134cc4912'), position: [-6.190907, 106.767875], description: 'Museum seni modern dan kontemporer pertama di Indonesia.' },
    { id: 16, title: 'Taman Ismail Marzuki', image: U('photo-1569163139599-0f4517e36f51'), position: [-6.189053, 106.840019], description: 'Pusat kesenian dan kebudayaan dengan planetarium, teater, dan galeri.' },
    { id: 17, title: 'Setu Babakan', image: U('photo-1580587771525-78b9dba3b914'), position: [-6.341667, 106.823889], description: 'Kampung budaya Betawi yang melestarikan tradisi dan kuliner asli Jakarta.' },
    { id: 18, title: 'Glodok Chinatown', image: U('photo-1588279103799-7b27bae8a90b'), position: [-6.150000, 106.817000], description: 'Pecinan terbesar di Indonesia, pusat kuliner dan elektronik legendaris.' },
    { id: 19, title: 'Museum Wayang', image: U('photo-1580137189272-f9379ed6994d'), position: [-6.134700, 106.813000], description: 'Museum wayang dengan koleksi boneka kayu dari dalam dan luar negeri.' },
    { id: 20, title: 'Pasar Baru', image: U('photo-1569336415962-a4d11f462cbd'), position: [-6.162500, 106.834400], description: 'Pasar tertua di Jakarta sejak 1820, surga belanja tekstil dan kuliner.' },
];
