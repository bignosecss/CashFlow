import {SQLiteDatabase, Transaction, SQLError} from 'react-native-sqlite-storage';

export type Category = {
  id: number;
  name: string;
  type: 'income' | 'expense';
  icon: string; // Original Lucide icon names (e.g. 'chevron-right')
  color: string; // Color hex code
};

export const defaultCategories: Category[] = [
  { id: 1, name: '餐饮', type: 'expense', icon: '🍔', color: '#10B981' },
  { id: 2, name: '交通', type: 'expense', icon: '🚗', color: '#3B82F6' },
  { id: 3, name: '日用', type: 'expense', icon: '🛒', color: '#8B5CF6' },
  { id: 4, name: '娱乐', type: 'expense', icon: '🎮', color: '#EC4899' },
  { id: 5, name: '服饰', type: 'expense', icon: '👕', color: '#F59E0B' },
  { id: 6, name: '医疗', type: 'expense', icon: '💊', color: '#EF4444' },
  { id: 7, name: '教育', type: 'expense', icon: '📚', color: '#6366F1' },
  { id: 8, name: '房租', type: 'expense', icon: '🏠', color: '#14B8A6' },
  { id: 9, name: '其他', type: 'expense', icon: '❓', color: '#64748B' },
  { id: 10, name: '工资', type: 'income', icon: '💼', color: '#10B981' },
  { id: 11, name: '红包', type: 'income', icon: '🧧', color: '#F97316' },
  { id: 12, name: '投资回报', type: 'income', icon: '📈', color: '#06B6D4' },
  { id: 13, name: '兼职', type: 'income', icon: '🔧', color: '#8B5CF6' },
];

// 获取所有分类
export const getAllCategories = async (db: SQLiteDatabase): Promise<Category[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM categories ORDER BY id',
        [],
        (_, result) => {
          const data = result.rows.raw();
          resolve(data.length ? data : []);
        },
        (_, error) => {
          console.error('Error getting categories', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

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
        () => {
          // First check if table is empty
          tx.executeSql(
            'SELECT COUNT(*) as count FROM categories',
            [],
            (_, result) => {
              const count = result.rows.item(0).count;
              if (count <= 0) {
                // Only insert default categories if table is empty
                let insertErrors: string[] = [];
                defaultCategories.forEach(category => {
                  tx.executeSql(
                    'INSERT OR IGNORE INTO categories (name, type, icon, color) VALUES (?, ?, ?, ?)',
                    [category.name, category.type, category.icon, category.color],
                    () => {},
                    (_: Transaction, error: SQLError) => {
                      insertErrors.push(`Failed to insert ${category.name}: ${error.message}`);
                      return false;
                    }
                  );
                });
                
                if (insertErrors.length > 0) {
                  reject(new Error(insertErrors.join('\n')));
                  return false;
                }
              }
              resolve();
            },
            (_: Transaction, error: SQLError) => {
              console.error('Error checking categories count', error);
              reject(error);
              return false;
            }
          );
        },
        (_: Transaction, error: SQLError) => {
          console.error('Error creating categories table', error);
          reject(error);
          return false;
        }
      );
    });
  });
};
