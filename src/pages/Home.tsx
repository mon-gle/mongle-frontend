import { IconSearch } from '@/assets/icons';
import { useState } from 'react';
import HomeContents from '@/components/home/HomeContents';
import AllContents from '@/components/home/AllContents';
import MyContents from '@/components/home/MyContents';

export default function Home() {
  const [activeTab, setActiveTab] = useState('홈');

  const tabs = ['홈', '모든책', '나의책장'];

  return (
    <main className="w-full h-full">
      {/**
       * 헤더
       */}
      <section className="w-full mb-1pxr bg-white h-76pxr flex items-end justify-between px-64pxr fixed border-b-3pxr border-f4f4f4">
        <div className="flex justify-center">
          {tabs.map((tab) => (
            <div
              key={tab}
              className="flex flex-col items-center justify-center cursor-pointer"
              onClick={() => setActiveTab(tab)}
            >
              <div
                className={`min-w-118pxr h-40pxr flex items-center justify-center text-xl font-semibold ${
                  activeTab === tab ? 'text-black' : 'text-AEAEB2'
                }`}
              >
                {tab}
              </div>
              <div
                className={`min-w-118pxr h-8pxr ${
                  activeTab === tab ? 'bg-yellow' : 'bg-transparent'
                }`}
              />
            </div>
          ))}
        </div>
        <div className="pb-18pxr">
          <IconSearch />
        </div>
      </section>

      {/**
       * 콘텐츠
       */}
      <section className="pt-76pxr">
        {activeTab === '홈' && <HomeContents />}
        {activeTab === '모든책' && <AllContents />}
        {activeTab === '나의책장' && <MyContents />}
      </section>
    </main>
  );
}
