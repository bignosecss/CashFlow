import {SQLiteDatabase, Transaction, SQLError} from 'react-native-sqlite-storage';
import {Bill, BillWithCategory, ResultSet} from './types';
import {getDatabase} from './db';

// 手动创建的测试账单数据
const mockBills = [
  {
    id: 1,
    categoryName: '餐饮',
    amount: '-35.50',
    date: '2025-05-01',
    description: '午餐',
  },
  {
    id: 2,
    categoryName: '交通',
    amount: '-8.00',
    date: '2025-05-01',
    description: '地铁通勤',
  },
  {
    id: 3,
    categoryName: '工资',
    amount: '+15000.00',
    date: '2025-05-05',
    description: '工资收入',
  },
  {
    id: 4,
    categoryName: '房租',
    amount: '-3500.00',
    date: '2025-05-10',
    description: '房租',
  },
  {
    id: 5,
    categoryName: '教育',
    amount: '-299.00',
    date: '2025-05-12',
    description: '在线课程',
  },
  {
    id: 6,
    categoryName: '娱乐',
    amount: '-120.00',
    date: '2025-05-15',
    description: '电影票',
  },
  {
    id: 7,
    categoryName: '投资回报',
    amount: '+500.00',
    date: '2025-05-18',
    description: '投资收益',
  },
  {
    id: 8,
    categoryName: '日用',
    amount: '-85.30',
    date: '2025-05-20',
    description: '日用品采购',
  },
  {
    id: 9,
    categoryName: '医疗',
    amount: '-120.00',
    date: '2025-05-22',
    description: '药品',
  },
  {
    id: 10,
    categoryName: '兼职',
    amount: '+2000.00',
    date: '2025-05-25',
    description: '兼职收入',
  },
];

// 添加账单
// Temporary debug function to list all categories
const debugListCategories = async (db: SQLiteDatabase) => {
  return new Promise<void>((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM categories',
        [],
        (_: Transaction, result: ResultSet) => {
          console.log('All categories:', result.rows.raw());
          resolve();
        },
        () => {
          console.log('Failed to list categories');
          resolve();
          return false;
        }
      );
    });
  });
};

export const addBill = async (bill: Omit<Bill, 'id'>): Promise<number> => {
  console.log('db add bill: ', bill);
  const db = await getDatabase();

  // Debug: Print all categories and bills first
  await debugListCategories(db);
  await new Promise<void>((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM bills',
        [],
        (_: Transaction, result: ResultSet) => {
          console.log('All bills:', result.rows.raw());
          resolve();
        },
        () => {
          console.log('Failed to list bills');
          resolve();
          return false;
        }
      );
    });
  });

  // Default to first category if invalid ID (0) is provided
  const categoryId = bill.category_id <= 0 ? 1 : bill.category_id;
  if (bill.category_id <= 0) {
    console.warn(`Invalid category_id (${bill.category_id}), defaulting to 1`);
  }

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // First verify the category exists
      tx.executeSql(
        'SELECT id FROM categories WHERE id = ?',
        [categoryId],
        (_: Transaction, result: ResultSet) => {
          if (result.rows.raw().length === 0) {
            reject(new Error(`Invalid category_id: ${categoryId}`));
            return false;
          }
          // Category exists, proceed with insert
          tx.executeSql(
            'INSERT INTO bills (amount, category_id, date, note) VALUES (?, ?, ?, ?)',
            [bill.amount, categoryId, bill.date, bill.note],
            (_: Transaction, result: ResultSet) => resolve(result.insertId),
            (_: Transaction, error: SQLError) => {
              console.error('Error adding bill', error);
              console.error('Failed SQL:', 'INSERT INTO bills (amount, category_id, date, note) VALUES (?, ?, ?, ?)');
              console.error('With params:', [bill.amount, bill.category_id, bill.date, bill.note]);
              reject(error);
              return false;
            }
          );
          return true;
        },
        (_: Transaction, error: SQLError) => {
          console.error('Error verifying category', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

// 获取所有账单
export const getBills = async (): Promise<BillWithCategory[]> => {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT b.*, c.name as category_name, c.type as category_type, 
                c.icon as category_icon, c.color as category_color 
         FROM bills b
         JOIN categories c ON b.category_id = c.id
         ORDER BY date DESC`,
        [],
        (_: Transaction, result: ResultSet) => {
          const data = result.rows.raw();
          resolve(data.length ? data : []);
        },
        (_: Transaction, error: SQLError) => {
          console.error('Error getting bills', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

// 更新账单
export const updateBill = async (
  id: number,
  updates: Partial<Bill>
): Promise<void> => {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const fields: string[] = [];
      const values: any[] = [];

      Object.entries(updates).forEach(([key, value]) => {
        if (!['amount', 'category_id', 'date', 'note'].includes(key)) {
          return;
        }
        if (value !== undefined) {
          fields.push(`${key} = ?`);
          values.push(value);
        }
      });

      if (fields.length === 0) {
        reject(new Error('No fields to update'));
        return;
      }

      values.push(id);

      tx.executeSql(
        `UPDATE bills SET ${fields.join(', ')} WHERE id = ?`,
        values,
        () => resolve(),
        (_: Transaction, error: SQLError) => {
          console.error('Error updating bill', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

// 初始化bills表
export const initBills = async (db: SQLiteDatabase): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS bills (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          amount REAL NOT NULL,
          category_id INTEGER NOT NULL,
          date TEXT NOT NULL,
          note TEXT,
          FOREIGN KEY (category_id) REFERENCES categories (id)
        )`,
        [],
        () => resolve(),
        (_, error) => {
          console.error('Error creating bills table', error);
          reject(error);
          return false;
        }
      );
    });
  });
};

// 初始化测试账单数据
export const initMockBills = async (db: SQLiteDatabase): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // 检查是否有现有数据，有则清空
      tx.executeSql(
        'SELECT COUNT(*) as count FROM bills',
        [],
        (_: Transaction, result: ResultSet) => {
          const count = result.rows.raw()[0].count;
          if (count > 0) {
            tx.executeSql(
              'DELETE FROM bills',
              [],
              () => {},
              (_: Transaction, error: SQLError) => {
                console.error('Error clearing mock bills', error);
                reject(error);
                return false;
              }
            );
          }
        },
        (_: Transaction, error: SQLError) => {
          console.error('Error checking bill count', error);
          reject(error);
          return false;
        }
      );

      // 插入新的测试数据
      mockBills.forEach(bill => {
        // First get category id by name
        tx.executeSql(
          'SELECT id FROM categories WHERE name = ?',
          [bill.categoryName],
          (_: Transaction, result: ResultSet) => {
            const categoryId = result.rows.raw()[0]?.id;
            if (!categoryId) {
              console.error(`Category not found: ${bill.categoryName}`);
              return;
            }

            // Then insert bill with category id
            tx.executeSql(
              'INSERT INTO bills (id, amount, category_id, date, note) VALUES (?, ?, ?, ?, ?)',
              [
                bill.id,
                parseFloat(bill.amount.replace(/[+-]/g, '')),
                categoryId,
                bill.date,
                bill.description,
              ],
              () => {},
              (_: Transaction, error: SQLError) => {
                console.error('Error inserting mock bill', error);
                return false;
              }
            );
          },
          (_: Transaction, error: SQLError) => {
            console.error('Error finding category', error);
            return false;
          }
        );
      });
      resolve();
    });
  });
};

// 获取指定月份的账单
export const getBillsByMonth = async (year: number, month: number): Promise<BillWithCategory[]> => {
  const db = await getDatabase();
  const monthStr = month.toString().padStart(2, '0');
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT b.*, c.name as category_name, c.type as category_type, 
                c.icon as category_icon, c.color as category_color 
         FROM bills b
         JOIN categories c ON b.category_id = c.id
         WHERE strftime('%Y-%m', date) = ?
         ORDER BY date DESC`,
        [`${year}-${monthStr}`],
        (_: Transaction, result: ResultSet) => {
          const data = result.rows.raw();
          resolve(data.length ? data : []);
        },
        (_: Transaction, error: SQLError) => {
          console.error('Error getting bills by month:', error.message);
          reject(new Error(`Failed to get bills by month: ${error.message}`));
          return false;
        }
      );
    });
  });
};

// 获取指定日期的账单
export const getBillsByDate = async (date: string): Promise<BillWithCategory[]> => {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT b.*, c.name as category_name, c.type as category_type, 
                c.icon as category_icon, c.color as category_color 
         FROM bills b
         JOIN categories c ON b.category_id = c.id
         WHERE date = ?
         ORDER BY date DESC`,
        [date],
        (_: Transaction, result: ResultSet) => {
          const data = result.rows.raw();
          resolve(data.length ? data : []);
        },
        (_: Transaction, error: SQLError) => {
          console.error('Error getting bills:', error.message);
          reject(new Error(`Failed to get bills: ${error.message}`));
          return false;
        }
      );
    });
  });
};

// 删除账单
export const deleteBill = async (id: number): Promise<void> => {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM bills WHERE id = ?',
        [id],
        () => resolve(),
        (_: Transaction, error: SQLError) => {
          console.error('Error getting bills by date:', error.message);
          reject(new Error(`Failed to get bills by date: ${error.message}`));
          return false;
        }
      );
    });
  });
};
