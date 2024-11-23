import { useParams } from 'react-router-dom';
import { DetailHeader } from '@/components/detail/DetailHeader';
import { BookHighlight } from '@/components/detail/BookHighlight';
import { BookActions } from '@/components/detail/BookActions';
import { BookDetails } from '@/components/detail/BookDetails';
import ImageBookSample from '@/assets/images/image_book_sample.png';

export default function Detail() {
  const { id } = useParams<{ id: string }>();

  return (
    <main className="w-full h-full flex flex-col">
      <DetailHeader title="토끼와 거북이" />
      <div className="h-2pxr w-full bg-f4f4f4" />
      <section className="flex w-full flex-grow items-center justify-center">
        <BookHighlight src={ImageBookSample} title="토끼와 거북이" />
        <BookDetails
          summary="단순히 토끼와 거북이의 승패를 가른 한바탕 경주 이야기에 그치지 않습니다. 포기하지 않는 인내심으로 경주에서 승리한 거북이뿐만 아니라, 자신의 패배를 인정하고 거북이를 즐겁게 축하해 주는 토끼의 모습에서 독자들은..."
          keywords={['동물', '이솝우화']}
          details={[
            { label: '글쓴이', value: '김토끼' },
            { label: '출판사', value: '개과천선이야호' },
            { label: '발행일', value: '2020.02.02' },
          ]}
        />
      </section>
    </main>
  );
}
