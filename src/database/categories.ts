export type Category = {
  id: string;
  name: string;
  type: 'income' | 'expense';
  icon: string; // Original Lucide icon names (e.g. 'chevron-right')
  color: string; // Color hex code
};

export const defaultCategories: Category[] = [
  { id: 'food', name: '餐饮', type: 'expense', icon: '🍔', color: '#10B981' },
  { id: 'transport', name: '交通', type: 'expense', icon: '🚗', color: '#3B82F6' },
  { id: 'daily', name: '日用', type: 'expense', icon: '🛒', color: '#8B5CF6' },
  { id: 'entertainment', name: '娱乐', type: 'expense', icon: '🎮', color: '#EC4899' },
  { id: 'clothes', name: '服饰', type: 'expense', icon: '👕', color: '#F59E0B' },
  { id: 'medical', name: '医疗', type: 'expense', icon: '💊', color: '#EF4444' },
  { id: 'education', name: '教育', type: 'expense', icon: '📚', color: '#6366F1' },
  { id: 'rent', name: '房租', type: 'expense', icon: '🏠', color: '#14B8A6' },
  { id: 'other_expense', name: '其他', type: 'expense', icon: '❓', color: '#64748B' },
  { id: 'salary', name: '工资', type: 'income', icon: '💼', color: '#10B981' },
  { id: 'red_packet', name: '红包', type: 'income', icon: '🧧', color: '#F97316' },
  { id: 'investment', name: '投资回报', type: 'income', icon: '📈', color: '#06B6D4' },
  { id: 'freelance', name: '兼职', type: 'income', icon: '🔧', color: '#8B5CF6' },
  { id: 'other_income', name: '其他', type: 'income', icon: '🎁', color: '#A855F7' },
];

// 生成随机账单数据
export const generateMockBills = (count: number) => {
  const categories = defaultCategories;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  
  return Array.from({ length: count }, (_, i) => {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const isIncome = randomCategory.id === 'salary' || randomCategory.id === 'investment';
    const amount = isIncome
      ? `+${(Math.random() * 10000).toFixed(2)}`
      : `-${(Math.random() * 500).toFixed(2)}`;

    // Generate dates within current month
    const day = Math.floor(Math.random() * 30) + 1;
    const date = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    return {
      id: `bill_${i}`,
      category: randomCategory,
      amount,
      date,
      description: isIncome
        ? ['工资收入', '投资收益', '兼职收入'][Math.floor(Math.random() * 3)]
        : ['午餐', '地铁票', '电影票', '日用品', '房租', '网课'][Math.floor(Math.random() * 6)],
    };
  });
};

// 生成50条测试数据
export const mockBills = generateMockBills(50).filter(bill => bill.category);

// 按日期降序排序（最近的在前）
mockBills.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
