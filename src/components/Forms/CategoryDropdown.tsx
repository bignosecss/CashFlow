import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '@/theme/theme';
import { Category } from '@/database/categories';

interface CategoryDropdownProps {
  categories: Category[];
  onSelect: (category: Category) => void;
  visible: boolean;
}

const CategoryDropdown = ({ categories, onSelect, visible }: CategoryDropdownProps) => {
  if (!visible) {
    return null;
  }

  return (
    <ScrollView
      style={styles.dropdown}
      nestedScrollEnabled
    >
      {categories.map((category) => (
        <Pressable
          key={category.id}
          style={({ pressed }) => [
            styles.option,
            pressed && { backgroundColor: 'white' },
          ]}
          onPress={() => onSelect(category)}
        >
          <View style={styles.optionContent}>
            <Text style={{ fontSize: theme.typography.h1, color: category.color }}>
              {category.icon}
            </Text>
            <Text style={styles.optionText}>{category.name}</Text>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    top: '100%',
    maxHeight: 300,
    width: '100%',
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.input.borderRadius,
    marginTop: theme.spacing.small,
    zIndex: 100,
  },
  option: {
    paddingVertical: theme.spacing.medium,
    paddingHorizontal: theme.spacing.large,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.medium,
  },
  optionText: {
    fontSize: theme.typography.h2,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily.regular,
  },
});

export default CategoryDropdown;
