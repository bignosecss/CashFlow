import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Dimensions, StatusBar, View, Alert } from 'react-native';
import { useCallback, useState, useEffect } from 'react';
import { useAddBill } from '@/hooks/useAddBill';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from 'App';
import ContentWrapper from '@/components/ContentWrapper';
import { OtherHeader } from '@/components/Headers';
import { AmountForm, CategoryForm, DateForm, NoteForm, CategoryDropdown } from '@/components/Forms';
import { SaveBtn } from '@/components/Buttons';
import { theme } from '@/theme/theme';
import useDateStore from '@/store/dateStore';
import useCategoryStore from '@/store/categoryStore';
import Toast from 'react-native-toast-message';
import { Bill } from '@/database/types';

type AddBillScreenProps = NativeStackScreenProps<RootStackParamList, 'AddBill'>;

const AddBillScreen = ({ navigation }: AddBillScreenProps) => {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const { selectedDate, setSelectedDate } = useDateStore();
  const { categories, selectedCategory, setSelectedCategory } = useCategoryStore();
  const { addBill, isPending } = useAddBill();

  const handleSaveBill = () => {
    if (!amount || !selectedCategory || !selectedDate) {
      Toast.show({
        type: 'error',
        text1: '错误',
        text2: '表单未全部填写'
      });
      return;
    }

    const billToAdd: Omit<Bill, 'id'> = {
      amount: parseFloat(amount),
      category_id: selectedCategory.id,
      date: selectedDate,
      note: note || ''
    };
    addBill(billToAdd);
    navigation.goBack();
  };

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

  useEffect(() => {
    if (!selectedCategory && categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, []);

  return (
    <ContentWrapper style={styles.container}>
      <View>
        <OtherHeader
          title="添加账单"
          onBackPress={navigation.goBack}
          style={{ paddingVertical: theme.spacing.xlarge }}
        />

        {/* 输入金额表单 */}
        <AmountForm 
          amount={amount}
          onChangeText={setAmount}
        />

        {/* 分类表单 */}
        <View style={{ position: 'relative' }}>
          <CategoryForm
            category={selectedCategory || categories[0]}
            onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
            isDropdownOpen={showCategoryDropdown}
          />
          <CategoryDropdown
            categories={categories}
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
        <NoteForm 
          note={note}
          onChangeText={setNote}
        />
      </View>

      {/* 保存账单按钮 */}
      <SaveBtn 
        style={{ marginTop: theme.spacing.xlarge }}
        onPress={handleSaveBill}
      />
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
