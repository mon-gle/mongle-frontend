import {
  IconClock,
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
import babyMP3 from '@/assets/audio/baby.mp3';
import useUuidStore from '@/store/useUuidStore';

interface DiscussBookProps {
  userSelect: string;
  title: string;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  setUserAnswer: (s: string[]) => void;
}
export default function DiscussBook({
  userSelect,
  title,
  handleNextStep,
  handlePreviousStep,
  setUserAnswer,
}: DiscussBookProps) {
  const [mongle, setMongle] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [recordStart, setRecordStart] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [savedTranscripts, setSavedTranscripts] = useState<string[]>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [timer, setTimer] = useState(80);
  const timerRef = useRef<number | null>(null);
  const [pausedTime, setPausedTime] = useState<number>(80);
  const { uuid } = useUuidStore();
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setPausedTime(timer);
    }
  };

  const startTimer = () => {
    setTimer(pausedTime);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timerRef.current!);
          handleNextStep();
          return 0;
        }
      });
    }, 1000);
  };
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timerRef.current!);
          setUserAnswer(savedTranscripts);
          handleNextStep();
          return 0;
        }
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [pausedTime]);
  useEffect(() => {
    // webkitSpeechRecognition을 window 객체에서 가져오도록 타입 선언
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('이 브라우저는 음성 인식을 지원하지 않습니다.');
      return;
    }

    // webkitSpeechRecognition 초기화
    if ('webkitSpeechRecognition' in window) {
      const recognition = new SpeechRecognition(); // window.webkitSpeechRecognition 대신 사용
      recognition.lang = 'ko-KR';
      recognition.interimResults = true;
      recognition.continuous = true;

      // recognition을 ref에 저장
      recognitionRef.current = recognition;
      recognitionRef.current!.onresult = (event: SpeechRecognitionEvent) => {
        const transcriptArray = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('');
        setTranscript(transcriptArray);
      };

      recognitionRef.current!.onerror = (event: any) => {
        console.error('SpeechRecognition Error:', event.error);
      };

      recognitionRef.current!.onend = () => {
        if (listening) {
          recognitionRef.current!.start();
        }
      };
    }
  }, []);
  // 녹음 시작/중단
  const toggleRecording = () => {
    if (!recognitionRef.current) {
      return;
    }

    if (listening) {
      recognitionRef.current.stop();
      if (transcript) setSavedTranscripts((prev) => [...prev, transcript]);
      setTranscript('');
      setListening(false);
      setRecordStart(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };
  const handleRecordStart = () => {
    if (savedTranscripts.length === 2) {
      setUserAnswer(savedTranscripts);
      handleNextStep();
      return;
    }
    setRecordStart(true);
  };
  const fetchDiscussionAndPlayAudio = async (
    prompt: string
  ): Promise<string | void> => {
    setLoading(true);
    stopTimer();

    const optionsForDiscussion = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
      body: JSON.stringify({
        model: 'helpy-pro',
        sess_id: uuid,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    };

    try {
      const discussionResponse = await fetch(
        `${import.meta.env.VITE_API_HELPY}`,
        optionsForDiscussion
      );
      const discussionResult = await discussionResponse.json();
      const discussionContent = discussionResult.choices[0].message.content;
      const speech = new SpeechSynthesisUtterance(discussionContent);
      window.speechSynthesis.speak(speech);
      return discussionContent;
      // Elice Speech API
      const audioResponse = await fetch(babyMP3);
      const audioBlob = await audioResponse.blob();

      const form = new FormData();
      form.append('text', discussionContent);
      form.append('audio', audioBlob, 'baby.mp3');

      const optionsForAudio = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
        body: form,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_SPEECH}`,
        optionsForAudio
      );

      const audioBlobResponse = await response.blob();

      const audioUrl = URL.createObjectURL(audioBlobResponse);
      const audios = new Audio(audioUrl);
      audios.play();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      startTimer();
    }
  };

  useEffect(() => {
    const getFirst = async () => {
      const firstResponse = await fetchDiscussionAndPlayAudio(
        `앞서 생성한 ${title} 토론 주제 기억하지? ${userSelect} 의견에 반대되는 / 반박하는 의견을 주장해줘. 6세와 토론하고 있으니 논리적이지만 이해할 수 있는 문장 구사를 해줘. 2문장 이내로 짧고 조리있게 답변해줘. 상대를 존중하는 태도를 보였으면 좋겠어. 반말로 해줘..`
      );
      if (firstResponse) setMongle((prev) => [...prev, firstResponse]);
    };
    getFirst();
  }, []);

  useEffect(() => {
    if (savedTranscripts.length == 1) {
      const fetchResponse = async () => {
        const latestTranscript = savedTranscripts[savedTranscripts.length - 1];
        const response = await fetchDiscussionAndPlayAudio(
          `방금 네가  ${title} 를 주제로 한 토론에 대해 친구가 반박을 했어. ${latestTranscript} 라고 하는데? 이거에 대해서도 반박해줘. 6세 아이에게 이야기하는 말투로 반말을 사용해. 답변은 2문장 이내로 짧지만 조리있게 주장해줘. 이전에 했던 주장이랑은 다른 근거를 분석적이고 비판적으로 제시해주어야해.`
        );
        if (response) setMongle((prev) => [...prev, response]);
      };
      fetchResponse();
    }
  }, [savedTranscripts]);
  return (
    <main>
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-center">
            <p className="text-white text-xl font-bold">
              토론 내용을 준비하는 중...
            </p>
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
            <div className="relative flex items-center justify-center">
              {listening && (
                <div className="absolute w-20 h-20 z-[5] rounded-full bg-white/60 animate-scale-pulse"></div>
              )}

              {/* Microphone Icon */}
              <IconMicBlack
                className="cursor-pointer z-10 relative"
                onClick={toggleRecording}
              />
            </div>
          </div>
        </div>
      )}
      <section className="flex-grow flex justify-center mt-10pxr">
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
            <div className="w-full h-full px-36pxr pt-40pxr overflow-y-scroll">
              <div className="relative flex flex-col gap-50pxr ">
                {mongle.map((text, _) => (
                  <div>
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
                          {text}
                        </Text>
                      </div>
                    </div>
                    <div className="absolute top-40pxr left-80pxr">
                      <IconSharpLeft />
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-50pxr" />
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
            <div className="absolute top-20pxr right-20pxr flex items-center justify-center">
              <IconClock />
            </div>
            <Text
              fontSize={18}
              fontWeight={800}
              className="absolute top-50pxr right-48pxr"
            >
              {timer}
            </Text>
            <div className="flex flex-col gap-50pxr px-42pxr mt-120pxr pt-30pxr overflow-y-scroll">
              {savedTranscripts.map((text, _) => (
                <div className="relative w-295pxr h-fit rounded-16pxr px-40pxr py-16pxr bg-white">
                  <div className="flex">
                    <Text fontSize={16} fontWeight={400} color="48484A">
                      {text}
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
              ))}
              <div className="h-50pxr" />
            </div>
            <div className="absolute right-0 bottom-0 cursor-pointer bg-[#FFF4DC] rounded-r-10pxr">
              <IconRightPage />
            </div>
            <div
              className={`absolute right-50pxr bottom-36pxr flex flex-col items-start cursor-pointer`}
              onClick={handleRecordStart}
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
