import { AppT } from '@/types/app';
import { ViewI } from '@/types/view';
import { create } from 'zustand';

type AppStore = {
  app: AppT | null;
  setApp: (app: AppT) => void;
  addScreen: (screen: ViewI) => void;
  removeScreen: (view_id: string) => void;
  updateScreen: (screen: ViewI) => void;
  getScreen: (view_id: string) => ViewI | null;
};

export const useAppStore = create<AppStore>((set, get) => ({
  app: null,
  setApp: (app) => set({ app }),
  getAppData: () => get().app?.raw_data,
  addScreen: (screen) => {
    set((state) => ({
      app: state.app
        ? {
            ...state.app,
            raw_data: {
              ...state.app.raw_data,
              views: { ...state.app.raw_data.views, [screen.view_id]: screen },
            },
          }
        : null,
    }));
    return get().app;
  },
  removeScreen: (view_id) =>
    set((state) => ({
      app: state.app
        ? {
            ...state.app,
            raw_data: {
              ...state.app.raw_data,
              views: Object.fromEntries(
                Object.entries(state.app.raw_data.views).filter(
                  ([key]) => key !== view_id,
                ),
              ),
            },
          }
        : null,
    })),
  updateScreen: (screen) =>
    set((state) => ({
      app: state.app
        ? {
            ...state.app,
            raw_data: {
              ...state.app.raw_data,
              views: Object.fromEntries(
                Object.entries(state.app.raw_data.views).map(([key, s]) =>
                  key === screen.view_id ? [key, screen] : [key, s],
                ),
              ),
            },
          }
        : null,
    })),
  getScreen: (view_id) => get().app?.raw_data.views[view_id] ?? null,
}));
