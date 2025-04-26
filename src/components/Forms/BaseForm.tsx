import { PropsWithChildren } from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { theme } from '@/theme/theme';

interface BaseFormProps extends PropsWithChildren {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  style?: ViewStyle;
}

const BaseForm = ({ label, icon, children, style }: BaseFormProps) => {
  return (
    <View style={[{ marginTop: theme.spacing.medium, height: 100 }, style]}>
      <Text style={{
        fontSize: theme.typography.h2,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.medium,
        fontFamily: theme.typography.fontFamily.semiBold,
      }}>
        {label}
      </Text>
      <View style={{
        position: 'relative',
        backgroundColor: theme.colors.background,
        height: theme.input.height,
      }}>
        {children}
        {icon && (
          <View style={{
            position: 'absolute',
            left: theme.spacing.large,
            top: 0,
            height: '100%',
            justifyContent: 'center',
          }}>
            {icon}
          </View>
        )}
      </View>
    </View>
  );
};

export default BaseForm;
