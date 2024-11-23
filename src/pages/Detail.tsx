import { IconBookBlack, IconBrainYellow, IconLeftBlue } from '@/assets/icons';
import { Text } from '@/components/common/Text';
import { useParams } from 'react-router-dom';
import ImageBookSample from '@/assets/images/image_book_sample.png';

export default function Detail() {
  const { id } = useParams<{ id: string }>();

  return (
    <main className="w-full h-full flex flex-col">
      <section className="flex justify-between items-center px-12pxr py-8pxr">
        <div className="flex w-89pxr h-44pxr gap-6pxr items-center cursor-pointer">
          <IconLeftBlue />
          <Text fontSize={17} fontWeight={400} color="007AFF">
            뒤로가기
          </Text>
        </div>
        <Text fontSize={17} fontWeight={400}>
          토끼와 거북이
        </Text>
        <div className="w-89pxr" />
      </section>
      <div className="h-2pxr w-full bg-f4f4f4" />
      <section className="flex w-full flex-grow items-center justify-center">
        <section className="relative min-w-420pxr h-full rounded-[10px] flex flex-col items-center justify-center">
          <div
            className="absolute top-0 left-0 w-full h-full rounded-[10px]"
            style={{
              background: `url(${ImageBookSample}) lightgray 50% / cover no-repeat`,
              filter: 'blur(15px)',
              zIndex: 1,
            }}
          />
          <img
            src={ImageBookSample}
            alt="Sample"
            className="relative w-210pxr h-285pxr rounded-[10px] shadow-[10px_10px_2px_rgba(0,0,0,0.40)] z-10"
          />
          <div className="h-26pxr" />
          <Text fontSize={24} fontWeight={800} color="1C1C1E" className="z-10">
            토끼와 거북이
          </Text>
          <div className="h-81pxr" />
          <div className="flex gap-16pxr z-10">
            <div className="flex flex-col gap-10pxr">
              <div className="w-72pxr h-72pxr flex items-center justify-center bg-white rounded-full">
                <IconBookBlack />
              </div>
              <Text
                fontSize={24}
                fontWeight={800}
                color="1C1C1E"
                className="text-center"
              >
                읽기
              </Text>
            </div>
            <div className="flex flex-col gap-10pxr">
              <div className="h-72pxr px-25pxr items-center rounded-full bg-black flex gap-4pxr">
                <IconBrainYellow />
                <Text fontSize={20} fontWeight={800} color="yellow">
                  토론하기
                </Text>
              </div>
              <Text
                fontSize={24}
                fontWeight={800}
                color="1C1C1E"
                className="text-center"
              >
                토론하기
              </Text>
            </div>
          </div>
        </section>
        <section className="h-full flex flex-col flex-grow pt-46pxr px-56pxr">
          <Text fontSize={24} fontWeight={800} color="1C1C1E">
            이 책은요
          </Text>
          <div className="h-24pxr" />
          <Text fontSize={20} fontWeight={800} color="1C1C1E">
            줄거리
          </Text>
          <div className="h-7pxr" />
          <Text fontSize={20} fontWeight={400} color="48484A">
            단순히 토끼와 거북이의 승패를 가른 한바탕 경주 이야기에 그치지
            않습니다. 포기하지 않는 인내심으로 경주에서 승리한 거북이뿐만
            아니라, 자신의 패배를 인정하고 거북이를 즐겁게 축하해 주는 토끼의
            모습에서 독자들은 〈속도가 느려도 꾸준히 달리면 경주에서
            이긴다〉라는 낯익은 교훈과 함께 〈이기는 것이 전부는 아니다〉라는
            작가의 새로운 메시지를 만날 수 있습니다.
          </Text>
          <div className="h-36pxr" />
          <Text fontSize={20} fontWeight={800} color="1C1C1E">
            키워드
          </Text>
          <div className="h-7pxr" />
          <div className="flex gap-12pxr">
            <div className="px-20pxr py-6pxr border-[1.2px] rounded-10pxr border-48484A">
              <Text fontSize={18} fontWeight={400} color="1C1C1E">
                동물
              </Text>
            </div>
            <div className="px-20pxr py-6pxr border-[1.2px] rounded-10pxr border-48484A">
              <Text fontSize={18} fontWeight={400} color="1C1C1E">
                이솝우화
              </Text>
            </div>
          </div>
          <div className="h-32pxr" />
          <div className="flex flex-col gap-11pxr">
            <div className="flex gap-10pxr">
              <Text fontSize={20} fontWeight={800} color="48484A">
                글쓴이
              </Text>
              <Text fontSize={20} fontWeight={400} color="48484A">
                김토끼
              </Text>
            </div>
            <div className="flex gap-10pxr">
              <Text fontSize={20} fontWeight={800} color="48484A">
                출판사
              </Text>
              <Text fontSize={20} fontWeight={400} color="48484A">
                개과천선이야호
              </Text>
            </div>
            <div className="flex gap-10pxr">
              <Text fontSize={20} fontWeight={800} color="48484A">
                발행일
              </Text>
              <Text fontSize={20} fontWeight={400} color="48484A">
                2020.02.02
              </Text>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
