import { View } from 'react-native';
import { Suspense, useState } from 'react';
import ContentWrapper from '@/components/ContentWrapper';
import SkeletonLoader from '@/components/SkeletonLoader';
import Divider from '@/components/Divider';
import Bill from './Bill';
import BillDetailsModal from './BillDetailsModal';
import { Category } from '@/database/categories';
import { theme } from '@/theme/theme';

interface BillItem {
  id: string;
  category: Category;
  amount: string;
  date: string;
  description: string;
}

interface BillsListProps {
  bills: BillItem[];
  isLoadingMore?: boolean;
}

const BillsList = ({ bills }: BillsListProps) => {
  const [selectedBill, setSelectedBill] = useState<BillItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleBillPress = (bill: BillItem) => {
    setSelectedBill(bill);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
  <ContentWrapper style={{ marginBottom: theme.spacing.xxlarge }}>
    <Suspense fallback={
      Array(2).fill(0).map((_, index) => (
        <View key={`skeleton-${index}`}>
          <SkeletonLoader width="100%" height={80} />
          {index < 4 && <Divider />}
        </View>
      ))
    }>
      {bills.map((item, index) => (
        <View key={item.id}>
          <Bill {...item} onPress={() => handleBillPress(item)} />
          {index < bills.length - 1 && <Divider />}
        </View>
      ))}
      {selectedBill && (
        <BillDetailsModal
          visible={modalVisible}
          onClose={handleCloseModal}
          bill={selectedBill}
        />
      )}
    </Suspense>
  </ContentWrapper>
);};

export default BillsList;
