import { create } from 'zustand';
import { getDatabase } from '@/database/db';
import { getAllCategories } from '@/database/categories';

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
  isLoading: boolean;
  error: string | null;
  setSelectedCategory: (category: Category) => void;
  loadCategories: () => Promise<void>;
}

const useCategoryStore = create<CategoryState>()((set) => ({
  categories: [],
  selectedCategory: null,
  isLoading: false,
  error: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  loadCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const db = await getDatabase();
      const categories = await getAllCategories(db);
      set({ 
        categories, 
        isLoading: false,
        selectedCategory: categories.length > 0 ? categories[0] : null
      });
    } catch (error) {
      set({ 
        error: 'Failed to load categories',
        isLoading: false 
      });
    }
  },
}));

// 初始化时加载分类数据
useCategoryStore.getState().loadCategories();

export default useCategoryStore;
