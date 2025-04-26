import { View, Text, Pressable, StyleSheet, ViewProps } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { theme } from '@/theme/theme';

interface AddBillHeaderProps extends ViewProps {
  title: string;
  onBackPress: () => void;
}

const OtherHeader = ({ title, onBackPress, style, ...restProps }: AddBillHeaderProps) => {
  return (
    <View style={[styles.headerContainer, style]} {...restProps}>
      <Pressable onPress={onBackPress} style={styles.backButton}>
        <ArrowLeft size={theme.typography.largeTitle} color={theme.colors.textPrimary} strokeWidth={1.5} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  backButton: {
    marginBottom: theme.spacing.xlarge,
  },
  title: {
    fontSize: theme.typography.largeTitle,
    textAlign: 'left',
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.semiBold,
  },
});

export default OtherHeader;
