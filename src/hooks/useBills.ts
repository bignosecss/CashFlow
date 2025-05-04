import { useState, useEffect, useCallback } from 'react';
import { getBills, getBillsByMonth, getBillsByDate } from '@/database/bills';
import { Category } from '@/database/categories';
import { BillWithCategory } from '@/database/types';

type ViewMode = 'monthly' | 'daily';

interface BillItem {
  id: string;
  category: Category;
  amount: string;
  date: string;
  description: string;
}

const useBills = () => {
  const [bills, setBills] = useState<BillItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('monthly');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const mapBillWithCategory = (dbBill: BillWithCategory): BillItem => ({
    id: dbBill.id.toString(),
    category: {
      id: dbBill.category_id,
      name: dbBill.category_name,
      type: dbBill.category_type,
      icon: dbBill.category_icon,
      color: dbBill.category_color
    },
    amount: dbBill.amount.toString(),
    date: dbBill.date,
    description: dbBill.note
  });

  const loadInitialData = useCallback(async () => {
    try {
      setIsLoading(true);
      let result;
      if (viewMode === 'monthly') {
        const date = new Date(selectedDate);
        result = await getBillsByMonth(date.getFullYear(), date.getMonth() + 1);
      } else {
        result = await getBillsByDate(selectedDate);
      }
      setBills(result.map(mapBillWithCategory));
    } catch (error) {
      console.error('Failed to load bills:', error);
      setBills([]); // 清空账单列表
      throw error; // 重新抛出错误以便上层处理
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate, viewMode]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setViewMode('daily');
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    if (mode === 'daily') {
      setSelectedDate(new Date().toISOString().split('T')[0]);
    }
  };

  const loadMore = useCallback(async () => {
    if (isLoading || isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);
    try {
      const allBills = await getBills();
      setBills(prev => [
        ...prev,
        ...allBills.slice(prev.length, prev.length + 5).map(mapBillWithCategory)
      ]);
      setHasMore(allBills.length > bills.length + 5);
    } catch (error) {
      console.error('Failed to load more bills:', error);
      throw error; // 重新抛出错误以便上层处理
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoading, isLoadingMore, hasMore, bills.length]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  return {
    bills,
    isLoading,
    isLoadingMore,
    hasMore,
    loadMore,
    viewMode,
    selectedDate,
    setViewMode: handleViewModeChange,
    onDateSelect: handleDateSelect,
  };
};

export default useBills;
