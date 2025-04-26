import { View, Text, ViewProps } from 'react-native';
import { JapaneseYen } from 'lucide-react-native';
import { styles } from './style';
import { theme } from '@/theme/theme';

interface FinancialSummaryItemProps extends ViewProps {
  title: string;
  amount: string;
}

const FinancialSummaryItem = ({
  title,
  amount,
  ...restProps
}: FinancialSummaryItemProps) => {
  return (
    <View {...restProps}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.amountRow}>
      <JapaneseYen size={theme.typography.h1} strokeWidth={1.5} />
        <Text style={styles.amountText}>{amount}</Text>
      </View>
    </View>
  );
};

export default FinancialSummaryItem;
