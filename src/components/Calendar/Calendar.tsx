import React, {useState} from 'react';
import {Modal, View, TouchableOpacity} from 'react-native';
import {Calendar as RNCalendar, DateData, LocaleConfig} from 'react-native-calendars';
import {theme} from '../../theme/theme';

interface CalendarProps {
  visible: boolean;
  onClose: () => void;
  onDateSelect: (date: string) => void;
  selectedDate: string;
}

// 配置中文语言
LocaleConfig.locales['zh_CN'] = {
  monthNames: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
  monthNamesShort: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
  dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
  dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
};

LocaleConfig.defaultLocale = 'zh_CN';

const Calendar = ({
  visible,
  onClose,
  onDateSelect,
  selectedDate,
}: CalendarProps) => {

  const handleDayPress = (day: DateData) => {
    onDateSelect(day.dateString);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={onClose}
      >
        <View
          style={{
            backgroundColor: theme.colors.background,
            borderRadius: 12,
            padding: 16,
            width: '90%',
        }}>
          <RNCalendar
            current={selectedDate}
            onDayPress={handleDayPress}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: theme.colors.primaryBtn,
              },
            }}
            monthFormat={'yyyy年 MM月'}
            firstDay={1} // 周一作为第一天
            theme={{
              backgroundColor: theme.colors.background,
              calendarBackground: theme.colors.background,
              textSectionTitleColor: theme.colors.textPrimary,
              selectedDayBackgroundColor: theme.colors.primaryBtn,
              selectedDayTextColor: '#ffffff',
              todayTextColor: theme.colors.primaryBtn,
              dayTextColor: theme.colors.textPrimary,
              textDisabledColor: theme.colors.textHint,
              dotColor: theme.colors.primaryBtn,
              selectedDotColor: '#ffffff',
              arrowColor: theme.colors.primaryBtn,
              monthTextColor: theme.colors.textPrimary,
              indicatorColor: theme.colors.primaryBtn,
              textDayFontFamily: theme.typography.fontFamily.regular,
              textMonthFontFamily: theme.typography.fontFamily.medium,
              textDayHeaderFontFamily: theme.typography.fontFamily.medium,
              textDayFontSize: theme.typography.caption + 2,
              textMonthFontSize: theme.typography.caption + 2,
              textDayHeaderFontSize: theme.typography.caption + 2,
            }}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default Calendar;
