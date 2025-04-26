import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { getLucideIcon } from '@/utils/icons';
import { kebabToPascalCase } from '@/utils/PascalCase';
import { Category } from '@/database/categories';
import { style } from './style';
import { theme } from '@/theme/theme';

type BillItemProps = {
  category: Category | undefined;
  amount: string;
  date: string;
  onPress: () => void;
};

const Bill = ({ category, amount, date, onPress }: BillItemProps) => {
  return (
    <Pressable
      style={style.card}
      onPress={onPress}
    >
      <View style={style.categoryContainer}>
        <View style={style.icon}>
          {category && React.createElement(getLucideIcon(kebabToPascalCase(category.icon)), {
            size: theme.typography.h1,
            color: category.color,
            strokeWidth: 1.5,
          })}
        </View>
        <Text style={style.categoryText}>{category?.name}</Text>
      </View>
      <View style={style.rightContainer}>
        <View style={style.amountContainer}>
          {React.createElement(getLucideIcon(kebabToPascalCase('japanese-yen')), {
            size: theme.typography.caption,
            color: theme.colors.textPrimary,
            strokeWidth: 1.5,
          })}
          <Text style={style.amountText}>{amount}</Text>
        </View>
        <Text style={style.dateText}>{date}</Text>
      </View>
    </Pressable>
  );
};

export default Bill;
