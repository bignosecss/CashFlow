import { DimensionValue, View, ViewStyle } from 'react-native';

interface SkeletonLoaderProps {
  width: DimensionValue;
  height: DimensionValue;
  style?: ViewStyle;
}

const SkeletonLoader = ({ width, height, style = {} }: SkeletonLoaderProps) => (
  <View
    style={[
      {
        width,
        height,
        backgroundColor: '#E5E7EB',
        borderRadius: 12,
      },
      style,
    ]}
  />
);

export default SkeletonLoader;
