import { Text } from '@/components/common/Text';
import DiscussBook from '@/components/discuss/DiscussBook';
import DiscussContent from '@/components/discuss/DiscussContent';
import { DiscussHeader } from '@/components/discuss/DiscussHeader';
import DiscussIntro from '@/components/discuss/DiscussIntro';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ImageClock from '@/assets/images/image_clock.png';
import {
  IconMongleBig,
  IconRefresh,
  IconReward,
  IconSharpRight,
} from '@/assets/icons';

export default function Discuss() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [discussionData, setDiscussionData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userSelect, setUserSelect] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string[]>([]);
  const [userFeedBack, serUserFeedBack] = useState<string>('');
  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 6));
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleResetStep = () => {
    setCurrentStep(1);
  };
  const handleExit = () => {
    navigate('/home');
  };
  const { id } = useParams<{ id: string }>();
  const allStories = JSON.parse(localStorage.getItem('storyData') || '[]');
  const storyData = allStories.stories.find(
    (story: { id: string }) => story.id === id
  );
  const sess_id = uuidv4();
  // Web Speech API를 사용해 텍스트를 음성으로 변환
  const speakText = (text: string) => {
    // Web Speech API SpeechSynthesis 초기화
    const utterance = new SpeechSynthesisUtterance(text);

    // 음성 설정 (언어 및 속성)
    utterance.lang = 'ko-KR'; // 한국어
    utterance.pitch = 1; // 음 높이
    utterance.rate = 1; // 발음 속도
    utterance.volume = 1; // 볼륨

    // 음성 합성 실행
    speechSynthesis.speak(utterance);
  };
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

      const messageContent = result.choices[0].message.content;

      // TTS 호출
      speakText(messageContent);

      return messageContent;
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

  useEffect(() => {
    const getUserFinal = async () => {
      const response = await fetchDiscussion(
        `앞선 토론에 대해서 친구가 말한 내용에 대해 칭찬해줘. 논리, 설득력, 어휘 등 구체적으로 칭찬해줘. 6세 아이가 이해할 수 있는 짧고 간결한 문장이면 좋아. 반말로 작성해줘,`
      );
      serUserFeedBack(response);
    };
    getUserFinal();
  }, [userAnswer]);
  const handleSelect = async (selectOption: string) => {
    setUserSelect(selectOption);
    handleNextStep();
  };
  return (
    <main className="w-full h-full flex flex-col">
      <DiscussHeader title={storyData.title} />
      <section className="w-full h-8pxr flex gap-5pxr relative">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className={`w-full h-full ${
              index + 1 <= currentStep ? 'bg-yellow' : 'bg-f4f4f4'
            }`}
          />
        ))}
      </section>
      {loading && (currentStep === 2 || currentStep === 5) && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
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
        <div className="flex-grow flex pt-10pxr justify-center">
          <DiscussBook
            userSelect={userSelect}
            title={storyData.title}
            sess_id={sess_id}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
            setUserAnswer={setUserAnswer}
          />
        </div>
      )}
      {currentStep === 4 && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center gap-16pxr justify-center z-50">
          <div className="flex flex-col text-center">
            <Text fontSize={50} fontWeight={800} color="white">
              TIME OVER
            </Text>
            <Text fontSize={20} fontWeight={400} color="white">
              토론 시간이 모두 끝났어요
            </Text>
          </div>
          <img src={ImageClock} alt="시계" />
          <div className="fixed bottom-0 z-50 w-full h-68pxr bg-white flex">
            <div
              className={`w-full flex items-center justify-center cursor-pointer
            bg-yellow
          `}
              onClick={handleNextStep}
            >
              <Text fontSize={28} fontWeight={800}>
                다음
              </Text>
            </div>
          </div>
        </div>
      )}
      {currentStep === 5 && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col pt-200pxr items-center gap-16pxr z-50">
          <div className="relative w-724pxr bg-white rounded-16pxr pt-26pxr px-40pxr pb-50pxr flex flex-col gap-24pxr">
            {userAnswer.map((answer, _) => (
              <Text fontSize={20} fontWeight={800} color="48484A">
                {answer}
              </Text>
            ))}
            <IconSharpRight className="absolute -right-20pxr top-0" />
            <div className="absolute -top-5pxr -right-100pxr flex items-center justify-center bg-white rounded-full w-72pxr h-72pxr">
              <Text fontSize={32} fontWeight={800}>
                나
              </Text>
            </div>
            <div className="flex absolute -bottom-200pxr -left-150pxr items-center z-50">
              <IconMongleBig className="min-w-400pxr" />
              <Text fontSize={24} fontWeight={800} color="white">
                <br />
                {userFeedBack}
              </Text>
            </div>
          </div>
          <div className="fixed bottom-0 z-50 w-full h-68pxr bg-white flex">
            <div
              className={`w-full flex items-center justify-center cursor-pointer
            bg-yellow
          `}
              onClick={handleNextStep}
            >
              <Text fontSize={28} fontWeight={800}>
                확인했어
              </Text>
            </div>
          </div>
        </div>
      )}
      {currentStep === 6 && (
        <div className="absolute w-full h-full inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="text-center flex flex-col">
            <Text fontSize={28} fontWeight={800} color="white">
              독서 완료 보상
            </Text>
            <Text fontSize={60} fontWeight={800} color="yellow">
              +200p
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
                토론 다시하기
              </Text>
            </div>
            <div
              className="w-full flex items-center justify-center cursor-pointer bg-yellow"
              onClick={handleExit}
            >
              <Text fontSize={28} fontWeight={800} color="1C1C1E">
                토론 종료
              </Text>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
