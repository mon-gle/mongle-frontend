import { IconLeftBlue } from '@/assets/icons';
import { Text } from '@/components/common/Text';
import { useNavigate } from 'react-router-dom';

interface StoryHeaderProps {
  title: string;
}

export const StoryHeader = ({ title }: StoryHeaderProps) => {
  const navigate = useNavigate();

  return (
    <section className="flex justify-between items-center px-12pxr py-8pxr">
      <div
        className="flex w-89pxr h-44pxr gap-6pxr items-center cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <IconLeftBlue />
        <Text fontSize={17} fontWeight={400} color="007AFF">
          그만읽기
        </Text>
      </div>
      <Text fontSize={17} fontWeight={400}>
        {title} | 읽기
      </Text>
      <div className="w-89pxr" />
    </section>
  );
};
