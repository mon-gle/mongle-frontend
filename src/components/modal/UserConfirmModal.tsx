import ModalPortal from './ModalPortal';
import { useModalStore } from '@/store/modalStore';

const UserConfirmModal = () => {
  const { modalProps, closeModal } = useModalStore();
  const handleConfirm = () => {
    modalProps.confirmOnClick!();
    closeModal();
  };
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
              onClick={closeModal}
              className="w-full px-16pxr py-8pxr bg-gray200 text-black rounded hover:brightness-75 mr-8pxr"
            >
              취소
            </button>
            <button
              onClick={handleConfirm}
              className="w-full px-16pxr py-8pxr  bg-cctvMain text-white rounded hover:brightness-75"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default UserConfirmModal;
