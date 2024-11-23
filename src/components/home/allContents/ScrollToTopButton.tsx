import { IconUp } from '@/assets/icons';

interface ScrollToTopButtonProps {
  show: boolean;
  onClick: () => void;
}

export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  show,
  onClick,
}) => {
  if (!show) return null;

  return (
    <button
      className="fixed bottom-50pxr right-104pxr w-50pxr h-50pxr rounded-full bg-white flex items-center justify-center 
             shadow-lg cursor-pointer
             fill-white filter-[drop-shadow(0px_2px_20px_rgba(0,0,0,0.70))]"
      onClick={onClick}
      style={{
        fill: '#FFF',
      }}
    >
      <IconUp />
    </button>
  );
};
