import { StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';

export const pieStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.large,
  },
  chartWrapper: {
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: theme.typography.h1,
    color: theme.colors.textPrimary,
    marginBottom: 2 * theme.spacing.medium,
    fontFamily: theme.typography.fontFamily.medium,
  },
  legendContainer: {
    marginTop: theme.spacing.large,
    gap: theme.spacing.medium,
  },
  legendItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.small,
  },
  legendText: {
    marginLeft: 8,
    fontSize: theme.typography.body,
    color: theme.colors.textPrimary,
    flex: 1,
    fontFamily: theme.typography.fontFamily.regular,
  },
  percentageText: {
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.regular,
  },
});
