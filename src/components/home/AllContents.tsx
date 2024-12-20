import { useState, useEffect } from 'react';
import { Text } from '../common/Text';
import { ScrollToTopButton } from './allContents/ScrollToTopButton';
import { SortOptions } from './allContents/SortOptions';
import { BookCard } from './allContents/BookCards';

export default function AllContents() {
  const images = import.meta.glob('@/assets/images/*', { eager: true });

  const getImagePath = (filename: string): string => {
    const key = `/src/assets/images/${filename}`;
    return (images[key] as any)?.default || '';
  };
  const allStoriesData = JSON.parse(localStorage.getItem('storyData') || '[]');

  const [selected, setSelected] = useState<string>('인기순');
  const [showButton, setShowButton] = useState<boolean>(false);
  const [allstories, setAllStories] = useState(allStoriesData.stories || []);
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // 구조 분해 할당을 사용하여 요소를 교환
    }
    return array;
  };
  const options = ['인기순', '날짜순', '가나다순'];

  useEffect(() => {
    const shuffledStories = shuffleArray([...allstories]); // allstories 배열을 복사하여 섞기
    setAllStories(shuffledStories);
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
    <main className="px-64pxr flex flex-col overflow-y-scroll">
      <div className="h-50pxr" />
      <Text fontSize={28} fontWeight={800} color="1C1C1E" className="px-4pxr">
        모든책에서 {allstories.length}권의
        <br />
        책을 한번에 찾아볼 수 있어요!
      </Text>
      <div className="h-36pxr" />
      <SortOptions
        options={options}
        selected={selected}
        onSelect={(option) => setSelected(option)}
      />
      <div className="h-20pxr" />
      <section className="flex flex-wrap gap-16pxr">
        {allstories.map((story: any, index: number) => (
          <BookCard
            key={index}
            src={getImagePath(story.thumbnail)}
            title={story.title}
            id={story.id}
          />
        ))}
      </section>
      <div className="h-20pxr" />
      <ScrollToTopButton show={showButton} onClick={scrollToTop} />
    </main>
  );
}
