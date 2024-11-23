import { Text } from '../common/Text';
import { ReadingStats } from './myContents/ReadingStats';
import { EndingCard } from './myContents/EndingCard';
import { AddCard } from './myContents/AddCard';
import ImageBookSample from '@/assets/images/image_book_sample.png';
import ImageTutorial from '@/assets/images/image_tutorial.png';
import { IconHanger } from '@/assets/icons';
import { SearchCard } from './myContents/SearchCard';
import BookCard from './myContents/BookCard';

export default function MyContent() {
  return (
    <main className="px-64pxr flex flex-col overflow-y-scroll">
      <div className="h-50pxr" />
      <Text fontSize={28} fontWeight={800} color="1C1C1E" className="px-4pxr">
        나의책장에서는
        <br />
        내가 읽은 책들이 모아져있어요!
      </Text>
      <div className="h-36pxr" />
      <section className="flex gap-20pxr">
        <section className="relative flex flex-col gap-11pxr items-center pt-26pxr px-24pxr w-256pxr h-192pxr bg-yellow rounded-8pxr">
          <Text fontSize={16} fontWeight={800} color="1C1C1E" className="z-50">
            지금까지 몽글님이 읽은 책!
          </Text>
          <ReadingStats level="level 5" bookCount={20} />
          <img
            src={ImageTutorial}
            alt="튜토리얼"
            className="absolute bottom-26pxr"
          />
        </section>
        <section className="relative w-full bg-[#FFFADB] rounded-8pxr h-192pxr flex items-end">
          <div className="absolute -top-3pxr left-18pxr flex items-center gap-8pxr">
            <IconHanger />
          </div>
          <div className="absolute top-0 left-44pxr">
            <Text fontSize={15} fontWeight={800} color="2C2C2E">
              내가 만든 결말
            </Text>
          </div>
          <div className="pl-29pxr flex gap-16pxr overflow-x-scroll pb-21pxr pr-10pxr">
            <EndingCard
              src={ImageBookSample}
              title="엄마 몰래"
              daysAgo="5일전"
              subtitle="엄마 몰래"
            />
            <EndingCard
              src={ImageBookSample}
              title="엄마 몰래"
              daysAgo="5일전"
              subtitle="엄마 몰래"
            />
            <AddCard title="새 결말 만들기" />
          </div>
        </section>
      </section>
      <div className="h-52pxr" />
      <Text fontSize={24} fontWeight={800} color="1C1C1E">
        내가 읽은 책
      </Text>
      <div className="h-12pxr" />
      <section className="flex gap-20pxr">
        {Array.from({ length: 5 }).map((_, index) => (
          <BookCard
            key={index}
            src={ImageBookSample}
            title={`곰의 행복 ${index + 1}`}
          />
        ))}
        <SearchCard title="다른동화 둘러보기" />
      </section>
      <div className="h-20pxr" />
    </main>
  );
}
