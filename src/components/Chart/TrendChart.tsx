import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { theme } from '@/theme/theme';
import ContentWrapper from '../ContentWrapper';

type DailyData = {
  day: string;
  income: number;
  expense: number;
};

const TrendChart = () => {
  // Generate 30 days of fake data with realistic fluctuations
  const data: DailyData[] = Array.from({length: 30}, (_, i) => {
    const day = i + 1;
    // Base values with some randomness
    const baseIncome = 1000 + Math.random() * 500;
    const baseExpense = 600 + Math.random() * 400;

    // Add weekly patterns (higher on weekends)
    const isWeekend = (day % 7 === 0) || (day % 7 === 6);
    const income = Math.round(baseIncome * (isWeekend ? 1.3 : 1));
    const expense = Math.round(baseExpense * (isWeekend ? 1.5 : 1));

    return {
      day: `${day}日`,
      income,
      expense,
    };
  });

  const lineData = data.flatMap(item => [
    {
      value: item.income,
      label: item.day,
      labelTextStyle: { color: theme.colors.textSecondary },
      dataPointColor: theme.colors.success,
    },
    {
      value: item.expense,
      label: item.day,
      labelTextStyle: { color: theme.colors.textSecondary },
      dataPointColor: theme.colors.error,
    },
  ]);

  return (
  <ContentWrapper>
      <Text style={styles.chartTitle}>月度支出/收入趋势图</Text>
      <View style={styles.container}>
        <LineChart
          data={lineData.map((item, i) => ({
            ...item,
            label: i % 6 === 0 ? item.label : '', // 每3天显示一个标签
            labelTextStyle: {
              color: i % 6 === 0 ? theme.colors.textSecondary : 'transparent',
              fontSize: 10,
              width: 24,
              textAlign: 'center',
            },
          }))}
          color={theme.colors.success}
          color2={theme.colors.error}
          height={200}
          width={300}
          noOfSections={4}
          yAxisThickness={0}
          yAxisTextStyle={{color: theme.colors.textSecondary}}
          xAxisThickness={0}
          xAxisLabelTextStyle={{
            color: theme.colors.textSecondary,
            fontSize: 10,
            width: 24,
            textAlign: 'center',
          }}
          curved
          hideDataPoints
          spacing={12}
          isAnimated
          animationDuration={1200}
          startOpacity={0.1}
          endOpacity={1}
        />
      </View>
    </ContentWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.medium,
  },
  chartTitle: {
    fontSize: theme.typography.h1,
    color: theme.colors.textPrimary,
    marginBottom: 2 * theme.spacing.medium,
    fontFamily: theme.typography.fontFamily.medium,
  },
});

export default TrendChart;
