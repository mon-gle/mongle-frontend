import create from 'zustand';

interface UuidState {
  uuid: string;
  setUUID: (uuid: string) => void;
}

// 스토어 생성
const useUuidStore = create<UuidState>((set) => ({
  uuid: '',
  setUUID: (uuid: string) => set({ uuid }),
}));

export default useUuidStore;
