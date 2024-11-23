import {
  IconHangingStarBig,
  IconHangingStarSmall,
  IconMicYellow,
  IconMongleFull,
} from '@/assets/icons';
import ImageDiscussStart from '@/assets/images/image_discuss_start.png';
import { Text } from '../common/Text';
interface DiscussIntroProps {
  handleStart: () => void;
  title: string;
}
export default function DiscussIntro({
  handleStart,
  title,
}: DiscussIntroProps) {
  return (
    <section className="flex-grow relative">
      {/* 토론 시작 말풍선 */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-[60%] -translate-y-[60%] w-[700px] h-[480px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ImageDiscussStart})` }}
        />
        <div className="absolute inset-0 flex gap-24pxr flex-col items-center justify-center">
          <Text
            fontSize={32}
            fontWeight={800}
            color="1C1C1E"
            className="text-center"
          >
            이야기 속으로 다시 들어가볼까?
            <br /> {title}에 대한
            <br /> 너의 생각이 궁금해!
          </Text>
          <div
            className="w-345pxr h-64pxr rounded-50pxr bg-black flex items-center justify-center gap-4pxr cursor-pointer"
            onClick={handleStart}
          >
            <IconMicYellow />
            <Text fontSize={28} fontWeight={800} color="yellow">
              토론시작
            </Text>
          </div>
        </div>
      </div>

      {/* 몽글 아이콘 */}
      <div className="absolute top-[60%] left-[60%] transform">
        <IconMongleFull />
      </div>
      <div className="absolute top-0 right-80pxr">
        <IconHangingStarBig />
      </div>
      <div className="absolute top-0 right-30pxr">
        <IconHangingStarSmall />
      </div>
    </section>
  );
}
