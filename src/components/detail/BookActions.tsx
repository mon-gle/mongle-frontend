import { IconBookBlack, IconBrainYellow } from '@/assets/icons';
import { Text } from '@/components/common/Text';

export const BookActions = () => {
  return (
    <div className="flex gap-16pxr z-10">
      <div className="flex flex-col gap-10pxr">
        <div className="w-72pxr h-72pxr flex items-center justify-center bg-white rounded-full">
          <IconBookBlack />
        </div>
        <Text
          fontSize={24}
          fontWeight={800}
          color="1C1C1E"
          className="text-center"
        >
          읽기
        </Text>
      </div>
      <div className="flex flex-col gap-10pxr">
        <div className="h-72pxr px-25pxr items-center rounded-full bg-black flex gap-4pxr">
          <IconBrainYellow />
          <Text fontSize={20} fontWeight={800} color="yellow">
            토론하기
          </Text>
        </div>
        <Text
          fontSize={24}
          fontWeight={800}
          color="1C1C1E"
          className="text-center"
        >
          토론하기
        </Text>
      </div>
    </div>
  );
};
