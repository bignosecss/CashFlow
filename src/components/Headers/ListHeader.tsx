import { Suspense, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';
import { HomeHeader } from '@/components/Headers';
import ContentWrapper from '@/components/ContentWrapper';
import SkeletonLoader from '@/components/SkeletonLoader';
import Divider from '@/components/Divider';
import FinancialSummaryItem from '@/components/FinancialSummaryItem';

interface ListHeaderProps {
  username: string;
  incomeAmount: string;
  expenseAmount: string;
  onAnalyticsPress?: () => void;
  onCalendarPress?: () => void;
  selectedDate: string;
}

const ListHeader = ({ 
  username, 
  incomeAmount, 
  expenseAmount, 
  onAnalyticsPress, 
  onCalendarPress,
  selectedDate
}: ListHeaderProps) => {
  return (
    <>
      <View style={styles.listHeader}>
        <HomeHeader
          title={`你好，${username}`}
          onAnalyticsPress={onAnalyticsPress}
          onCalendarPress={onCalendarPress}
          selectedDate={selectedDate}
        />

        {/* 总览卡片 */}
        <ContentWrapper>
          <Suspense fallback={
            <>
              <SkeletonLoader width="100%" height={60} />
              <Divider />
              <SkeletonLoader width="100%" height={60} />
            </>
          }>
            <>
              <FinancialSummaryItem title="总支出" amount={expenseAmount} />
              <Divider />
              <FinancialSummaryItem title="总收入" amount={incomeAmount} />
            </>
          </Suspense>
        </ContentWrapper>
      </View>

    </>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    marginTop: theme.spacing.xlarge,
    gap: theme.spacing.xlarge,
  },
});

export default ListHeader;
