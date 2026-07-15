import { BarChart3 } from 'lucide-react';
import maskot from '../assets/noekarta-maskot.png';
import titleImage from '../assets/noequiz-title.png';

const NoeQuiz = () => {
  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto py-16 md:py-24">
      <div className="w-full flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8">

        {/* Card NoeQuiz + Maskot */}
        <div className="relative flex-1 lg:max-w-[55%] flex items-end">
          <div className="bg-white border border-gray-200 rounded-[24px] p-8 md:p-10 w-full z-10 shadow-sm">
            <div className="lg:max-w-[60%] xl:max-w-[55%]">
              <div className="flex items-center gap-4 mb-5 flex-wrap lg:flex-nowrap">
                <img src={titleImage} alt="NoeQuiz Explorasi" className="h-[32px] md:h-[38px] object-contain select-none" />
                <button className="bg-[#0A2E6D] hover:bg-[#0d3a8a] text-white text-xs font-semibold px-5 py-2 rounded-full tracking-wide transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-900/20 active:scale-[0.97] whitespace-nowrap">
                  Tutorial!
                </button>
              </div>

              <p className="text-[#3A3A3A] text-sm md:text-[15px] leading-relaxed mb-8">
                Selesaikan Tantangan si setiap pos dengan skor minimal 3/5 benar untuk membuka pos selanjutnya. Mari taklukkan semua level!
              </p>

              <button className="bg-[#0A2E6D] hover:bg-[#0d3a8a] text-white font-semibold px-8 py-3.5 rounded-[14px] transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-900/20 active:scale-[0.98]">
                Berikutnya!
              </button>
            </div>
          </div>

          <div className="hidden lg:block absolute right-0 -bottom-4 z-20 pointer-events-none translate-x-4 xl:translate-x-8">
            <img src={maskot} alt="Noekarta Maskot" className="h-[420px] lg:h-[460px] object-contain drop-shadow-2xl select-none origin-bottom" />
          </div>
        </div>

        {/* Maskot Mobile */}
        <div className="flex lg:hidden justify-center -my-2 z-20 pointer-events-none">
          <img src={maskot} alt="Noekarta Maskot" className="h-[220px] object-contain drop-shadow-2xl select-none" />
        </div>

        {/* Card Statistik */}
        <div className="relative bg-white border border-gray-200 rounded-[24px] p-8 md:p-10 flex-1 lg:max-w-[45%] z-10 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-[#0A1B3F]">Statistik Petualangan</h3>
              <div className="w-12 h-12 bg-[#0A2E6D] rounded-2xl flex items-center justify-center shadow-md">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500 font-medium">Total Pos Diselesaikan</span>
                <span className="text-sm font-bold text-[#0A2E6D]">0/4 Pos Selesai</span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 h-2.5 rounded-full bg-[#1455e6]"></div>
                <div className="flex-1 h-2.5 rounded-full bg-gray-200"></div>
                <div className="flex-1 h-2.5 rounded-full bg-gray-200"></div>
                <div className="flex-1 h-2.5 rounded-full bg-gray-200"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div className="text-center flex-1">
              <p className="text-3xl md:text-4xl font-bold text-[#0A1B3F]">10</p>
              <p className="text-xs text-gray-400 font-semibold tracking-wider mt-1 uppercase">Soal Dijawab</p>
            </div>
            <div className="w-px h-14 bg-gray-200"></div>
            <div className="text-center flex-1">
              <p className="text-3xl md:text-4xl font-bold text-[#0A1B3F]">80<span className="text-xl md:text-2xl ml-0.5">%</span></p>
              <p className="text-xs text-gray-400 font-semibold tracking-wider mt-1 uppercase">Tingkat Benar</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default NoeQuiz;
