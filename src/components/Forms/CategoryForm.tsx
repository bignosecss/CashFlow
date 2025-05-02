import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getLucideIcon } from '@/utils/icons';
import { kebabToPascalCase } from '@/utils/PascalCase';
import BaseForm from './BaseForm';
import { theme } from '@/theme/theme';
import { Category } from '@/database/categories';

interface CategoryFormProps {
  category: Category;
  onPress: () => void;
  isDropdownOpen: boolean;
}

const CategoryForm = ({ category, onPress, isDropdownOpen }: CategoryFormProps) => {
  return (
    <BaseForm
      label="分类"
      icon={
        <Text style={{ fontSize: theme.typography.h1, color: category.color }}>
          {category.icon}
        </Text>
      }
    >
      <Pressable
        style={styles.container}
        onPress={onPress}
      >
        <View style={styles.content}>
          <Text style={styles.name}>{category.name}</Text>
          {React.createElement(getLucideIcon(kebabToPascalCase(isDropdownOpen ? 'chevron-down' : 'chevron-right')), {
            size: theme.typography.h1,
            color: theme.colors.textSecondary,
            strokeWidth: 1.5,
          })}
        </View>
      </Pressable>
    </BaseForm>
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
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.medium,
  },
  iconNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.small,
  },
  name: {
    fontSize: theme.typography.h2,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.regular,
    paddingLeft: theme.typography.h1 + 2 * theme.spacing.large,
  },
});

export default CategoryForm;
