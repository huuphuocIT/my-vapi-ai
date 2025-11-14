import { create } from "zustand";

import { WidgetScreen } from "@/modules/vapi/configs/type";

type ViewState = {
  view: WidgetScreen;
  message?: string;
};

type ViewActions = {
  setView: (view: WidgetScreen, message?: string) => void;
};

export const useViewStore = create<ViewState & ViewActions>((set) => ({
  view: "loading",
  message: "Finding contact session...",
  setView: (view: WidgetScreen, message?: string) => set({ view, message }),
}));
