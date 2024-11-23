import { IconFeather } from '@/assets/icons';
import { Text } from '@/components/common/Text';

export default function InProgressBookCard({ src }: { src: any }) {
  return (
    <div className="relative">
      <img
        src={src}
        alt="In progress"
        className="min-w-118pxr h-172pxr rounded-[8.788px] border border-f4f4f4 bg-gray-200 bg-center bg-cover shadow-[5px_5px_5px_rgba(0,0,0,0.15)]"
      />
      <div
        className="absolute top-0 left-0 w-full h-full pt-36pxr flex flex-col items-center gap-4pxr rounded-[8.788px] border-[#F4F4F4]
        bg-[rgba(142,142,147,0.5)] shadow-[5px_5px_5px_rgba(0,0,0,0.15)]"
      >
        <IconFeather />
        <div className="w-85pxr h-22pxr bg-black rounded-20pxr flex items-center justify-center">
          <Text fontSize={11} fontWeight={600} color="yellow">
            참여 중
          </Text>
        </div>
      </div>
    </div>
  );
}
