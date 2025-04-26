import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Calendar as CalendarIcon } from 'lucide-react-native';
import BaseForm from './BaseForm';
import { theme } from '@/theme/theme';
import Calendar from '@/components/Calendar';

interface DateFormProps {
  onDateChange?: (date: string) => void;
  initialDate?: string;
}

const DateForm = ({ onDateChange, initialDate }: DateFormProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(initialDate || new Date().toISOString().split('T')[0]);

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  return (
    <>
      <BaseForm
        label="日期"
        icon={<CalendarIcon size={theme.typography.h1} color={theme.colors.textSecondary} strokeWidth={1.5} />}
      >
        <Pressable
          style={styles.container}
          onPress={() => setShowCalendar(true)}
        >
          <Text style={styles.dateText}>{selectedDate}</Text>
        </Pressable>
      </BaseForm>

      <Calendar
        visible={showCalendar}
        onClose={() => setShowCalendar(false)}
        onDateSelect={(date) => {
          setSelectedDate(date);
          onDateChange?.(date);
        }}
        selectedDate={selectedDate}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.input.borderRadius,
    height: '100%',
    justifyContent: 'center',
    paddingRight: theme.spacing.large,
  },
  dateText: {
    fontSize: theme.typography.h2,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.regular,
    paddingLeft: theme.typography.h1 + 2 * theme.spacing.large,
  },
});

export default DateForm;
