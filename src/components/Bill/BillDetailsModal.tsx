import React from 'react';
import { Modal, View, Text, Pressable, ScrollView } from 'react-native';
import { getLucideIcon } from '@/utils/icons';
import { kebabToPascalCase } from '@/utils/PascalCase';
import { theme } from '@/theme/theme';
import { Category } from '@/database/categories';

interface BillDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  bill: {
    category: Category;
    amount: string;
    date: string;
    description?: string;
  };
}

const BillDetailsModal = ({ visible, onClose, bill }: BillDetailsModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1 }}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}
          onPress={onClose}
        />
        <View
          style={{
            width: '100%',
            maxHeight: '70%',
            position: 'absolute',
            bottom: 0,
            backgroundColor: theme.colors.background,
            borderTopLeftRadius: theme.borderRadius.large,
            borderTopRightRadius: theme.borderRadius.large,
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              padding: theme.spacing.large,
              paddingBottom: 2 * theme.spacing.xxlarge,
            }}
          >
            {/* Category */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.large }}>
              <View style={{
                width: 2 * theme.spacing.xlarge,
                height: 2 * theme.spacing.xlarge,
                borderRadius: 20,
                backgroundColor: bill.category.color + '20',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: theme.spacing.medium,
              }}>
                {React.createElement(getLucideIcon(kebabToPascalCase(bill.category.icon)), {
                  size: theme.typography.h1,
                  color: bill.category.color,
                  strokeWidth: 1.5,
                })}
              </View>
              <Text style={{
                fontSize: theme.typography.h2,
                color: theme.colors.textPrimary,
                fontFamily: theme.typography.fontFamily.semiBold,
              }}>
                {bill.category.name}
              </Text>
            </View>

            {/* Amount */}
            <View style={{ marginBottom: theme.spacing.large }}>
              <Text style={{
                fontSize: theme.typography.caption,
                color: theme.colors.textSecondary,
                marginBottom: theme.spacing.small,
              }}>
                金额
              </Text>
              <Text style={{
                fontSize: theme.typography.h2,
                color: theme.colors.textPrimary,
                fontFamily: theme.typography.fontFamily.semiBold,
              }}>
                ¥{bill.amount}
              </Text>
            </View>

            {/* Date */}
            <View style={{ marginBottom: theme.spacing.large }}>
              <Text style={{
                fontSize: theme.typography.caption,
                color: theme.colors.textSecondary,
                marginBottom: theme.spacing.small,
              }}>
                日期
              </Text>
              <Text style={{
                fontSize: theme.typography.h2,
                color: theme.colors.textPrimary,
                fontFamily: theme.typography.fontFamily.regular,
              }}>
                {bill.date}
              </Text>
            </View>

            {/* Notes */}
            {bill.description && (
              <View>
                <Text style={{
                  fontSize: theme.typography.caption,
                  color: theme.colors.textSecondary,
                  marginBottom: theme.spacing.small,
                  fontFamily: theme.typography.fontFamily.regular,
                }}>
                  备注
                </Text>
                <Text style={{
                  fontSize: theme.typography.h2,
                  color: theme.colors.textPrimary,
                  fontFamily: theme.typography.fontFamily.regular,
                }}>
                  {bill.description}weqwasdasdasweqwasdasdasweqwasdasdasweqwasdasdasweqwasdasdasweqwasdasdasweqwasdasdasweqwasdasdas
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default BillDetailsModal;
