import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Dimensions, StatusBar, View } from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from 'App';
import ContentWrapper from '@/components/ContentWrapper';
import { OtherHeader } from '@/components/Headers';
import { AmountForm, CategoryForm, DateForm, NoteForm, CategoryDropdown } from '@/components/Forms';
import { SaveBtn } from '@/components/Buttons';
import { theme } from '@/theme/theme';
import { defaultCategories } from '@/database/categories';

type AddBillScreenProps = NativeStackScreenProps<RootStackParamList, 'AddBill'>;

const AddBillScreen = ({ navigation }: AddBillScreenProps) => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategories[0]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Hide the status bar on this Screen
  // Check: https://stackoverflow.com/questions/67900434/how-to-show-or-hide-status-bar-on-different-screens-in-react-native
  // for more details
  useFocusEffect(useCallback(() => {
    // This will run when screen is `focused` or mounted.
    StatusBar.setHidden(true);

    // This will run when screen is `blured` or unmounted.
    return () => {
      StatusBar.setHidden(false);
    };
  }, []));

  return (
    <ContentWrapper style={styles.container}>
      <View>
        <OtherHeader
          title="添加账单"
          onBackPress={navigation.goBack}
          style={{ paddingVertical: theme.spacing.xlarge }}
        />

        {/* 输入金额表单 */}
        <AmountForm />

        {/* 分类表单 */}
        <View style={{ position: 'relative' }}>
          <CategoryForm
            category={selectedCategory}
            onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
            isDropdownOpen={showCategoryDropdown}
          />
          <CategoryDropdown
            categories={defaultCategories}
            onSelect={(category) => {
              setSelectedCategory(category);
              setShowCategoryDropdown(false);
            }}
            visible={showCategoryDropdown}
          />
        </View>

        {/* 日期表单 */}
        <DateForm 
          initialDate={selectedDate}
          onDateChange={setSelectedDate}
        />

        {/* 备注表单 */}
        <NoteForm />
      </View>

      {/* 保存账单按钮 */}
      <SaveBtn style={{ marginTop: theme.spacing.xlarge }} />
    </ContentWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height,
    paddingTop: 2 * theme.spacing.xlarge,
    paddingHorizontal: theme.spacing.large,
    gap: theme.spacing.large,
  },
});

export default AddBillScreen;
