import { useState, useEffect } from 'react';
import { Text } from '../common/Text';
import ImageBookSample from '@/assets/images/image_book_sample.png';
import { IconUp } from '@/assets/icons';

export default function AllContents() {
  const [selected, setSelected] = useState('인기순');
  const [showButton, setShowButton] = useState(false); // "맨 위로" 버튼 표시 여부

  const options = ['인기순', '날짜순', '가나다순'];

  // 스크롤 이벤트 감지
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // "맨 위로" 스크롤 함수
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main
      className="px-64pxr flex flex-col overflow-y-scroll
      "
    >
      <div className="h-50pxr" />
      <Text fontSize={28} fontWeight={800} color="1C1C1E" className="px-4pxr">
        모든책에서 200권의
        <br />
        책을 한번에 찾아볼 수 있어요!
      </Text>
      <div className="h-36pxr" />
      <section className="flex gap-4pxr">
        {options.map((option) => (
          <div
            key={option}
            className={`px-20pxr h-35pxr flex items-center border-[1.2px] rounded-50pxr cursor-pointer ${
              selected === option
                ? 'border-black text-black' // 선택된 항목 스타일
                : 'border-AEAEAE text-AEAEAE' // 선택되지 않은 항목 스타일
            }`}
            onClick={() => setSelected(option)}
          >
            <Text
              fontSize={18}
              fontWeight={800}
              color={selected === option ? '1C1C1E' : 'AEAEB2'}
            >
              {option}
            </Text>
          </div>
        ))}
      </section>
      <div className="h-20pxr" />
      <section className="flex flex-wrap gap-16pxr">
        {Array.from({ length: 40 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-12pxr">
            <img
              src={ImageBookSample}
              alt="샘플"
              className="min-w-118pxr max-w-118pxr h-172pxr rounded-[8.788px] border border-f4f4f4 bg-gray-200 bg-center bg-cover shadow-[5px_5px_5px_rgba(0,0,0,0.15)]"
            />
            <Text fontSize={16} fontWeight={400} color="1C1C1E">
              곰의 행복 {index + 1}
            </Text>
          </div>
        ))}
      </section>
      <div className="h-20pxr" />

      {/* 맨 위로 버튼 */}
      {showButton && (
        <button
          className="fixed bottom-50pxr right-104pxr w-50pxr h-50pxr rounded-full bg-white flex items-center justify-center 
               shadow-lg cursor-pointer
               fill-white filter-[drop-shadow(0px_2px_20px_rgba(0,0,0,0.70))]"
          onClick={scrollToTop}
          style={{
            fill: '#FFF',
          }}
        >
          <IconUp />
        </button>
      )}
    </main>
  );
}
