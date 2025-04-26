import { StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';

export const styles = StyleSheet.create({
  titleText: {
    fontSize: theme.typography.h2,
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  amountText: {
    fontSize: theme.typography.h1,
    fontFamily: theme.typography.fontFamily.semiBold,
    color: theme.colors.textPrimary,
  },
});
