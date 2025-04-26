import { Pressable, StyleSheet } from 'react-native';
import { Plus } from 'lucide-react-native';
import { theme } from '@/theme/theme';

interface FABProps {
  onPress: () => void;
}

const FAB = ({ onPress }: FABProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.fab,
        { backgroundColor: pressed ? theme.colors.primaryBtn : theme.colors.primaryBtnHover },
      ]}
      onPress={onPress}
    >
      <Plus size={theme.typography.h1} color="white" strokeWidth={1.5} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: theme.button.fabSize,
    height: theme.button.fabSize,
    borderRadius: theme.button.fabSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: theme.button.fabPosition,
    right: theme.button.fabPosition,
    elevation: theme.shadow.elevation * 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: theme.shadow.shadowOpacity * 2.5,
    shadowRadius: 3.84,
  },
});

export default FAB;
