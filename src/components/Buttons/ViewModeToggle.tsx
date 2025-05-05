import { View, Text, StyleSheet, Pressable } from 'react-native';
import { theme } from '@/theme/theme';

type ViewMode = 'monthly' | 'daily';

interface ViewModeToggleProps {
  mode: ViewMode;
  selectedDate: string;
  onModeChange: (mode: ViewMode) => void;
}

const ViewModeToggle = ({ mode, selectedDate, onModeChange }: ViewModeToggleProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  };
  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.button,
          mode === 'monthly' && styles.activeButton
        ]}
        onPress={() => onModeChange('monthly')}
      >
        <Text style={[
          styles.text,
          mode === 'monthly' && styles.activeText
        ]}>
          月度
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.button,
          mode === 'daily' && styles.activeButton
        ]}
        onPress={() => onModeChange('daily')}
      >
        <Text style={[
          styles.text,
          mode === 'daily' && styles.activeText
        ]}>
          {mode === 'daily' && selectedDate ? formatDate(selectedDate) : '指定日期'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    padding: 4,
    marginVertical: theme.spacing.medium,
  },
  button: {
    flex: 1,
    paddingVertical: theme.spacing.small,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: theme.colors.primaryBtn,
  },
  text: {
    fontSize: theme.typography.label,
    color: theme.colors.textHint,
  },
  activeText: {
    color: theme.colors.white,
  },
});

export default ViewModeToggle;
