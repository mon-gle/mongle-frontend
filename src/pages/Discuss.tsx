import DiscussBook from '@/components/discuss/DiscussBook';
import DiscussContent from '@/components/discuss/DiscussContent';
import { DiscussHeader } from '@/components/discuss/DiscussHeader';
import DiscussIntro from '@/components/discuss/DiscussIntro';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function Discuss() {
  const [currentStep, setCurrentStep] = useState(1);
  const [discussionData, setDiscussionData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userSelect, setUserSelect] = useState<string>('');

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 7));
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const { id } = useParams<{ id: string }>();
  const allStories = JSON.parse(localStorage.getItem('storyData') || '[]');
  const storyData = allStories.stories.find(
    (story: { id: string }) => story.id === id
  );
  const sess_id = uuidv4();
  const fetchDiscussion = async (prompt: string) => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
      body: JSON.stringify({
        model: 'helpy-pro',
        sess_id,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    };

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_HELPY}`,
        options
      );
      const result = await response.json();
      return result.choices[0].message.content;
    } catch (error) {
      console.error('Failed to fetch discussion data:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const getFirst = async () => {
      const firstResponse = await fetchDiscussion(
        `${storyData.title} 동화책을 기반으로 찬성/반대 토론을 진행하고자해. 6세가 이해할 수 있게 주제 정해줘. 질문 주제에 대해 O,X로 결과가 꼭 나뉘어야해. 주제의 키는 subject, 찬성의 키는 pros, 반대의 키는 cons로 해서 무조건 json만 반환해줘. 말투는 어린애에게 하는 말투로 해줘 의견은 한 문장으로 조리있게 해줘`
      );
      setDiscussionData(firstResponse);
    };
    getFirst();
  }, []);

  const handleSelect = async (selectOption: string) => {
    setUserSelect(selectOption);
    handleNextStep();
  };
  return (
    <main className="w-full h-full flex flex-col">
      <DiscussHeader title={storyData.title} />
      <section className="w-full h-8pxr flex gap-5pxr relative">
        {Array.from({ length: 7 }, (_, index) => (
          <div
            key={index}
            className={`w-full h-full ${
              index + 1 <= currentStep ? 'bg-yellow' : 'bg-f4f4f4'
            }`}
          />
        ))}
      </section>
      {loading && currentStep === 2 && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-center">
            <p className="text-white text-xl font-bold">Loading...</p>
          </div>
        </div>
      )}
      {currentStep === 1 && (
        <DiscussIntro handleStart={handleNextStep} title={storyData.title} />
      )}
      {currentStep === 2 && discussionData && (
        <div className="flex-grow flex pt-20pxr justify-center">
          <DiscussContent
            discussionData={discussionData}
            completeSelect={handleSelect}
          />
        </div>
      )}
      {currentStep === 3 && (
        <div className="flex-grow flex pt-20pxr justify-center">
          <DiscussBook
            userSelect={userSelect}
            title={storyData.title}
            sess_id={sess_id}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        </div>
      )}
    </main>
  );
}
