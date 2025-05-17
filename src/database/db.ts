import {openDatabase, SQLiteDatabase} from 'react-native-sqlite-storage';

// 初始化数据库连接
const dbPromise: Promise<SQLiteDatabase> = openDatabase({
  name: 'CashFlowDB',
  location: 'default',
});

// 导出数据库实例
export const getDatabase = () => dbPromise;

// 初始化数据库表结构
export const initDatabase = async (): Promise<boolean> => {
  try {
    const db = await dbPromise;

    // 启用外键约束
    await db.executeSql('PRAGMA foreign_keys = ON');

    // 初始化表结构
    await import('./categories').then(({initCategories}) => initCategories(db));
    const bills = await import('./bills');
    await bills.initBills(db);

    return true;
  } catch (error) {
    console.error('Database initialization failed', error);
    return false;
  }
};
