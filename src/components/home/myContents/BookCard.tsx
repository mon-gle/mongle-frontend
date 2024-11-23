import { Text } from '@/components/common/Text';

export default function BookCard({ src, title }: { src: any; title: string }) {
  return (
    <div className="flex flex-col gap-12pxr">
      <img
        src={src}
        alt={title}
        className="min-w-118pxr h-172pxr rounded-[8.788px] border border-f4f4f4 bg-gray-200 bg-center bg-cover shadow-[5px_5px_5px_rgba(0,0,0,0.15)]"
      />
      <Text fontSize={16} fontWeight={400} color="1C1C1E">
        {title}
      </Text>
    </div>
  );
}
