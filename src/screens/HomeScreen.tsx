import { useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'App';
import useBills from '@/hooks/useBills';
import { theme } from '@/theme/theme';
import { ListHeader } from '@/components/Headers';
import { BillsList } from '@/components/Bill';
import { FAB } from '@/components/Buttons';
import ViewModeToggle from '@/components/Buttons/ViewModeToggle';
import Calendar from '@/components/Calendar';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const {
    bills,
    isLoading,
    viewMode,
    selectedDate,
    setViewMode,
    onDateSelect,
  } = useBills();

  const incomeAmount = bills
    .filter(bill => bill.category.type === 'income')
    .reduce((sum, bill) => sum + parseFloat(bill.amount), 0)
    .toFixed(2);

  const expenseAmount = bills
    .filter(bill => bill.category.type === 'expense')
    .reduce((sum, bill) => sum + parseFloat(bill.amount), 0)
    .toFixed(2);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        <ListHeader
          username="pterosaurscannotfly"
          incomeAmount={incomeAmount}
          expenseAmount={expenseAmount}
          onAnalyticsPress={() => navigation.navigate('Analytics')}
          onCalendarPress={() => setShowCalendar(true)}
          selectedDate={selectedDate}
        />
        <ViewModeToggle
          mode={viewMode}
          selectedDate={selectedDate}
          onModeChange={setViewMode}
        />
        <BillsList bills={bills} />
        <Calendar
          visible={showCalendar}
          onClose={() => setShowCalendar(false)}
          onDateSelect={onDateSelect}
          selectedDate={selectedDate}
        />
        {isLoading && (
          <View style={{ paddingVertical: theme.spacing.xxlarge }}>
            <ActivityIndicator size="large" color={theme.colors.primaryBtn} />
          </View>
        )}
      </ScrollView>
      <FAB onPress={() => navigation.navigate('AddBill')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    position: 'relative',
    padding: theme.spacing.large,
    paddingBottom: 0, // 消除手机底部的遮挡高度（padding & margin 会造成底部对于 ScrollView 有一定遮挡
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2 * theme.spacing.xlarge,
  },
  listContent: {
    paddingVertical: 2 * theme.spacing.xlarge,
    gap: theme.spacing.xlarge,
    backgroundColor: theme.colors.background,
  },
});


export default HomeScreen;
