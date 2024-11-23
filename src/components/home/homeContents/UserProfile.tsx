import { IconCloud, IconPencil } from '@/assets/icons';
import { Text } from '@/components/common/Text';

export default function UserProfile({
  name,
  readCount,
  readingCount,
}: {
  name: string;
  readCount: number;
  readingCount: number;
}) {
  return (
    <section className="flex gap-20pxr h-full items-center">
      <div className="relative bg-black flex items-center justify-center rounded-full w-104pxr h-104pxr border-2pxr border-f4f4f4">
        <IconCloud />
        <div className="absolute flex items-center justify-center bottom-0 right-0 w-28pxr h-28pxr rounded-full bg-white border-[1.2px] border-black">
          <IconPencil />
        </div>
      </div>
      <div className="flex flex-col gap-10pxr">
        <Text fontSize={28} fontWeight={600}>
          {name}
        </Text>
        <div className="flex gap-8pxr">
          <div className="flex gap-6pxr">
            <Text fontSize={18} fontWeight={400}>
              다 읽은 책
            </Text>
            <Text fontSize={18} fontWeight={800}>
              {readCount}
            </Text>
          </div>
          <div className="h-24pxr w-1pxr bg-black" />
          <div className="flex gap-6pxr">
            <Text fontSize={18} fontWeight={400}>
              읽는 중
            </Text>
            <Text fontSize={18} fontWeight={800}>
              {readingCount}
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}
