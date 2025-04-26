import { PropsWithChildren } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';

interface ContentWrapperPropsType extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

const ContentWrapper = ({children, style}: ContentWrapperPropsType) => {
  return <View style={[styles.contentWrapper, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  contentWrapper: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.xxlarge,
    borderRadius: theme.borderRadius.medium,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: theme.shadow.shadowOpacity,
    shadowRadius: 2,
    elevation: theme.shadow.elevation,
  },
});

export default ContentWrapper;
