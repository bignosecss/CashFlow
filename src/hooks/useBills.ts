import { useState, useEffect, useCallback } from 'react';
import { Category, generateMockBills } from '@/database/categories';

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
  const [hasMore, setHasMore] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('monthly');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const sortBillsByDate = (bills: BillItem[]) => {
    return [...bills].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  };

  const filterBillsByDate = (bills: BillItem[], date: string, mode: ViewMode) => {
    const targetDate = new Date(date);
    return bills.filter(bill => {
      const billDate = new Date(bill.date);
      if (mode === 'monthly') {
        return (
          billDate.getFullYear() === targetDate.getFullYear() &&
          billDate.getMonth() === targetDate.getMonth()
        );
      } else {
        return (
          billDate.getFullYear() === targetDate.getFullYear() &&
          billDate.getMonth() === targetDate.getMonth() &&
          billDate.getDate() === targetDate.getDate()
        );
      }
    });
  };

  const loadInitialData = useCallback(async () => {
    try {
      const allBills = generateMockBills(30); // Generate more bills for filtering
      const filteredBills = filterBillsByDate(allBills, selectedDate, viewMode);
      setBills(sortBillsByDate(filteredBills));
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
    if (isLoading || isLoadingMore || !hasMore) {return;}

    setIsLoadingMore(true);
    try {
      // 添加延迟模拟网络请求
      await new Promise(resolve => setTimeout(resolve, 500));
      const moreBills = generateMockBills(5);
      const filteredBills = filterBillsByDate(moreBills, selectedDate, viewMode);
      setBills(prev => sortBillsByDate([...prev, ...filteredBills]));
      setHasMore(filteredBills.length > 0);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoading, isLoadingMore, hasMore, selectedDate, viewMode]);

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
