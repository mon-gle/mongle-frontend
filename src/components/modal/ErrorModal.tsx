import { useEffect } from 'react';
import ModalPortal from './ModalPortal';
import { useModalStore } from '@/store/modalStore';

const ErrorModal = () => {
  const { modalProps, closeModal } = useModalStore();
  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === 'Enter') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  return (
    <ModalPortal>
      <div
        className="z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300"
        onClick={closeModal}
      >
        <div
          className="relative flex flex-col justify-center bg-white p-12pxr rounded-8pxr min-h-110pxr min-w-250pxr shadow-lg transform scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex-grow flex items-center text-center justify-center py-20pxr">
            <div className="flex flex-col">{modalProps.confirmText}</div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={modalProps.confirmOnClick || closeModal}
              className="px-16pxr py-8pxr w-full bg-cctvStrongRed text-white rounded hover:brightness-75"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default ErrorModal;
