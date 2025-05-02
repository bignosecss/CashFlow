import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '@/theme/theme';
import ContentWrapper from '@/components/ContentWrapper';
import { PieChart } from 'react-native-gifted-charts';
import { defaultCategories } from '@/database/categories';
import { pieStyles as styles } from './pieStyle';

const PieChartLegend = () => {
  // Use first 3 expense categories as sample data
  const expenseCategories = defaultCategories.filter(c => c.type === 'expense').slice(0, 3);

  const pieData = expenseCategories.map(category => ({
    value: 33, // Number percentage values
    color: category.color,
    category,
  }));

  return (
    <ContentWrapper style={{ marginBottom: theme.spacing.xxlarge }}>
      <Text style={styles.chartTitle}>分类占比</Text>
      <View style={styles.container}>
        <View style={styles.chartWrapper}>
          <PieChart
            data={pieData}
            showText
            textColor="white"
            radius={100}
            textSize={theme.typography.h1}
            focusOnPress
            showValuesAsLabels
            showTextBackground={false}
          />
        </View>
        <View style={styles.legendContainer}>
          {pieData.map((item, index) => {
            return (
              <View key={index} style={styles.legendItem}>
                <Text style={{ fontSize: 20, color: item.category.color }}>
                  {item.category.icon}
                </Text>
                <Text style={styles.legendText}>{item.category.name}</Text>
                <Text style={styles.percentageText}>{item.value + ' %'}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </ContentWrapper>
  );
};



export default PieChartLegend;
