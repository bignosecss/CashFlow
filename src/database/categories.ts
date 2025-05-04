import {SQLiteDatabase, Transaction, SQLError} from 'react-native-sqlite-storage';

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

// 初始化分类表
export const initCategories = async (db: SQLiteDatabase): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS categories (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          type TEXT CHECK(type IN ('income', 'expense')) NOT NULL,
          icon TEXT NOT NULL,
          color TEXT NOT NULL
        );`,
        [],
        () => {},
        (_: Transaction, error: SQLError) => {
          console.error('Error creating categories table', error);
          reject(error);
          return false;
        }
      );

      // 插入默认分类数据
      defaultCategories.forEach(category => {
        tx.executeSql(
          'INSERT OR IGNORE INTO categories (id, name, type, icon, color) VALUES (?, ?, ?, ?, ?)',
          [category.id, category.name, category.type, category.icon, category.color],
          () => {},
          (_: Transaction, error: SQLError) => {
            console.error('Error inserting default category', error);
            return false;
          }
        );
      });
      resolve();
    });
  });
};
