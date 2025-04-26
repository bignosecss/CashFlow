import { Pressable, Text, View, ViewProps } from 'react-native';
import { ChevronRight, ChartNoAxesColumn } from 'lucide-react-native';
import { styles } from './style';
import { theme } from '@/theme/theme';

interface HeaderPropsType extends ViewProps {
  title: string;
  onAnalyticsPress?: () => void;
  onCalendarPress?: () => void;
  selectedDate?: string;
}

const HomeHeader = ({
  title,
  onAnalyticsPress,
  onCalendarPress,
  selectedDate,
  ...restProps
}: HeaderPropsType) => {
  return (
    <View style={styles.headerContainer} {...restProps}>
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
      <View style={{flexDirection: 'row', gap: 8}}>
        <Pressable
          style={styles.calendarOptionButton}
          onPress={onAnalyticsPress}
        >
          <ChartNoAxesColumn size={theme.typography.h1} color={theme.colors.textSecondary} strokeWidth={1.5} />
        </Pressable>
        <Pressable 
          style={styles.calendarOptionButton} 
          onPress={() => {
            onCalendarPress?.();
          }}
        >
          <Text style={styles.calendarOptionText}>
            {selectedDate ? new Date(selectedDate).toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long'
            }) : '选择日期'}
          </Text>
          <ChevronRight size={theme.typography.h1} color={theme.colors.textSecondary} strokeWidth={1.5} />
        </Pressable>
      </View>
    </View>
  );
};

export default HomeHeader;
