import { StoryHeader } from '@/components/story/StoryHeader';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import storyData from '@/data/books/rnt.json';
import { Text } from '@/components/common/Text';
import {
  IconLeftArrow,
  IconLeftPage,
  IconRefresh,
  IconReward,
  IconRightArrow,
  IconRightPage,
} from '@/assets/icons';

export default function Story() {
  const { id } = useParams<{ id: string }>();
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState<{ [key: number]: string | null }>({});
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const fetchImage = async (title: string) => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
      body: JSON.stringify({
        prompt: title,
        style: 'comic',
        width: 512,
        height: 512,
        steps: 4,
        num: 1,
      }),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/generate`,
        options
      );
      const result = await response.json();
      return `data:image/png;base64,${result.predictions}`;
    } catch (error) {
      console.error(`Failed to fetch image for title "${title}":`, error);
      return null;
    }
  };

  const handleNextStep = () => {
    if (currentStep === storyData.content.length) {
      setFinished(true);
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, storyData.content.length));
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };
  const handleResetStep = () => {
    setCurrentStep(1);
    setFinished(false);
  };

  useEffect(() => {
    const loadInitialImage = async () => {
      setLoading(true);
      const firstTitle = storyData.content[0].title;
      const firstImage = await fetchImage(firstTitle);
      setImages((prev) => ({ ...prev, 1: firstImage }));
      setLoading(false);

      const prefetchRemainingImages = async () => {
        for (let i = 1; i < storyData.content.length; i++) {
          const stepIndex = i + 1;
          const title = storyData.content[i].title;
          const image = await fetchImage(title);
          setImages((prev) => ({ ...prev, [stepIndex]: image }));
        }
      };

      prefetchRemainingImages();
    };

    loadInitialImage();
  }, []);

  return (
    <main className="w-full h-full flex flex-col relative">
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-center">
            <Text fontSize={24} fontWeight={800} color="white">
              Loading...
            </Text>
          </div>
        </div>
      )}
      {finished && (
        <div className="absolute w-full h-full inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="text-center flex flex-col">
            <Text fontSize={28} fontWeight={800} color="white">
              독서 완료 보상
            </Text>
            <Text fontSize={60} fontWeight={800} color="yellow">
              +100p
            </Text>
            <IconReward />
          </div>
          <div className="fixed bottom-0 z-50 w-full h-68pxr bg-white flex">
            <div
              className="w-full flex items-center gap-8pxr justify-center cursor-pointer bg-AEAEB2"
              onClick={handleResetStep}
            >
              <IconRefresh />
              <Text fontSize={28} fontWeight={800} color="white">
                다시 읽기
              </Text>
            </div>
            <div className="w-full flex items-center justify-center cursor-pointer bg-yellow">
              <Text fontSize={28} fontWeight={800} color="1C1C1E">
                종료
              </Text>
            </div>
          </div>
        </div>
      )}
      <StoryHeader title="토끼와 거북이" />
      <section className="w-full h-8pxr flex gap-5pxr relative">
        {Array.from({ length: storyData.content.length }, (_, index) => (
          <div
            key={index}
            className={`w-full h-full ${
              index + 1 <= currentStep ? 'bg-yellow' : 'bg-f4f4f4'
            }`}
          />
        ))}
      </section>
      <section className="flex-grow flex justify-center mt-20pxr">
        <div className="relative flex h-fit">
          {/* 왼쪽 페이지 */}
          <div
            className="relative w-[481px] h-[582px] rounded-[10px] bg-[#FFF4DC] shadow-[5px_10px_10px_rgba(0,0,0,0.25)] flex items-center justify-center z-10"
            style={{
              background: `
              linear-gradient(322deg, rgba(0, 0, 0, 0.00) 82.44%, rgba(0, 0, 0, 0.10) 100%), 
              linear-gradient(90deg, rgba(0, 0, 0, 0.00) 85.45%, rgba(0, 0, 0, 0.15) 100%), 
              #FFF4DC`,
            }}
          >
            {images[currentStep] ? (
              <img
                src={images[currentStep] as string}
                alt={`Generated story scene ${currentStep}`}
                className="w-[417px] h-[518px] object-cover rounded-[10px]"
              />
            ) : (
              <Text fontSize={16} fontWeight={400} color="48484A">
                이미지 생성 중...
              </Text>
            )}
            {currentStep !== 1 && (
              <div
                className="absolute left-0 bottom-0 cursor-pointer bg-[#FFF4DC] rounded-l-10pxr"
                onClick={handlePreviousStep}
              >
                <IconLeftPage />
              </div>
            )}
            {currentStep !== 1 && (
              <div
                className="absolute left-50pxr bottom-36pxr flex flex-col items-end cursor-pointer"
                onClick={handlePreviousStep}
              >
                <Text fontSize={16} fontWeight={400} color="636366">
                  이전
                </Text>
                <IconLeftArrow />
              </div>
            )}
          </div>
          {/* 오른쪽 페이지 */}
          <div
            className="relative w-[481px] h-[582px] flex flex-col rounded-[10px] bg-[#FFF4DC] shadow-[10px_10px_10px_rgba(0,0,0,0.25)] z-10"
            style={{
              background: `
              linear-gradient(142deg, rgba(0, 0, 0, 0.00) 82.44%, rgba(0, 0, 0, 0.10) 100%), 
              linear-gradient(270deg, rgba(0, 0, 0, 0.00) 85.45%, rgba(0, 0, 0, 0.15) 100%), 
              #FFF4DC`,
            }}
          >
            <div className="h-56pxr" />
            <Text
              fontSize={24}
              fontWeight={800}
              color="1C1C1E"
              className="px-36pxr"
            >
              {storyData.content[currentStep - 1].title}
            </Text>
            <div className="h-36pxr" />
            <div className="flex flex-col gap-24pxr items-start justify-start w-full h-full text-center px-36pxr">
              {storyData.content[currentStep - 1].content
                .split('\n')
                .map((line, index) => (
                  <Text
                    key={index}
                    fontSize={20}
                    fontWeight={400}
                    className="text-start"
                  >
                    {line}
                  </Text>
                ))}
            </div>
            <div
              className="absolute right-0 bottom-0 cursor-pointer bg-[#FFF4DC] rounded-r-10pxr"
              onClick={handleNextStep}
            >
              <IconRightPage />
            </div>
            <div
              className={`absolute ${currentStep === storyData.content.length ? 'right-36pxr' : 'right-50pxr'} bottom-36pxr flex flex-col items-start cursor-pointer`}
              onClick={handleNextStep}
            >
              <Text fontSize={16} fontWeight={400} color="636366">
                {currentStep === storyData.content.length ? '마지막' : '다음'}
              </Text>
              <IconRightArrow />
            </div>
          </div>
          <div className="absolute w-1000pxr h-600pxr -left-20pxr -bottom-30pxr rounded-10pxr bg-yellow" />
        </div>
      </section>
    </main>
  );
}
