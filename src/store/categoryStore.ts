import { create } from 'zustand';
import { defaultCategories } from '@/database/categories';

export type Category = {
  id: number;
  name: string;
  type: 'income' | 'expense';
  icon: string;
  color: string;
};

interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category) => void;
}

const useCategoryStore = create<CategoryState>()((set) => ({
  categories: defaultCategories.map((cat) => ({ ...cat, id: cat.id })),
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));

export default useCategoryStore;
