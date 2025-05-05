import React from 'react';
import { Pressable, Text, StyleSheet, Alert, ViewStyle } from 'react-native';
import { theme } from '@/theme/theme';

interface SaveBtnProps {
  onPress?: () => void;
  style?: ViewStyle;
}

const SaveBtn = ({ onPress, style }: SaveBtnProps) => {
  const handlePress = () => {
    onPress?.();
  };

  return (
    <Pressable
      style={({ pressed }) => [
        StyleSheet.flatten([styles.button, style]),
        { backgroundColor: pressed ? theme.colors.primaryBtn : theme.colors.primaryBtnHover },
      ]}
      onPress={handlePress}
    >
      <Text style={styles.text}>保存</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: theme.input.height,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.primaryBtn,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.typography.h2,
    fontFamily: theme.typography.fontFamily.medium,
    fontWeight: 'semibold',
  },
});

export default SaveBtn;
