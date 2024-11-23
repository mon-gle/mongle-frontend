import { IconBookWhite, IconBrainWhite, IconUnlock } from '@/assets/icons';
import { Text } from '@/components/common/Text';
import { useNavigate } from 'react-router-dom';

export const BookActions = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const handleReadStory = () => {
    navigate(`/story/${id}`);
  };
  const handleDiscussStory = () => {
    navigate(`/discuss/${id}`);
  };
  return (
    <div className="flex flex-col gap-16pxr z-10">
      <div className="flex gap-10pxr items-center">
        <div className="w-46pxr h-46pxr border-4pxr border-1C1C1E rounded-full flex items-center justify-center">
          <IconUnlock />
        </div>
        <div
          className="w-244pxr h-60pxr flex gap-12pxr items-center pl-30pxr cursor-pointer rounded-10pxr bg-black"
          onClick={handleReadStory}
        >
          <IconBookWhite />
          <Text fontSize={20} fontWeight={800} color="white">
            기본 책읽기
          </Text>
        </div>
      </div>
      <div className="flex gap-10pxr items-center">
        <div className="w-46pxr h-46pxr border-4pxr border-1C1C1E rounded-full flex items-center justify-center">
          <IconUnlock />
        </div>
        <div
          className="w-244pxr h-60pxr flex gap-12pxr items-center pl-30pxr cursor-pointer rounded-10pxr bg-black"
          onClick={handleDiscussStory}
        >
          <IconBrainWhite />
          <Text fontSize={20} fontWeight={800} color="white">
            AI와 토론하기
          </Text>
        </div>
      </div>
    </div>
  );
};
