import { Text } from '@/components/common/Text';

interface ReadingStatsProps {
  level: string;
  bookCount: number;
}

export const ReadingStats = ({ level, bookCount }: ReadingStatsProps) => {
  return (
    <div className="bg-black w-208pxr h-30pxr rounded-33pxr px-35pxr flex items-center justify-between relative z-50">
      <Text fontSize={15} fontWeight={800} color="yellow">
        {level}
      </Text>
      <div className="absolute left-1/2 transform -translate-x-1/2 text-white">
        |
      </div>
      <span className="flex items-center">
        <Text fontSize={17} fontWeight={800} color="yellow">
          {bookCount}
        </Text>
        <Text fontSize={15} fontWeight={400} color="yellow">
          권
        </Text>
      </span>
    </div>
  );
};
