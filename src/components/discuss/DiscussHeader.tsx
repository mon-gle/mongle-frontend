import { IconLeftBlue } from '@/assets/icons';
import { Text } from '@/components/common/Text';
import { useNavigate } from 'react-router-dom';

interface DiscussHeaderProps {
  title: string;
}

export const DiscussHeader = ({ title }: DiscussHeaderProps) => {
  const navigate = useNavigate();

  return (
    <section className="flex justify-between items-center px-12pxr py-8pxr">
      <div
        className="flex w-89pxr h-44pxr gap-6pxr items-center cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <IconLeftBlue />
        <Text fontSize={17} fontWeight={400} color="007AFF">
          뒤로가기
        </Text>
      </div>
      <Text fontSize={17} fontWeight={400}>
        {title} | 나만의 결말 만들기
      </Text>
      <div className="w-89pxr" />
    </section>
  );
};
