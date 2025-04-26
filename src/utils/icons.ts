import * as LucideIcons from 'lucide-react-native';

export type LucideIconComponent = React.ComponentType<{
  size?: number;
  color?: string;
  strokeWidth?: number;
}>;

export const getLucideIcon = (iconName: string): LucideIconComponent => {
  return LucideIcons[iconName as keyof typeof LucideIcons] as LucideIconComponent;
};
