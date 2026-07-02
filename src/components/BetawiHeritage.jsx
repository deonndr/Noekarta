import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import betawi1 from '../assets/betawi1.png';
import betawi2 from '../assets/betawi2.png';
import betawi3 from '../assets/betawi3.png';
import betawi4 from '../assets/betawi4.png';
import betawi5 from '../assets/betawi5.png';

const betawiData = [
  {
    id: 1,
    title: 'Lenong Betawi',
    img: betawi1,
    subtitle: 'Kenali budaya Betawi yang kaya akan tradisi dan kearifan lokal.',
    showImage: true,
    desc: 'teater tradisional atau sandiwara rakyat khas Jakarta (Betawi). Seni pertunjukan ini menggabungkan drama, komedi, musik Gambang Kromong, dan silat yang dibawakan dalam dialek Betawi. Biasanya, lenong menyampaikan pesan moral atau kritik sosial dengan cara yang jenaka.',
    tables: [
      {
        rows: [
          { label: 'Bahasa & Dialog', value: 'Menggunakan bahasa Melayu atau bahasa Indonesia dialek Betawi. Ciri khas utamanya adalah celetukan spontan dan improvisasi humor yang interaktif' },
          { label: 'Musik Pengiring', value: 'Pementasan diiringi oleh musik khas berupa gambang, kromong, gong, kendang, kecrek, serta unsur alat musik Tionghoa seperti tehyan dan kongahyan' },
          { label: 'Pesan Moral', value: 'Lakon umumnya berpihak pada kebenaran, membela kaum lemah, dan menentang kerakusan' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Palang Pintu',
    img: betawi2,
    subtitle: 'Kenali budaya Betawi yang kaya akan tradisi dan kearifan lokal.',
    showImage: true,
    desc: 'tradisi penyambutan khas adat Betawi yang menggabungkan seni bela diri (pencak silat) dengan seni sastra lisan (berbalas pantun).',
    tables: [
      {
        rows: [
          { label: 'Penyambutan & Shalawat', value: 'Rombongan mempelai pria tiba dan disambut dengan lantunan shalawat serta iringan musik rebana ketimpring' },
          { label: 'Berbalas Pantun', value: 'Juru pantun dari kedua belah pihak saling beradu pantun. Pihak wanita menagih syarat, sementara pihak pria menyatakan kesungguhan dan niat baiknya' },
          { label: 'Adu Silat (Beklai)', value: 'Setelah pantun, jawara (pendekar silat) dari kedua pihak akan unjuk kebolehan memperagakan gerakan silat atau berkelahi secara simbolik.' },
          { label: 'Uji Ilmu Agama', value: 'Sebelum diizinkan masuk, pihak wanita akan menguji kemampuan mengaji atau pemahaman agama calon mempelai pria dengan melantunkan ayat suci Al-Qur\'an (Lantun Sike)' },
          { label: 'Penyerahan', value: 'Setelah semua syarat terpenuhi, pintu akan dibuka dan kedua keluarga dipersilakan untuk bersatu' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Pakaian Adat',
    img: betawi3,
    imgPosition: 'top',
    subtitle: 'Kenali budaya Betawi yang kaya akan tradisi dan kearifan lokal.',
    showImage: true,
    desc: null,
    tables: [
      {
        sectionTitle: 'Pakaian Pria',
        rows: [
          { label: 'Baju Pangsi', value: 'Pakaian khas jawara atau pendekar Betawi. Terdiri dari baju longgar dan celana gombrong dengan warna gelap. Biasanya dilengkapi dengan sabuk ikat, peci hitam, dan sarung yang dililitkan di leher (cukin)' },
          { label: 'Jas Ujung Serong', value: 'Pakaian resmi untuk acara formal. Terdiri dari jas tutup berwarna gelap, celana panjang dengan warna senada, kemeja putih di bagian dalam, serta kain batik yang dililitkan di pinggang (sebatas lutut) dan penutup kepala (blangkon)' },
        ],
      },
      {
        sectionTitle: 'Pakaian Wanita',
        rows: [
          { label: 'Kebaya Encim', value: 'Jenis kebaya yang paling populer. Memiliki potongan yang pas di badan dengan bordiran khas di bagian depan.' },
          { label: 'Kebaya Kerancang', value: 'Dikenal juga sebagai kebaya None Jakarta. Ciri utamanya terletak pada sulaman atau bordir lubang-lubang kecil yang rumit namun cantik di seluruh bagian kebaya' },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Roti Buaya',
    img: betawi4,
    imgPosition: 'center',
    subtitle: 'Kenali budaya Betawi yang kaya akan tradisi dan kearifan lokal.',
    showImage: true,
    desc: 'Roti Buaya adalah Makanan khas Masyarakat Betawi yang disajikan pada acara-acara khusus salah satunya adalah upacara pernikahan. Biasanya roti yang memiliki panjang sekitar 50 sentimeter ini dibawa oleh pengantin laki-laki pada acara serah-serahan.',
    tables: [
      {
        rows: [
          { label: 'Bahan Utama', value: 'Tepung terigu, ragi, telur, garam, gula, margarin' },
          { label: 'Bahan Umum', value: 'Buah dan sebagainya' },
          { label: 'Daerah', value: 'Jakarta, Banten, Jawa Barat' },
          { label: 'Jenis', value: 'Camilan' },
          { label: 'Tempat asal', value: 'Indonesia' },
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Bahasa Betawi',
    img: betawi5,
    subtitle: null,
    showImage: false,
    desc: 'Bahasa Betawi adalah bahasa kreol yang digunakan masyarakat Jakarta dan sekitarnya. Kaya akan serapan dari Melayu, Arab, Tionghoa, dan Belanda, bahasa ini terkenal luwes, santai, dan identik dengan kata ganti gue (saya) dan elu (kamu) dalam percakapan sehari-hari',
    tables: [
      {
        rows: [
          { label: 'Enyak / Nyak', value: 'Ibu' },
          { label: 'Babe', value: 'Ayah' },
          { label: 'Engkong', value: 'Kakek' },
          { label: 'Encang', value: 'Kaka dari Orang Tua' },
          { label: 'Encing', value: 'Adik dari Orang Tua' },
          { label: 'Emang', value: 'Memang' },
          { label: 'Bikin', value: 'Membuat' },
          { label: 'Entar', value: 'Nanti' },
          { label: 'Demen', value: 'Suka' },
          { label: 'Ujug - Ujug', value: 'Tiba - Tiba' },
          { label: 'Ngelebog', value: 'Makan' },
          { label: 'Ngaso', value: 'Istirahat' },
          { label: 'Bodong', value: 'Bohong / Tidak benar' },
        ],
      },
    ],
  },
];

/* ─── Reusable Table ─── */
const InfoTable = ({ rows }) => (
  <div
    style={{
      border: '1px solid #d1d5db',
      borderRadius: '12px',
      overflow: 'hidden',
    }}
  >
    {rows.map((row, i) => (
      <div
        key={i}
        style={{
          display: 'flex',
          borderBottom: i < rows.length - 1 ? '1px solid #d1d5db' : 'none',
          minHeight: '44px',
        }}
      >
        <div
          style={{
            width: '35%',
            flexShrink: 0,
            padding: '12px 16px',
            fontSize: '13px',
            fontWeight: 500,
            color: '#374151',
            borderRight: '1px solid #d1d5db',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {row.label}
        </div>
        <div
          style={{
            width: '65%',
            padding: '12px 16px',
            fontSize: '13px',
            color: '#4b5563',
            lineHeight: 1.6,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {row.value}
        </div>
      </div>
    ))}
  </div>
);

/* ─── Modal Content per card type ─── */
const ModalBody = ({ card }) => {
  return (
    <>
      {/* ── Title ── */}
      <h3 style={{ fontSize: '26px', fontWeight: 700, color: '#111', margin: 0 }}>
        {card.title}
      </h3>

      {/* ── Subtitle (semua kecuali Bahasa Betawi) ── */}
      {card.subtitle && (
        <p style={{ fontSize: '14px', color: '#555', marginTop: '4px', lineHeight: 1.5 }}>
          {card.subtitle}
        </p>
      )}

      {/* ── Image (semua kecuali Bahasa Betawi) ── */}
      {card.showImage && (
        <motion.div
          layoutId={`image-${card.id}`}
          transition={{
            layout: { type: 'spring', stiffness: 250, damping: 26, mass: 0.9 }
          }}
          style={{
            marginTop: '14px',
            overflow: 'hidden',
            width: '100%',
            height: '220px',
            borderRadius: '14px',
            
          }}
        >
          <motion.img
            src={card.img}
            alt={card.title}
            className="select-none"
            initial={{ scale: 1.5, rotate: 15, y: 30 }}
            animate={{ scale: 1, rotate: 0, y: 0 }}
            exit={{ scale: 0.4, rotate: -20, y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: card.imgPosition || 'top', display: 'block', userSelect: 'none', WebkitUserSelect: 'none' }}
          />
        </motion.div>
      )}

      {/* ── Description ── */}
      {card.desc && (
        <p style={{ fontSize: '14px', color: '#333', lineHeight: 1.7, marginTop: '14px' }}>
          {card.desc}
        </p>
      )}

      {/* ── Tables with optional section titles ── */}
      {card.tables.map((table, idx) => (
        <div key={idx} style={{ marginTop: '18px' }}>
          {table.sectionTitle && (
            <p style={{ fontSize: '15px', fontWeight: 600, color: '#222', marginBottom: '10px' }}>
              {table.sectionTitle}
            </p>
          )}
          <InfoTable rows={table.rows} />
        </div>
      ))}
    </>
  );
};

/* ─── Modal Portal ─── */
const BetawiModalPortal = ({ selectedCard, onClose }) => {
  const handleKeyDown = useCallback(
    (e) => { if (e.key === 'Escape') onClose(); },
    [onClose],
  );

  useEffect(() => {
    if (selectedCard) {
      document.addEventListener('keydown', handleKeyDown);
      // For Lenis compatibility, just use overflow hidden.
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      };
    }
  }, [selectedCard, handleKeyDown]);

  return createPortal(
    <AnimatePresence mode="wait">
      {selectedCard && (
        <motion.div
          key={`overlay-${selectedCard.id}`}
          data-lenis-prevent="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={onClose}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 16px',
            backgroundColor: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
        >
          <motion.div
            key={`modal-${selectedCard.id}`}
            initial={{ opacity: 0, scale: 0.92, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 60 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 26,
              mass: 0.8,
            }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: '24px',
              width: '100%',
              maxWidth: '660px',
              height: '85vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Scrollable content area */}
            <div
              className="betawi-modal-scroll"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              style={{
                flex: 1,
                overflowY: 'scroll',
                padding: '28px 28px 0',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <ModalBody card={selectedCard} />
            </div>

            {/* Tutup Button */}
            <div style={{ padding: '16px 28px 24px', flexShrink: 0 }}>
              <motion.button
                whileHover={{ scale: 1.01, backgroundColor: '#fef2f2' }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  border: '1.5px solid #e5252a',
                  backgroundColor: 'transparent',
                  color: '#e5252a',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Tutup
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

/* ─── Main Section ─── */
const BetawiHeritage = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <section className="py-18 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
              Betawi Heritage Hub
            </h2>
            <p className="text-gray-900 text-lg">
              Kenali budaya Betawi yang kaya akan tradisi dan <br /> kearifan lokal.
            </p>
          </div>
          <a
            href="#"
            className="text-[#e5252a] font-semibold hover:text-red-700 transition-colors flex items-center gap-1 group whitespace-nowrap"
          >
            Lihat Semua Budaya
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Cards Carousel */}
        <div
          className="flex overflow-x-auto gap-4 md:gap-6 pb-8 pt-4 px-2 -mx-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {betawiData.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => setSelectedCard(item)}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white rounded-[20px] pt-[10px] pr-[10px] pb-[15px] pl-[10px] flex flex-col gap-[15px] cursor-pointer flex-shrink-0 snap-start"
              style={{
                width: '245px',
                height: '313px',
                boxShadow: '0 0 7px 0 rgba(0,0,0,0.25)',
              }}
            >
              <motion.div
                layoutId={`image-${item.id}`}
                transition={{
                  layout: { type: 'spring', stiffness: 250, damping: 26, mass: 0.9 },
                }}
                className="relative rounded-xl overflow-hidden select-none flex-1"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full rounded-lg h-full object-cover object-top"
                />
              </motion.div>
              <h3 className="text-center font-semibold text-gray-900 text-lg">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Portal — selalu di-render, AnimatePresence di dalam */}
      <BetawiModalPortal
        selectedCard={selectedCard}
        onClose={() => setSelectedCard(null)}
      />
    </section>
  );
};

export default BetawiHeritage;
