import { Text } from '@/components/common/Text';

interface BookCardProps {
  title: string;
  src: string;
}

export const BookCard: React.FC<BookCardProps> = ({ title, src }) => {
  return (
    <div className="flex flex-col gap-12pxr">
      <img
        src={src}
        alt={title}
        className="min-w-118pxr max-w-118pxr h-172pxr rounded-[8.788px] border border-f4f4f4 bg-gray-200 bg-center bg-cover shadow-[5px_5px_5px_rgba(0,0,0,0.15)]"
      />
      <Text fontSize={16} fontWeight={400} color="1C1C1E">
        {title}
      </Text>
    </div>
  );
};
