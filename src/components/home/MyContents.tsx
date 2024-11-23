import { useState, useEffect } from 'react';
import { Text } from '../common/Text';
import ImageBookSample from '@/assets/images/image_book_sample.png';
import { IconHanger, IconMongleBook, IconPlus, IconUp } from '@/assets/icons';
import ImageTutorial from '@/assets/images/image_tutorial.png';

export default function MyContents() {
  return (
    <main
      className="px-64pxr flex flex-col overflow-y-scroll
      "
    >
      <div className="h-50pxr" />
      <Text fontSize={28} fontWeight={800} color="1C1C1E" className="px-4pxr">
        나의책장에서는
        <br />
        내가 읽은 책들이 모아져있어요!
      </Text>
      <div className="h-36pxr" />
      <section className="flex gap-20pxr">
        <section className="relative flex gap-11pxr items-center flex-col pt-26pxr px-24pxr w-256pxr h-192pxr bg-yellow rounded-8pxr">
          <Text fontSize={16} fontWeight={800} color="1C1C1E" className="z-50">
            지금까지 몽글님이 읽은 책!
          </Text>
          <div className="bg-black w-208pxr h-30pxr rounded-33pxr px-35pxr flex items-center justify-between relative z-50">
            <Text fontSize={15} fontWeight={800} color="yellow">
              level 5
            </Text>
            <div className="absolute left-1/2 transform -translate-x-1/2 text-white">
              |
            </div>
            <span className="flex items-center">
              <Text fontSize={17} fontWeight={800} color="yellow">
                20
              </Text>
              <Text fontSize={15} fontWeight={400} color="yellow">
                권
              </Text>
            </span>
          </div>

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
          <div className="absolute top-0 left-44pxr flex items-center gap-8pxr">
            <Text fontSize={15} fontWeight={800} color="2C2C2E">
              내가 만든 결말
            </Text>
          </div>
          <div className="pl-29pxr flex gap-16pxr overflow-x-scroll pb-21pxr pr-10pxr">
            <div className="w-132pxr h-132pxr">
              <div className="relative w-full h-full rounded-[8.788px] border border-[#F4F4F4] shadow-[5px_5px_5px_rgba(0,0,0,0.10)] overflow-hidden">
                <div className="absolute top-0 z-50 w-full h-full left-0 rounded-[8.788px] border border-[#F4F4F4] shadow-[5px_5px_5px_rgba(0,0,0,0.10)] bg-[linear-gradient(180deg,_rgba(0,0,0,0)_66.29%,_#000_82.95%)]"></div>
                <img
                  src={ImageBookSample}
                  alt="샘플"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-13pxr flex flex-col items-center gap-5pxr bottom-0 z-[51]">
                  <div className="rounded-[25px] flex items-center justify-center border-[0.6px] border-black bg-[rgba(255,255,255,0.8)] w-45pxr h-17pxr">
                    <Text fontSize={10} fontWeight={600}>
                      5일전
                    </Text>
                  </div>
                  <Text fontSize={14} fontWeight={600} color="white">
                    엄마 몰래
                  </Text>
                </div>
              </div>
            </div>
            <div className="w-132pxr h-132pxr">
              <div className="relative w-full h-full rounded-[8.788px] border border-[#F4F4F4] shadow-[5px_5px_5px_rgba(0,0,0,0.10)] overflow-hidden">
                <div className="absolute top-0 z-50 w-full h-full left-0 rounded-[8.788px] border border-[#F4F4F4] shadow-[5px_5px_5px_rgba(0,0,0,0.10)] bg-[linear-gradient(180deg,_rgba(0,0,0,0)_66.29%,_#000_82.95%)]"></div>
                <img
                  src={ImageBookSample}
                  alt="샘플"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-13pxr flex flex-col items-center gap-5pxr bottom-0 z-[51]">
                  <div className="rounded-[25px] flex items-center justify-center border-[0.6px] border-black bg-[rgba(255,255,255,0.8)] w-45pxr h-17pxr">
                    <Text fontSize={10} fontWeight={600}>
                      5일전
                    </Text>
                  </div>
                  <Text fontSize={14} fontWeight={600} color="white">
                    엄마 몰래
                  </Text>
                </div>
              </div>
            </div>
            <div
              className="w-132pxr bg-white h-132pxr flex flex-col gap-10pxr justify-between items-center cursor-pointer py-10pxr px-5pxr rounded-[8.788px] border-[#F4F4F4]
             shadow-[5px_5px_5px_rgba(0,0,0,0.15)] overflow-hidden"
            >
              <div className="relative flex justify-center items-center w-108pxr h-109pxr bg-f4f4f4 rounded-6pxr">
                <IconPlus />
                <IconMongleBook className="absolute -right-10pxr -bottom-10pxr" />
              </div>
              <Text fontSize={14} fontWeight={800} color="AEAEB2">
                새 결말 만들기
              </Text>
            </div>
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
          <div key={index} className="flex flex-col gap-12pxr">
            <img
              src={ImageBookSample}
              alt="샘플"
              className="min-w-118pxr max-w-118pxr h-172pxr rounded-[8.788px] border border-f4f4f4 bg-gray-200 bg-center bg-cover shadow-[5px_5px_5px_rgba(0,0,0,0.15)]"
            />
            <Text fontSize={16} fontWeight={800} color="1C1C1E">
              곰의 행복 {index + 1}
            </Text>
          </div>
        ))}
        <div
          className="min-w-118pxr h-172pxr flex flex-col justify-between items-center cursor-pointer py-10pxr px-5pxr rounded-[8.788px] border-[#F4F4F4]
             shadow-[5px_5px_5px_rgba(0,0,0,0.15)]"
        >
          <div className="relative flex justify-center items-center w-108pxr h-109pxr bg-f4f4f4 rounded-6pxr">
            <IconPlus />
            <IconMongleBook className="absolute right-0 bottom-0" />
          </div>
          <Text fontSize={13} fontWeight={800} color="AEAEB2">
            다른동화 둘러보기
          </Text>
        </div>
      </section>
      <div className="h-20pxr" />
    </main>
  );
}
