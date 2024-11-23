import { useParams } from 'react-router-dom';
import { DetailHeader } from '@/components/detail/DetailHeader';
import { BookHighlight } from '@/components/detail/BookHighlight';
import { BookDetails } from '@/components/detail/BookDetails';

export default function Detail() {
  const { id } = useParams<{ id: string }>();

  const images = import.meta.glob('@/assets/images/*', { eager: true });

  const getImagePath = (filename: string): string => {
    const key = `/src/assets/images/${filename}`;
    return (images[key] as any)?.default || '';
  };

  const allStories = JSON.parse(localStorage.getItem('storyData') || '[]');
  const storyData = allStories.stories.find(
    (story: { id: string }) => story.id === id
  );

  if (!storyData) {
    return (
      <main className="w-full h-full flex items-center justify-center">
        <p>데이터를 찾을 수 없습니다.</p>
      </main>
    );
  }

  return (
    <main className="w-full h-full flex flex-col">
      {/* 헤더 */}
      <DetailHeader title={storyData.title} />
      <div className="h-2pxr w-full bg-f4f4f4" />

      {/* 본문 섹션 */}
      <section className="flex w-full flex-grow items-center justify-center">
        {/* 책 하이라이트 */}
        <BookHighlight
          src={getImagePath(storyData.thumbnail)}
          title={storyData.title}
          id={storyData.id}
        />

        {/* 책 상세 정보 */}
        <BookDetails
          summary={storyData.summary}
          keywords={storyData.keywords}
          details={[
            { label: '글쓴이', value: storyData.writter },
            { label: '출판사', value: storyData.publisher },
            { label: '발행일', value: storyData.publishDate },
          ]}
        />
      </section>
    </main>
  );
}
