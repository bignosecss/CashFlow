import { SQLiteDatabase } from 'react-native-sqlite-storage';

export interface Bill {
  id: number;
  amount: number;
  category_id: number;
  date: string;
  note: string;
}

export interface BillWithCategory extends Bill {
  category_name: string;
  category_type: 'income' | 'expense';
  category_icon: string;
  category_color: string;
}

export interface ResultSet {
  insertId: number;
  rows: {
    raw: () => any[];
  };
}

export interface Database {
  getDatabase: () => Promise<SQLiteDatabase>;
}
