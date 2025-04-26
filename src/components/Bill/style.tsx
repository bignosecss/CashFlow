import { StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';

export const style = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.small,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing.medium,
  },
  categoryText: {
    fontSize: theme.typography.h2,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.medium,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.small / 4,
  },
  amountText: {
    fontSize: theme.typography.body,
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.textPrimary,
  },
  dateText: {
    fontSize: theme.typography.label,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.small / 2,
    fontFamily: theme.typography.fontFamily.regular,
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
});
