import { TextInput } from 'react-native';
import { theme } from '@/theme/theme';
import BaseForm from './BaseForm';

interface NoteFormPropType {
  note: string;
  onChangeText: (text: string) => void;
}

const NoteForm = ({ note, onChangeText }: NoteFormPropType) => {
  return (
    <BaseForm label="备注">
      <TextInput
        style={{
          height: '100%',
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: theme.input.borderRadius,
          paddingHorizontal: theme.spacing.large,
          fontSize: theme.typography.h2,
          color: theme.colors.textPrimary,
          fontFamily: theme.typography.fontFamily.regular,
        }}
        placeholder="添加备注..."
        placeholderTextColor={theme.colors.textHint}
        value={note}
        onChangeText={onChangeText}
      />
    </BaseForm>
  );
};

export default NoteForm;
