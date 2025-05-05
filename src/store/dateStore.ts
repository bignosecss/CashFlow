import { create } from 'zustand';

type ViewMode = 'monthly' | 'daily';

interface DateState {
  viewMode: ViewMode;
  selectedDate: string;
  setViewMode: (mode: ViewMode) => void;
  setSelectedDate: (date: string) => void;
}

const useDateStore = create<DateState>()((set) => ({
  viewMode: 'monthly',
  selectedDate: new Date().toISOString().split('T')[0],
  setViewMode: (mode) => set({ viewMode: mode }),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));

export default useDateStore;
