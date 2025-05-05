import { JapaneseYen } from 'lucide-react-native';
import { TextInput } from 'react-native';
import { theme } from '@/theme/theme';
import BaseForm from './BaseForm';

interface AmountFormPropType {
  amount: string;
  onChangeText: (text: string) => void;
}

const AmountForm = ({ amount, onChangeText }: AmountFormPropType) => {
  return (
    <BaseForm label="金额" icon={<JapaneseYen size={24} color={theme.colors.textPrimary} strokeWidth={1.5} />}>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: theme.input.borderRadius,
          height: '100%',
          paddingLeft: theme.typography.h1 + 2 * theme.spacing.large,
          paddingRight: theme.spacing.large,
          fontSize: theme.typography.h2,
          color: theme.colors.textPrimary,
          fontFamily: theme.typography.fontFamily.regular,
        }}
        placeholderTextColor={theme.colors.textHint}
        keyboardType="numeric"
        value={amount}
        onChangeText={onChangeText}
      />
    </BaseForm>
  );
};

export default AmountForm;
