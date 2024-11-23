import { Text } from '@/components/common/Text';
import { BookActions } from './BookActions';

interface BookHighlightProps {
  src: string;
  title: string;
  id: string;
}

export const BookHighlight = ({ src, title, id }: BookHighlightProps) => {
  return (
    <section className="relative min-w-420pxr h-full rounded-[10px] flex flex-col items-center justify-center">
      <div
        className="absolute top-0 left-0 w-full h-full rounded-[10px]"
        style={{
          background: `url(${src}) lightgray 50% / cover no-repeat`,
          filter: 'blur(15px)',
          zIndex: 1,
        }}
      />
      <img
        src={src}
        alt={title}
        className="relative w-210pxr h-285pxr rounded-[10px] shadow-[10px_10px_2px_rgba(0,0,0,0.40)] z-10"
      />
      <div className="h-26pxr" />
      <Text fontSize={24} fontWeight={800} color="1C1C1E" className="z-10">
        {title}
      </Text>
      <div className="h-36pxr" />
      <BookActions id={id} />
    </section>
  );
};
