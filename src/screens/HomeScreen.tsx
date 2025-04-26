import { useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'App';
import useBills from '@/hooks/useBills';
import useScrollPagination from '@/hooks/useScrollPagination';
import { theme } from '@/theme/theme';
import { ListHeader } from '@/components/Headers';
import { BillsList } from '@/components/Bill';
import { FAB } from '@/components/Buttons';
import ViewModeToggle from '@/components/Buttons/ViewModeToggle';
import Calendar from '@/components/Calendar';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const {
    bills,
    isLoadingMore,
    loadMore,
    viewMode,
    selectedDate,
    setViewMode,
    onDateSelect,
  } = useBills();
  const { handleScroll } = useScrollPagination(loadMore);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={400}
      >
        <ListHeader
          username="pterosaurscannotfly"
          incomeAmount="3,500.00"
          expenseAmount="2,300.00"
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
        {isLoadingMore && (
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
