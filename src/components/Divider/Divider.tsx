import { StyleSheet, View } from 'react-native';
import { theme } from '@/theme/theme';

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.large,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    elevation: 1,
  },
});

export default Divider;
