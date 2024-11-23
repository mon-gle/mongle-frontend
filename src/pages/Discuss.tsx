import { DiscussHeader } from '@/components/discuss/DiscussHeader';
import DiscussIntro from '@/components/discuss/DiscussIntro';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Discuss() {
  const [currentStep, setCurrentStep] = useState(1);
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
      {currentStep === 1 && (
        <DiscussIntro handleStart={handleNextStep} title={storyData.title} />
      )}
      {currentStep === 2 && (
        <DiscussIntro handleStart={handleNextStep} title={storyData.title} />
      )}
    </main>
  );
}
