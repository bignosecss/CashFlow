import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addBill as addBillToDatabase } from '@/database/bills';
import { Bill } from '@/database/types';
import Toast from 'react-native-toast-message';

export const useAddBill = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (bill: Omit<Bill, 'id'>) => addBillToDatabase(bill),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bills'] });
      Toast.show({
        type: 'success',
        text1: '成功',
        text2: '账单添加成功',
      });
      onSuccess?.();
    },
    onError: (error) => {
      console.error('添加账单失败:', error);
      Toast.show({
        type: 'error',
        text1: '错误',
        text2: '添加账单失败',
      });
    },
  });

  return {
    addBill: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
