import { Text } from '../common/Text';
import ImageBookSample from '@/assets/images/rabbit1.png';
import UserProfile from './homeContents/UserProfile';
import { IconText } from '@/assets/icons';
import ImageMongle from '@/assets/images/image_mongle.png';
import BookCard from './homeContents/BookCard';
import InProgressBookCard from './homeContents/InProgressBookCard';
import AddBookCard from './homeContents/AddBookCard';

export default function HomeContent() {
  const images = import.meta.glob('@/assets/images/*.{png,jpg,jpeg,webp}', {
    eager: true,
  });

  const getImagePath = (filename: string): string => {
    const key = `/src/assets/images/${filename}`;
    console.log(key);
    return (images[key] as any)?.default || '';
  };

  const allStoriesData = JSON.parse(localStorage.getItem('storyData') || '[]');
  const allstories = allStoriesData.stories;
  return (
    <main>
      <section className="flex justify-between pl-76pxr pr-46pxr w-full h-196pxr bg-yellow">
        <UserProfile name="김은우" readCount={2} readingCount={5} />
        <section className="flex relative items-end">
          <div className="relative mb-[27px] -mr-48pxr">
            <IconText className="relative" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <Text
                fontSize={18}
                fontWeight={400}
                className="whitespace-nowrap"
              >
                은우님 어제 읽던 책이 있어요!
              </Text>
              <Text
                fontSize={20}
                fontWeight={800}
                className="underline whitespace-nowrap cursor-pointer"
              >
                {'{어린왕자} 바로가기 >'}
              </Text>
            </div>
          </div>
          <img src={ImageMongle} alt="몽글캐릭터" />
        </section>
      </section>
      <div className="h-32pxr" />
      <section className="flex flex-col gap-44pxr pl-64pxr">
        <section className="flex flex-col gap-12pxr">
          <Text fontSize={24} fontWeight={800}>
            은우님을 위한 인기동화책!
          </Text>
          <div className="flex gap-20pxr pb-8pxr overflow-x-scroll">
            {allstories.map((story: any, index: number) => (
              <BookCard
                key={index}
                src={getImagePath(story.thumbnail)}
                title={story.title}
                id={story.id}
              />
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-12pxr">
          <Text fontSize={24} fontWeight={800}>
            은우님이 참여한 독서 토론
          </Text>
          <div className="flex gap-20pxr pb-8pxr overflow-x-scroll">
            <InProgressBookCard src={ImageBookSample} />
            <AddBookCard />
          </div>
        </section>
      </section>
    </main>
  );
}
