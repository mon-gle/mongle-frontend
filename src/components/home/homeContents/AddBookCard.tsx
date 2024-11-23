import { IconPlus, IconMongleBook } from '@/assets/icons';
import { Text } from '@/components/common/Text';

export default function AddBookCard() {
  return (
    <div
      className="min-w-118pxr h-172pxr flex flex-col justify-between items-center cursor-pointer py-10pxr px-5pxr rounded-[8.788px] border-[#F4F4F4]
      shadow-[5px_5px_5px_rgba(0,0,0,0.15)]"
    >
      <div className="relative flex justify-center items-center w-108pxr h-109pxr bg-f4f4f4 rounded-6pxr">
        <IconPlus />
        <IconMongleBook className="absolute right-0 bottom-0" />
      </div>
      <Text fontSize={14} fontWeight={800} color="AEAEB2">
        새 토론 참여하기
      </Text>
    </div>
  );
}
