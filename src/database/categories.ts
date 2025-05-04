import {SQLiteDatabase, Transaction, SQLError} from 'react-native-sqlite-storage';

export type Category = {
  id: number;
  name: string;
  type: 'income' | 'expense';
  icon: string; // Original Lucide icon names (e.g. 'chevron-right')
  color: string; // Color hex code
};

export const defaultCategories: Omit<Category, 'id'>[] = [
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

// 初始化分类表
export const initCategories = async (db: SQLiteDatabase): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE NOT NULL,
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
        'INSERT OR IGNORE INTO categories (name, type, icon, color) VALUES (?, ?, ?, ?)',
        [category.name, category.type, category.icon, category.color],
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
