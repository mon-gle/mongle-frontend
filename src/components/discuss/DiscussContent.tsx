import { useState, useEffect } from 'react';
import { Text } from '../common/Text';
import {
  IconChatLeft,
  IconChatLeftDisabled,
  IconChatRight,
  IconChatRightDisabled,
  IconCons,
  IconMongleBoth,
  IconPros,
} from '@/assets/icons';

interface DiscussionContentProps {
  discussionData: string;
  completeSelect: (userSelect: string) => void;
}

export default function DiscussContent({
  discussionData,
  completeSelect,
}: DiscussionContentProps) {
  const [subject, setSubject] = useState('');
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');
  const [selectedOption, setSelectedOption] = useState<'pros' | 'cons' | null>(
    null
  );

  useEffect(() => {
    try {
      const cleanedData = discussionData.replace(/```json|```/g, '').trim();
      const data = JSON.parse(cleanedData);
      setSubject(data.subject || '');
      setPros(data.pros || '');
      setCons(data.cons || '');
    } catch (error) {
      console.error('Failed to parse discussion data:', error);
    }
  }, [discussionData]);

  const handleUserSelect = () => {
    if (!selectedOption) return;
    if (selectedOption === 'cons') completeSelect(cons);
    else {
      completeSelect(pros);
    }
  };
  return (
    <section className="relative flex flex-col items-center">
      <Text fontSize={32} fontWeight={800}>
        {subject}
      </Text>
      <div className="h-30pxr" />
      <div className="flex gap-50pxr items-center">
        {/* Pros Option */}
        <div
          className="relative cursor-pointer"
          onClick={() => setSelectedOption('pros')}
        >
          {selectedOption === 'pros' ? (
            <IconChatLeft />
          ) : (
            <IconChatLeftDisabled />
          )}
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 w-214pxr top-0 flex items-center flex-col gap-8pxr h-full justify-center`}
          >
            <Text
              fontSize={16}
              fontWeight={800}
              className="text-center break-keep"
            >
              {pros}
            </Text>
            <IconPros />
          </div>
        </div>

        <div
          className="relative cursor-pointer"
          onClick={() => setSelectedOption('cons')}
        >
          {selectedOption === 'cons' ? (
            <IconChatRight />
          ) : (
            <IconChatRightDisabled />
          )}
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 w-214pxr top-0 flex items-center flex-col gap-8pxr h-full justify-center
            `}
          >
            <Text
              fontSize={16}
              fontWeight={800}
              className="text-center break-keep"
            >
              {cons}
            </Text>
            <IconCons />
          </div>
        </div>
      </div>

      <IconMongleBoth />
      <div className="fixed bottom-0 z-50 w-full h-68pxr bg-white flex">
        <div
          className={`w-full flex items-center justify-center cursor-pointer ${
            selectedOption ? 'bg-yellow' : 'bg-AEAEB2'
          }`}
          onClick={handleUserSelect}
        >
          <Text
            fontSize={28}
            fontWeight={800}
            color={`${selectedOption ? 'black' : 'f4f4f4'}`}
          >
            선택 완료
          </Text>
        </div>
      </div>
    </section>
  );
}
