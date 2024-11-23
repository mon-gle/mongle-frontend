import { Text } from '@/components/common/Text';

interface BookCardProps {
  src: string;
  title: string;
  subtitle?: string;
  daysAgo?: string;
}

export const BookCard: React.FC<BookCardProps> = ({
  src,
  title,
  subtitle,
  daysAgo,
}) => {
  return (
    <div className="relative w-full h-full rounded-[8.788px] border border-[#F4F4F4] shadow-[5px_5px_5px_rgba(0,0,0,0.10)] overflow-hidden">
      {daysAgo && (
        <div className="absolute top-0 z-50 w-full h-full left-0 rounded-[8.788px] bg-[linear-gradient(180deg,_rgba(0,0,0,0)_66.29%,_#000_82.95%)]"></div>
      )}
      <img
        src={src}
        alt={title}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      {subtitle && (
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-13pxr flex flex-col items-center gap-5pxr z-[51]">
          {daysAgo && (
            <div className="rounded-[25px] flex items-center justify-center border-[0.6px] border-black bg-[rgba(255,255,255,0.8)] w-45pxr h-17pxr">
              <Text fontSize={10} fontWeight={600}>
                {daysAgo}
              </Text>
            </div>
          )}
          <Text fontSize={14} fontWeight={600} color="white">
            {subtitle}
          </Text>
        </div>
      )}
    </div>
  );
};
