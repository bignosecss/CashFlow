import { useQuery } from '@tanstack/react-query';
import { getBillsByMonth, getBillsByDate } from '@/database/bills';
import { Category } from '@/database/categories';
import { BillWithCategory } from '@/database/types';
import useDateStore from '@/store/dateStore';

interface BillItem {
  id: string;
  category: Category;
  amount: string;
  date: string;
  description: string;
}

const mapBillWithCategory = (dbBill: BillWithCategory): BillItem => ({
  id: dbBill.id.toString(),
  category: {
    id: dbBill.category_id,
    name: dbBill.category_name,
    type: dbBill.category_type,
    icon: dbBill.category_icon,
    color: dbBill.category_color,
  },
  amount: dbBill.amount.toString(),
  date: dbBill.date,
  description: dbBill.note,
});

const useBills = () => {
  const { viewMode, selectedDate, setViewMode, setSelectedDate } = useDateStore();

  const queryKey = ['bills', viewMode, selectedDate];

  const queryFn = async () => {
    if (viewMode === 'monthly') {
      const date = new Date(selectedDate);
      const result = await getBillsByMonth(date.getFullYear(), date.getMonth() + 1);
      console.log('The latest bill data: ', result);
      return result.map(mapBillWithCategory);
    } else {
      const result = await getBillsByDate(selectedDate);
      return result.map(mapBillWithCategory);
    }
  };

  const { data: bills = [], isLoading } = useQuery({
    queryKey,
    queryFn,
  });

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setViewMode('daily');
  };

  const handleViewModeChange = (mode: 'monthly' | 'daily') => {
    setViewMode(mode);
  };

  return {
    bills,
    isLoading,
    viewMode,
    selectedDate,
    setViewMode: handleViewModeChange,
    onDateSelect: handleDateSelect,
  };
};

export default useBills;
