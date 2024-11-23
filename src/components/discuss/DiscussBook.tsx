import {
  IconCloud,
  IconLeftArrow,
  IconLeftPage,
  IconMicBlack,
  IconMongleTrans,
  IconRightArrow,
  IconRightPage,
  IconSharpLeft,
  IconSharpRight,
} from '@/assets/icons';
import { useEffect, useRef, useState } from 'react';
import { Text } from '../common/Text';

interface DiscussBookProps {
  userSelect: string;
  title: string;
  sess_id: string;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}
export default function DiscussBook({
  userSelect,
  title,
  sess_id,
  handleNextStep,
  handlePreviousStep,
}: DiscussBookProps) {
  const [mongle, setMongle] = useState('');
  const [loading, setLoading] = useState(false);
  const [recordStart, setRecordStart] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [savedTranscripts, setSavedTranscripts] = useState<string[]>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Web Speech API 초기화
  const initRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('이 브라우저는 음성 인식을 지원하지 않습니다.');
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcriptArray = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');
      setTranscript(transcriptArray);
    };

    recognition.onerror = (event) => {
      console.error('SpeechRecognition Error:', event.error);
    };

    recognition.onend = () => {
      if (listening) {
        recognition.start();
      }
    };

    return recognition;
  };

  // 녹음 시작/중단
  const toggleRecording = () => {
    if (!recognitionRef.current) {
      recognitionRef.current = initRecognition();
    }

    if (!recognitionRef.current) {
      return;
    }

    if (listening) {
      recognitionRef.current.stop();
      setSavedTranscripts((prev) => [...prev, transcript]);
      setTranscript('');
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
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
        `앞서 생성한 ${title} 토론 주제 기억하지? ${userSelect} 의견에 반대되는 / 반박하는 의견을 주장해줘. 6세와 토론하고 있으니 논리적이지만 이해할 수 있는 문장 구사를 해줘. 2문장 이내로 짧고 조리있게 답변해줘. 상대를 존중하는 태도를 보였으면 좋겠어. 반말로 해줘..`
      );
      setMongle(firstResponse);
    };
    getFirst();
  }, []);
  return (
    <main>
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-center">
            <p className="text-white text-xl font-bold">Loading...</p>
          </div>
        </div>
      )}
      {recordStart && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div className="flex flex-col pb-30pxr items-center gap-12pxr">
            {!listening ? (
              <Text fontSize={16} fontWeight={400} color="white">
                준비가 되었으면 버튼을 눌러줘!
              </Text>
            ) : (
              <div className="flex flex-col gap-12pxr">
                <div className="flex gap-8pxr items-center">
                  <IconMongleTrans />
                  <Text fontSize={28} fontWeight={800} color="white">
                    몽글이의 의견에 논리적으로 반박해봐!
                  </Text>
                </div>
                <div className="relative w-724pxr min-h-150pxr h-fit rounded-16pxr px-40pxr py-16pxr bg-white">
                  <div className="flex">
                    <Text fontSize={20} fontWeight={800} color="48484A">
                      {transcript}
                      <div className="w-[3px] h-30pxr inline-block bg-[#FFDB00] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]" />
                    </Text>
                  </div>
                  <IconSharpRight className="absolute -right-20pxr top-5pxr" />
                  <div className="absolute -top-5pxr -right-100pxr flex items-center justify-center bg-white rounded-full w-72pxr h-72pxr">
                    <Text fontSize={32} fontWeight={800}>
                      나
                    </Text>
                  </div>
                </div>
              </div>
            )}

            <IconMicBlack
              className="cursor-pointer"
              onClick={toggleRecording}
            />
          </div>
        </div>
      )}
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
            <div className="w-full h-full px-36pxr pt-40pxr">
              <div className="relative">
                <div className="flex gap-28pxr">
                  <div className="relative bg-black flex items-center justify-center rounded-full w-75pxr h-75pxr border-2pxr border-f4f4f4">
                    <IconCloud />
                  </div>
                  <div className="w-296pxr h-fit min-h-100pxr bg-black rounded-16pxr px-30pxr py-18pxr">
                    <Text
                      fontSize={16}
                      fontWeight={400}
                      color="white"
                      className="break-keep"
                    >
                      {mongle}
                    </Text>
                  </div>
                </div>
                <div className="absolute top-40pxr left-80pxr">
                  <IconSharpLeft />
                </div>
              </div>
            </div>
            <div
              className="absolute left-0 bottom-0 cursor-pointer bg-[#FFF4DC] rounded-l-10pxr"
              onClick={handlePreviousStep}
            >
              <IconLeftPage />
            </div>
            <div
              className="absolute left-50pxr bottom-36pxr flex flex-col items-end cursor-pointer"
              onClick={handlePreviousStep}
            >
              <Text fontSize={16} fontWeight={400} color="636366">
                이전
              </Text>
              <IconLeftArrow />
            </div>
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
            <div className="h-36pxr" />
            <div
              className="absolute right-0 bottom-0 cursor-pointer bg-[#FFF4DC] rounded-r-10pxr"
              onClick={handleNextStep}
            >
              <IconRightPage />
            </div>
            <div
              className={`absolute right-50pxr bottom-36pxr flex flex-col items-start cursor-pointer`}
              onClick={() => setRecordStart(true)}
            >
              <Text fontSize={16} fontWeight={400} color="636366">
                다음
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
