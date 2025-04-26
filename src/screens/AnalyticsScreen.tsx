import React, { useCallback } from 'react';
import { View, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'App';
import { theme } from '@/theme/theme';
import { OtherHeader } from '@/components/Headers';
import { useFocusEffect } from '@react-navigation/native';
import { TrendChart, PieChartLegend } from '@/components/Chart';

type AnalyticsScreenProps = NativeStackScreenProps<RootStackParamList, 'Analytics'>;

const AnalyticsScreen = ({ navigation }: AnalyticsScreenProps) => {
  // Hide the status bar on this Screen
  // Check: https://stackoverflow.com/questions/67900434/how-to-show-or-hide-status-bar-on-different-screens-in-react-native
  // for more details
  useFocusEffect(useCallback(() => {
    // This will run when screen is `focused` or mounted.
    StatusBar.setHidden(true);

    // This will run when screen is `blured` or unmounted.
    return () => {
      StatusBar.setHidden(false);
    };
  }, []));

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentWrapper}
        showsVerticalScrollIndicator={false}
      >
        <OtherHeader
          title="分析"
          onBackPress={navigation.goBack}
          style={{ paddingTop: theme.spacing.xlarge }}
        />

        <TrendChart />

        <PieChartLegend />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    padding: theme.spacing.large,
    paddingTop: 2 * theme.spacing.xlarge,
    paddingBottom: 0,
  },
  contentWrapper: {
    width: '100%',
    gap: theme.spacing.xlarge,
  },
});

export default AnalyticsScreen;
