import {
  IconCloud,
  IconFeather,
  IconMongleBook,
  IconPencil,
  IconPlus,
  IconText,
} from '@/assets/icons';
import { Text } from '../common/Text';
import ImageBookSample from '@/assets/images/image_book_sample.png';
import ImageMongle from '@/assets/images/image_mongle.png';

export default function HomeContents() {
  return (
    <main>
      <section className="flex justify-between pl-76pxr pr-46pxr w-full h-196pxr bg-yellow ">
        <section className="flex gap-20pxr h-full items-center">
          <div className="relative bg-black flex items-center justify-center rounded-full w-104pxr h-104pxr border-2pxr border-f4f4f4">
            <IconCloud />
            <div className="absolute flex items-center justify-center bottom-0 right-0 w-28pxr h-28pxr rounded-full bg-white border-[1.2px] border-black">
              <IconPencil />
            </div>
          </div>
          <div className="flex flex-col gap-10pxr">
            <Text fontSize={28} fontWeight={600}>
              김은우
            </Text>
            <div className="flex gap-8pxr">
              <div className="flex gap-6pxr">
                <Text fontSize={18} fontWeight={400}>
                  다 읽은 책
                </Text>
                <Text fontSize={18} fontWeight={800}>
                  2
                </Text>
              </div>
              <div className="h-24pxr w-1pxr bg-black" />
              <div className="flex gap-6pxr">
                <Text fontSize={18} fontWeight={400}>
                  읽는 중
                </Text>
                <Text fontSize={18} fontWeight={800}>
                  5
                </Text>
              </div>
            </div>
          </div>
        </section>

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
          {/* 이미지 */}
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
            <img
              src={ImageBookSample}
              alt="샘플"
              className="min-w-118pxr h-172pxr rounded-[8.788px] border border-f4f4f4 bg-gray-200 bg-center bg-cover shadow-[5px_5px_5px_rgba(0,0,0,0.15)]"
            />
            <img
              src={ImageBookSample}
              alt="샘플"
              className="min-w-118pxr h-172pxr rounded-[8.788px] border border-f4f4f4 bg-gray-200 bg-center bg-cover shadow-[5px_5px_5px_rgba(0,0,0,0.15)]"
            />
            <img
              src={ImageBookSample}
              alt="샘플"
              className="min-w-118pxr h-172pxr rounded-[8.788px] border border-f4f4f4 bg-gray-200 bg-center bg-cover shadow-[5px_5px_5px_rgba(0,0,0,0.15)]"
            />
            <img
              src={ImageBookSample}
              alt="샘플"
              className="min-w-118pxr h-172pxr rounded-[8.788px] border border-f4f4f4 bg-gray-200 bg-center bg-cover shadow-[5px_5px_5px_rgba(0,0,0,0.15)]"
            />
            <img
              src={ImageBookSample}
              alt="샘플"
              className="min-w-118pxr h-172pxr rounded-[8.788px] border border-f4f4f4 bg-gray-200 bg-center bg-cover shadow-[5px_5px_5px_rgba(0,0,0,0.15)]"
            />
            <img
              src={ImageBookSample}
              alt="샘플"
              className="min-w-118pxr h-172pxr rounded-[8.788px] border border-f4f4f4 bg-gray-200 bg-center bg-cover shadow-[5px_5px_5px_rgba(0,0,0,0.15)]"
            />
            <img
              src={ImageBookSample}
              alt="샘플"
              className="min-w-118pxr h-172pxr rounded-[8.788px] border border-f4f4f4 bg-gray-200 bg-center bg-cover shadow-[5px_5px_5px_rgba(0,0,0,0.15)]"
            />
            <img
              src={ImageBookSample}
              alt="샘플"
              className="min-w-118pxr h-172pxr rounded-[8.788px] border border-f4f4f4 bg-gray-200 bg-center bg-cover shadow-[5px_5px_5px_rgba(0,0,0,0.15)]"
            />
            <img
              src={ImageBookSample}
              alt="샘플"
              className="min-w-118pxr h-172pxr rounded-[8.788px] border border-f4f4f4 bg-gray-200 bg-center bg-cover shadow-[5px_5px_5px_rgba(0,0,0,0.15)]"
            />
            <img
              src={ImageBookSample}
              alt="샘플"
              className="min-w-118pxr h-172pxr rounded-[8.788px] border border-f4f4f4 bg-gray-200 bg-center bg-cover shadow-[5px_5px_5px_rgba(0,0,0,0.15)]"
            />
          </div>
        </section>
        <section className="flex flex-col gap-12pxr">
          <Text fontSize={24} fontWeight={800}>
            은우님이 만든 동화책!
          </Text>
          <div className="flex gap-20pxr pb-8pxr overflow-x-scroll">
            <img
              src={ImageBookSample}
              alt="샘플"
              className="min-w-118pxr h-172pxr rounded-[8.788px] border border-f4f4f4 bg-gray-200 bg-center bg-cover shadow-[5px_5px_5px_rgba(0,0,0,0.15)]"
            />
            <div className="relative">
              <img
                src={ImageBookSample}
                alt="샘플"
                className="min-w-118pxr h-172pxr rounded-[8.788px] border border-f4f4f4 bg-gray-200 bg-center bg-cover shadow-[5px_5px_5px_rgba(0,0,0,0.15)]"
              />
              <div
                className="absolute top-0 left-0 w-full h-full pt-36pxr flex flex-col items-center gap-4pxr rounded-[8.788px] border-[#F4F4F4]
             bg-[rgba(142,142,147,0.5)] shadow-[5px_5px_5px_rgba(0,0,0,0.15)]"
              >
                <IconFeather />
                <div className="w-85pxr h-22pxr bg-black rounded-20pxr flex items-center justify-center">
                  <Text fontSize={11} fontWeight={600} color="yellow">
                    만드는 중
                  </Text>
                </div>
              </div>
            </div>
            <div
              className="min-w-118pxr h-172pxr flex flex-col justify-between items-center cursor-pointer py-10pxr px-5pxr rounded-[8.788px] border-[#F4F4F4]
             shadow-[5px_5px_5px_rgba(0,0,0,0.15)]"
            >
              <div className="relative flex justify-center items-center w-108pxr h-109pxr bg-f4f4f4 rounded-6pxr">
                <IconPlus />
                <IconMongleBook className="absolute right-0 bottom-0" />
              </div>
              <Text fontSize={14} fontWeight={800} color="AEAEB2">
                새 동화 만들기
              </Text>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
