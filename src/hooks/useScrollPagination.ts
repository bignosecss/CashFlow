import { useCallback } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

const useScrollPagination = (loadMore: () => void) => {
  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
    if (isCloseToBottom) {
      loadMore();
    }
  }, [loadMore]);

  return {
    handleScroll,
  };
};

export default useScrollPagination;
