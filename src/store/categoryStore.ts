import { create } from 'zustand';

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

const defaultCategories: Omit<Category, 'id'>[] = [
  { name: '餐饮', type: 'expense', icon: '🍔', color: '#10B981' },
  { name: '交通', type: 'expense', icon: '🚗', color: '#3B82F6' },
  { name: '日用', type: 'expense', icon: '🛒', color: '#8B5CF6' },
  { name: '娱乐', type: 'expense', icon: '🎮', color: '#EC4899' },
  { name: '服饰', type: 'expense', icon: '👕', color: '#F59E0B' },
  { name: '医疗', type: 'expense', icon: '💊', color: '#EF4444' },
  { name: '教育', type: 'expense', icon: '📚', color: '#6366F1' },
  { name: '房租', type: 'expense', icon: '🏠', color: '#14B8A6' },
  { name: '其他', type: 'expense', icon: '❓', color: '#64748B' },
  { name: '工资', type: 'income', icon: '💼', color: '#10B981' },
  { name: '红包', type: 'income', icon: '🧧', color: '#F97316' },
  { name: '投资回报', type: 'income', icon: '📈', color: '#06B6D4' },
  { name: '兼职', type: 'income', icon: '🔧', color: '#8B5CF6' },
  { name: '其他', type: 'income', icon: '🎁', color: '#A855F7' },
];

const useCategoryStore = create<CategoryState>()((set) => ({
  categories: defaultCategories.map((cat, idx) => ({ ...cat, id: idx })),
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));

export default useCategoryStore;
