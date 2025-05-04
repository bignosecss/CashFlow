import {SQLiteDatabase, Transaction, SQLError} from 'react-native-sqlite-storage';
import {Bill, BillWithCategory, ResultSet} from './types';
import {getDatabase} from './db';
import {defaultCategories} from './categories';

// 手动创建的测试账单数据
const mockBills = [
  {
    category: defaultCategories.find(c => c.id === 'food')!,
    amount: '-35.50',
    date: '2025-05-01',
    description: '午餐'
  },
  {
    category: defaultCategories.find(c => c.id === 'transport')!,
    amount: '-8.00',
    date: '2025-05-01',
    description: '地铁通勤'
  },
  {
    category: defaultCategories.find(c => c.id === 'salary')!,
    amount: '+15000.00',
    date: '2025-05-05',
    description: '工资收入'
  },
  {
    category: defaultCategories.find(c => c.id === 'rent')!,
    amount: '-3500.00',
    date: '2025-05-10',
    description: '房租'
  },
  {
    category: defaultCategories.find(c => c.id === 'education')!,
    amount: '-299.00',
    date: '2025-05-12',
    description: '在线课程'
  },
  {
    category: defaultCategories.find(c => c.id === 'entertainment')!,
    amount: '-120.00',
    date: '2025-05-15',
    description: '电影票'
  },
  {
    category: defaultCategories.find(c => c.id === 'investment')!,
    amount: '+500.00',
    date: '2025-05-18',
    description: '投资收益'
  },
  {
    category: defaultCategories.find(c => c.id === 'daily')!,
    amount: '-85.30',
    date: '2025-05-20',
    description: '日用品采购'
  },
  {
    category: defaultCategories.find(c => c.id === 'medical')!,
    amount: '-120.00',
    date: '2025-05-22',
    description: '药品'
  },
  {
    category: defaultCategories.find(c => c.id === 'freelance')!,
    amount: '+2000.00',
    date: '2025-05-25',
    description: '兼职收入'
  }
];

// 添加账单
export const addBill = async (bill: Bill): Promise<number> => {
  const db = await getDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO bills (amount, category_id, date, note) VALUES (?, ?, ?, ?)',
        [bill.amount, bill.category_id, bill.date, bill.note],
        (_: Transaction, result: ResultSet) => resolve(result.insertId),
        (_: Transaction, error: SQLError) => {
          console.error('Error adding bill', error);
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
          category_id TEXT NOT NULL,
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
      // 清空现有测试数据
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

      // 插入新的测试数据
      mockBills.forEach(bill => {
        tx.executeSql(
        'INSERT INTO bills (amount, category_id, date, note) VALUES (?, ?, ?, ?)',
        [
            parseFloat(bill.amount.replace(/[+-]/g, '')),
            bill.category.id,
            bill.date,
            bill.description
        ],
          () => {},
          (_: Transaction, error: SQLError) => {
            console.error('Error inserting mock bill', error);
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
