import { Text } from '@/components/common/Text';

interface BookDetailsProps {
  summary: string;
  keywords: string[];
  details: { label: string; value: string }[];
}

export const BookDetails: React.FC<BookDetailsProps> = ({
  summary,
  keywords,
  details,
}) => {
  return (
    <section className="h-full flex flex-col flex-grow pt-46pxr px-56pxr">
      <Text fontSize={24} fontWeight={800} color="1C1C1E">
        이 책은요
      </Text>
      <div className="h-24pxr" />
      <Text fontSize={20} fontWeight={800} color="1C1C1E">
        줄거리
      </Text>
      <div className="h-7pxr" />
      <Text fontSize={20} fontWeight={400} color="48484A">
        {summary}
      </Text>
      <div className="h-36pxr" />
      <Text fontSize={20} fontWeight={800} color="1C1C1E">
        키워드
      </Text>
      <div className="h-7pxr" />
      <div className="flex gap-12pxr">
        {keywords.map((keyword, index) => (
          <div
            key={index}
            className="px-20pxr py-6pxr border-[1.2px] rounded-10pxr border-48484A"
          >
            <Text fontSize={18} fontWeight={400} color="1C1C1E">
              {keyword}
            </Text>
          </div>
        ))}
      </div>
      <div className="h-32pxr" />
      <div className="flex flex-col gap-11pxr">
        {details.map((detail, index) => (
          <div key={index} className="flex gap-10pxr">
            <Text fontSize={20} fontWeight={800} color="48484A">
              {detail.label}
            </Text>
            <Text fontSize={20} fontWeight={400} color="48484A">
              {detail.value}
            </Text>
          </div>
        ))}
      </div>
    </section>
  );
};
