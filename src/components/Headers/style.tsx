import { StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';

export const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.medium,
  },
  title: {
    fontSize: theme.typography.h1,
    textAlign: 'left',
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.semiBold,
    flexShrink: 1,
    maxWidth: '70%',
  },
  calendarOptionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    padding: theme.spacing.small,
    borderRadius: theme.borderRadius.small,
    elevation: theme.shadow.elevation,
    shadowColor: '#000',
    shadowOpacity: theme.shadow.shadowOpacity,
    shadowRadius: theme.borderRadius.small / 2,
  },
  calendarOptionText: {
    fontSize: theme.typography.body,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.small / 2,
  },
});
