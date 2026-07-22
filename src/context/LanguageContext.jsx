/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext(null);

export const translations = {
  id: {
    // Common & Nav
    nav_home: 'Beranda',
    nav_about: 'Tentang Jakarta',
    nav_history: 'Sejarah',
    nav_culture: 'Budaya',
    nav_culinary: 'Kuliner',
    nav_quiz: 'NoeQuiz',
    back: 'Kembali',
    search: 'Cari',
    view_all: 'Lihat Semua',
    save: 'Simpan',
    saved: 'Tersimpan',
    remove: 'Batal Menyimpan',
    loading: 'Memuat...',

    // Hero section
    hero_search_placeholder: 'Jelajahi Sejarah, budaya, kuliner, dll',
    hero_badge: 'Jelajahi Sejarah, Budaya & Kuliner',
    hero_title_1: 'Dari Jejak',
    hero_title_2: 'Menuju',
    hero_title_3: 'Jakarta',
    hero_title_4: 'Kota Digital',
    hero_sub_mobile: 'Jelajahi cerita Jakarta, dari masa ke masa.',
    hero_sub_desktop: 'Telusuri perjalanan panjang jakarta dari masa ke masa dan temukan cerita di setiap sudut kotanya.',

    // About section
    about_stat_unit: 'juta jiwa',
    about_stat_label: 'Penduduk Kota Jakarta',
    about_heading: 'Jakarta, Kota sejarah & inovasi',
    about_desc:
      'Dari pelabuhan Sunda Kelapa hingga pusat Inovasi digital Asia Tenggara, Jakarta memadukan warisan budaya dan semangat modern untuk masa depan yang lebih baik',
    about_cta: 'Selengkapnya tentang Jakarta',

    // History Section
    history_heading: 'Sejarah Jakarta',
    history_sub: 'Jejak langkah transformasi ibu kota dari masa ke masa',
    history_era_1_name: 'Sunda Kelapa',
    history_era_1_year: 'Abad Ke 5',
    history_era_1_desc: 'Pelabuhan bersejarah di Jakarta Utara yang terletak di muara Sungai Ciliwung. Dulunya merupakan pelabuhan utama Kerajaan Sunda, tempat ini kini beroperasi sebagai pusat kapal layar kayu tradisional (Pinisi) antarpulau dan menjadi salah satu destinasi wisata sejarah yang menarik di ibu kota.',
    history_era_2_name: 'Jayakarta',
    history_era_2_year: '1527',
    history_era_2_desc: 'Jayakarta berkembang sebagai bandar perdagangan rempah-rempah yang penting. Namun, riwayatnya berakhir pada 1619 ketika VOC di bawah pimpinan Jan Pieterszoon Coen menaklukkan wilayah tersebut, meratakannya dengan tanah, dan membangun kota baru bernama Batavia di atasnya.',
    history_era_3_name: 'Batavia',
    history_era_3_year: '1619 - 1942',
    history_era_3_desc: 'Batavia adalah nama lama untuk ibu kota Indonesia, Jakarta, pada masa penjajahan Belanda. Nama ini diberikan oleh Vereenigde Oostindische Compagnie (VOC) pada tahun 1619 setelah menaklukkan Jayakarta, dan diambil dari nama suku bangsa Jermanik kuno (Batavi) yang dianggap sebagai leluhur bangsa Belanda.',
    history_era_4_name: 'Jakarta Merdeka',
    history_era_4_year: '1942 - 1966',
    history_era_4_desc: 'Jakarta merdeka adalah transformasi dari kota kolonial menjadi pusat perjuangan dan ibu kota. Setelah Proklamasi 1945, namanya diubah dari pendudukan Jepang (Jakarta Tokubetsu Shi) menjadi Jakarta. Di sinilah tempat Ir. Soekarno membacakan naskah proklamasi yang mengawali kedaulatan penuh Republik Indonesia.',
    history_era_5_name: 'Jakarta Modern',
    history_era_5_year: '1966 - 2000',
    history_era_5_desc: 'Jakarta telah bertransformasi menjadi megapolitan modern berskala global. Kota ini menawarkan pesona futuristik melalui integrasi transportasi publik mutakhir seperti MRT dan LRT, kawasan hijau terpadu seperti Hutan Kota GBK, perpustakaan berfasilitas digital di Perpustakaan Jakarta serta kemudahan mobilitas melalui aplikasi terintegrasi dari Transjakarta.',
    history_era_6_name: 'Jakarta Digital',
    history_era_6_year: '2000 - Sekarang',
    history_era_6_desc: 'Jakarta Digital merujuk pada transformasi digital yang dilakukan oleh Pemerintah Provinsi DKI Jakarta untuk mengubah wajah birokrasi, tata kelola, dan layanan publik dari sistem manual ke dalam ekosistem terpadu berbasis teknologi.',

    // Betawi Heritage section
    betawi_hub: 'Pusat Warisan Betawi',
    betawi_heading_1: 'Kenali Budaya',
    betawi_heading_2: 'Jakarta',
    betawi_desc: 'Jelajahi kekayaan budaya Jakarta melalui tradisi, seni, dan warisan yang terus hidup hingga kini.',
    betawi_item_1_title: 'Budaya Betawi',
    betawi_item_1_desc: 'Budaya asli masyarakat Jakarta yang tercermin dalam bahasa, kesenian kuliner, hingga tradisi sehari-hari.',
    betawi_item_2_title: 'Pakaian Adat Betawi',
    betawi_item_2_desc: 'Keanggunan busana adat Betawi seperti Kebaya Encim dan Baju Sadariah yang kaya perpaduan budaya.',
    betawi_item_3_title: 'Kuliner Betawi',
    betawi_item_3_desc: 'Cita rasa khas kuliner Betawi yang diwariskan secara turun-temurun dari rempah pilihan.',
    betawi_item_4_title: 'Kesenian & Musik Betawi',
    betawi_item_4_desc: 'Alunan khas musik Gambang Kromong, Tanjidor, dan alat musik tradisional Betawi.',
    betawi_item_5_title: 'Tradisi Betawi',
    betawi_item_5_desc: 'Upacara adat dan prosesi pernikahan Betawi yang unik seperti Palang Pintu dan Ngarak Pengantin.',
    betawi_item_6_title: 'Wisata Betawi',
    betawi_item_6_desc: 'Destinasi cagar budaya Betawi seperti Museum Wayang dan Perkampungan Budaya Betawi Setu Babakan.',

    // Kuliner section
    kuliner_heading: 'Kuliner Jakarta',
    kuliner_sub: 'Cicipi kuliner khas Betawi dan Jakarta',
    kuliner_cta: 'Lihat Semua Kuliner',
    kuliner_save_inventory: 'Simpan ke inventaris',
    kuliner_unsave_inventory: 'Hapus dari inventaris',
    kuliner_search_placeholder: 'Cari kuliner Betawi...',
    kuliner_page_title: 'Galeri Kuliner Jakarta',
    kuliner_page_sub: 'Cicipi kuliner khas Betawi dan Jakarta melalui galeri interaktif Noekarta.',
    kuliner_view_inventory: 'Lihat Inventaris',
    kuliner_empty_search: 'Kuliner tidak ditemukan',

    // Inventory page
    inventory_title: 'Inventaris Kuliner',
    inventory_sub: 'Daftar kuliner khas Betawi dan Jakarta yang telah Anda simpan.',
    inventory_search_placeholder: 'Cari kuliner tersimpan...',
    inventory_empty: 'Belum ada kuliner yang disimpan',
    inventory_empty_sub: 'Jelajahi halaman kuliner dan simpan santapan favoritmu!',
    inventory_go_kuliner: 'Jelajahi Kuliner',

    // Landmark section
    landmark_heading: 'Jakarta Landmark Explorer',
    landmark_sub: 'Temukan Landmark Ikonik Jakarta dan simpan favoritmu',
    landmark_open_map: 'Buka Peta Interaktif',
    landmark_loading_map: 'Memuat Peta...',
    landmark_prep_map: 'Mempersiapkan Peta...',
    landmark_sidebar_title: 'Landmark Jakarta',
    landmark_sidebar_sub: 'Klik landmark untuk menuju lokasinya di peta',
    landmark_view_360: 'Lihat 360°',
    landmark_active_label: 'Landmark Aktif',

    // NoeQuiz section & page
    quiz_desc:
      'Selesaikan Tantangan di setiap pos dengan skor minimal 3/5 benar untuk membuka pos selanjutnya. Mari taklukkan semua level!',
    quiz_cta: 'Mainkan NoeQuiz Sekarang !!',
    quiz_sample_title: 'Contoh Soal',
    quiz_station_title: 'Pos NoeQuiz',
    quiz_score_label: 'Skor Anda',
    quiz_pass_title: 'Selamat! Pos Selesai',
    quiz_pass_msg: 'Anda telah berhasil memenuhi syarat kelulusan pos ini.',
    quiz_fail_title: 'Belum Lulus',
    quiz_fail_msg: 'Skor Anda belum mencapai minimal 3/5. Coba lagi untuk membuka pos berikutnya!',
    quiz_retry_btn: 'Coba Lagi',
    quiz_next_station_btn: 'Lanjut ke Pos Berikutnya',
    quiz_finish_msg: 'Selamat! Anda telah menyelesaikan seluruh pos NoeQuiz Jakarta!',
    quiz_station_locked: 'Pos Terkunci',
    quiz_station_locked_msg: 'Selesaikan pos sebelumnya dengan minimal 3/5 jawaban benar untuk membuka pos ini.',
    quiz_tutorial_btn: 'Tutorial!',
    quiz_stats_title: 'Statistik Petualangan',
    quiz_stats_total: 'Total Pos Diselesaikan',
    quiz_stats_completed: 'Pos Selesai',
    quiz_stats_answered: 'Soal Dijawab',
    quiz_stats_accuracy: 'Tingkat Benar',
    quiz_map_start: 'MULAI',
    quiz_map_finish: 'SELESAI',

    // Footer
    footer_tagline: 'Noekarta adalah website yang dibuat untuk memperkenalkan budaya, kuliner, dan sejarah dari Kota Jakarta.',
    footer_col_jakarta: 'Jakarta',
    footer_col_explore: 'Jelajahi',
    footer_col_game: 'Game',
    footer_rights: '© 2026 Noekarta SmartOne | Hak cipta dilindungi undang-undang.',

    // Apa Itu Jakarta Page
    apa_itu_page_title: 'Apa Itu Jakarta',
    apa_itu_page_desc: 'Kenali Jakarta sebagai jantung Indonesia: pusat pemerintahan, ekonomi, budaya, dan kehidupan metropolitan.',
    apa_itu_hero_sub: 'Kota Metropolitan Bersejarah & Pusat Kemajuan Nusantara',
    apa_itu_drone_title: 'Pemandangan Udara Jakarta',
    apa_itu_drone_desc: 'Saksikan keindahan lanskap kota Jakarta dari sudut pandang drone modern.',

    // StreetView Portal
    street_view_title: 'Tampilan 360° Interaktif',
    street_view_loading: 'Memuat Street View...',
    street_view_close: 'Tutup Tampilan 360°',
  },

  en: {
    // Common & Nav
    nav_home: 'Home',
    nav_about: 'About Jakarta',
    nav_history: 'History',
    nav_culture: 'Culture',
    nav_culinary: 'Culinary',
    nav_quiz: 'NoeQuiz',
    back: 'Back',
    search: 'Search',
    view_all: 'View All',
    save: 'Save',
    saved: 'Saved',
    remove: 'Remove',
    loading: 'Loading...',

    // Hero section
    hero_search_placeholder: 'Explore history, culture, culinary, etc.',
    hero_badge: 'Explore History, Culture & Culinary',
    hero_title_1: 'From the Footsteps of',
    hero_title_2: 'To',
    hero_title_3: 'Jakarta',
    hero_title_4: 'Digital City',
    hero_sub_mobile: 'Explore the story of Jakarta, from time to time.',
    hero_sub_desktop: 'Trace the long journey of Jakarta through the eras and discover stories in every corner of the city.',

    // About section
    about_stat_unit: 'million people',
    about_stat_label: 'Jakarta City Population',
    about_heading: 'Jakarta, City of history & innovation',
    about_desc:
      'From the port of Sunda Kelapa to Southeast Asia\'s digital innovation hub, Jakarta blends cultural heritage with a modern spirit for a better future.',
    about_cta: 'Learn more about Jakarta',

    // History Section
    history_heading: 'History of Jakarta',
    history_sub: 'Traces of the capital city\'s transformation through eras',
    history_era_1_name: 'Sunda Kelapa',
    history_era_1_year: '5th Century',
    history_era_1_desc: 'Historic port in North Jakarta at the mouth of Ciliwung River. Formerly the main port of the Sunda Kingdom, it now operates as a hub for traditional inter-island wooden Pinisi schooners and remains a captivating historical destination.',
    history_era_2_name: 'Jayakarta',
    history_era_2_year: '1527',
    history_era_2_desc: 'Jayakarta developed as a key spice trading harbor. However, its era ended in 1619 when the VOC under Jan Pieterszoon Coen conquered and razed the area, building a new city named Batavia over it.',
    history_era_3_name: 'Batavia',
    history_era_3_year: '1619 - 1942',
    history_era_3_desc: 'Batavia was the colonial name for Indonesia\'s capital city, Jakarta, under Dutch rule. Named by the VOC in 1619 after capturing Jayakarta, deriving from the ancient Germanic tribe (Batavi) considered Dutch ancestors.',
    history_era_4_name: 'Independent Jakarta',
    history_era_4_year: '1942 - 1966',
    history_era_4_desc: 'Independent Jakarta marks the transformation from a colonial city to the epicenter of independence. Following the 1945 Proclamation, its name changed from Japanese occupation (Jakarta Tokubetsu Shi) to Jakarta, where Ir. Soekarno proclaimed Indonesian independence.',
    history_era_5_name: 'Modern Jakarta',
    history_era_5_year: '1966 - 2000',
    history_era_5_desc: 'Jakarta transformed into a global modern megacity. It offers futuristic charm through advanced public transit like MRT and LRT, integrated green zones like GBK City Park, digital public libraries, and smart urban mobility.',
    history_era_6_name: 'Digital Jakarta',
    history_era_6_year: '2000 - Present',
    history_era_6_desc: 'Digital Jakarta highlights the digital transformation undertaken by the DKI Jakarta Provincial Government to modernize governance, public services, and urban infrastructure into a smart connected ecosystem.',

    // Betawi Heritage section
    betawi_hub: 'Betawi Heritage Hub',
    betawi_heading_1: 'Discover Culture of',
    betawi_heading_2: 'Jakarta',
    betawi_desc: 'Explore the rich heritage of Jakarta through traditions, performing arts, and living cultural legacies.',
    betawi_item_1_title: 'Betawi Culture',
    betawi_item_1_desc: 'Indigenous culture of Jakarta reflected in language, culinary arts, folklore, and daily traditions.',
    betawi_item_2_title: 'Betawi Traditional Attire',
    betawi_item_2_desc: 'The elegance of traditional Betawi clothing like Kebaya Encim and Sadariah shirts blending cultural influences.',
    betawi_item_3_title: 'Betawi Cuisine',
    betawi_item_3_desc: 'Distinctive flavors of authentic Betawi culinary heritage passed down through generations using rich spices.',
    betawi_item_4_title: 'Betawi Performing Arts & Music',
    betawi_item_4_desc: 'Vibrant melodies of Gambang Kromong, Tanjidor brass, and traditional Betawi musical instruments.',
    betawi_item_5_title: 'Betawi Traditions',
    betawi_item_5_desc: 'Unique ceremonial customs and wedding processions such as Palang Pintu martial arts and bridal parades.',
    betawi_item_6_title: 'Betawi Cultural Tourism',
    betawi_item_6_desc: 'Heritage destinations preserving Betawi identity, including Wayang Museum and Setu Babakan Cultural Village.',

    // Kuliner section
    kuliner_heading: 'Jakarta Culinary',
    kuliner_sub: 'Taste authentic Betawi and Jakarta culinary delights',
    kuliner_cta: 'View All Culinary',
    kuliner_save_inventory: 'Save to inventory',
    kuliner_unsave_inventory: 'Remove from inventory',
    kuliner_search_placeholder: 'Search Betawi dishes...',
    kuliner_page_title: 'Jakarta Culinary Gallery',
    kuliner_page_sub: 'Discover authentic Betawi and Jakarta culinary delights through Noekarta\'s interactive gallery.',
    kuliner_view_inventory: 'View Inventory',
    kuliner_empty_search: 'No culinary items found',

    // Inventory page
    inventory_title: 'Culinary Inventory',
    inventory_sub: 'List of authentic Betawi and Jakarta culinary items you have saved.',
    inventory_search_placeholder: 'Search saved items...',
    inventory_empty: 'No culinary items saved yet',
    inventory_empty_sub: 'Explore the culinary gallery and save your favorite dishes!',
    inventory_go_kuliner: 'Explore Culinary',

    // Landmark section
    landmark_heading: 'Jakarta Landmark Explorer',
    landmark_sub: 'Discover iconic Jakarta landmarks and save your favorites',
    landmark_open_map: 'Open Interactive Map',
    landmark_loading_map: 'Loading Map...',
    landmark_prep_map: 'Preparing Map...',
    landmark_sidebar_title: 'Jakarta Landmarks',
    landmark_sidebar_sub: 'Click a landmark to navigate to its location on the map',
    landmark_view_360: 'View 360°',
    landmark_active_label: 'Active Landmark',

    // NoeQuiz section & page
    quiz_desc:
      'Complete the challenge at each station with a minimum score of 3/5 correct to unlock the next station. Let\'s conquer all levels!',
    quiz_cta: 'Play NoeQuiz Now !!',
    quiz_sample_title: 'Sample Question',
    quiz_station_title: 'NoeQuiz Station',
    quiz_score_label: 'Your Score',
    quiz_pass_title: 'Congratulations! Station Completed',
    quiz_pass_msg: 'You have successfully passed this station challenge.',
    quiz_fail_title: 'Not Passed Yet',
    quiz_fail_msg: 'Your score did not reach the minimum 3/5 correct answers. Try again to unlock the next station!',
    quiz_retry_btn: 'Try Again',
    quiz_next_station_btn: 'Proceed to Next Station',
    quiz_finish_msg: 'Congratulations! You have completed all Jakarta NoeQuiz stations!',
    quiz_station_locked: 'Station Locked',
    quiz_station_locked_msg: 'Complete the previous station with at least 3/5 correct answers to unlock this station.',
    quiz_tutorial_btn: 'Tutorial!',
    quiz_stats_title: 'Adventure Statistics',
    quiz_stats_total: 'Total Stations Completed',
    quiz_stats_completed: 'Stations Completed',
    quiz_stats_answered: 'Questions Answered',
    quiz_stats_accuracy: 'Accuracy Rate',
    quiz_map_start: 'START',
    quiz_map_finish: 'FINISH',

    // Footer
    footer_tagline: 'Noekarta is a website dedicated to introducing the culture, culinary, and history of Jakarta City.',
    footer_col_jakarta: 'Jakarta',
    footer_col_explore: 'Explore',
    footer_col_game: 'Game',
    footer_rights: '© 2026 Noekarta SmartOne | All rights reserved.',

    // Apa Itu Jakarta Page
    apa_itu_page_title: 'About Jakarta',
    apa_itu_page_desc: 'Get to know Jakarta as the heart of Indonesia: the center of government, economy, culture, and metropolitan life.',
    apa_itu_hero_sub: 'Historic Metropolis & Center of Archipelago Innovation',
    apa_itu_drone_title: 'Jakarta Aerial View',
    apa_itu_drone_desc: 'Witness the beauty of Jakarta cityscapes from modern aerial perspective.',

    // StreetView Portal
    street_view_title: '360° Interactive View',
    street_view_loading: 'Loading Street View...',
    street_view_close: 'Close 360° View',
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('id');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleLanguage = () => {
    setShowOverlay(true);
    setTimeout(() => setIsTransitioning(true), 10);
    
    setTimeout(() => {
      setLanguage((prev) => (prev === 'id' ? 'en' : 'id'));
      setTimeout(() => {
        setIsTransitioning(false);
        setTimeout(() => setShowOverlay(false), 300);
      }, 400);
    }, 400);
  };

  const t = (key) => translations[language][key] ?? key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
      {showOverlay && (
        <div 
          className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white/90 backdrop-blur-md transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
        >
           <div className="w-14 h-14 border-4 border-[#111A5A]/20 border-t-[#111A5A] rounded-full animate-spin"></div>
           <p className="mt-6 text-[#111A5A] font-bold text-lg tracking-wide">
              {language === 'id' ? 'Mengubah ke Bahasa Indonesia...' : 'Switching to English...'}
           </p>
        </div>
      )}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
};
