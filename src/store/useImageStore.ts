// src/stores/imageStore.ts
import create from 'zustand';

interface ImageState {
  images: { [storyId: string]: { [stepId: number]: string | undefined } };

  addImage: (storyId: string, stepId: number, url: string) => void;
  getImage: (storyId: string, stepId: number) => string | undefined;
}

const useImageStore = create<ImageState>((set, get) => ({
  images: {},

  addImage: (storyId, stepId, url) =>
    set((state) => ({
      images: {
        ...state.images,
        [storyId]: {
          ...(state.images[storyId] || {}),
          [stepId]: url,
        },
      },
    })),

  getImage: (storyId, stepId) => get().images[storyId]?.[stepId],
}));

export default useImageStore;
