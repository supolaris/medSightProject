import React, { memo } from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  DimensionValue,
} from 'react-native';

import { borderRadius } from '../../../utils/CommonFunctions';
import { AppColors } from '../../../constants/AppColors';
import CustomText from '../texts/CustomText';

interface IProps extends TouchableOpacityProps {
  preset: {
    width?: DimensionValue;
    height?: DimensionValue;
    text: string;
    textColor?: string;
    fontSize?: number;
    fontWeight?: 'bold' | 'medium' | 'regular';
    variant: 'primary' | 'secondary' | 'primaryIncative';
  };
  onPress?: () => void;
}

const CustomTouchable: React.FC<IProps> = ({ preset, style, ...props }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: preset.width,
          height: preset.height ? preset.height : 40,
          backgroundColor:
            preset.variant === 'primary'
              ? AppColors.primaryColor
              : preset.variant === 'secondary'
              ? AppColors.white
              : 'red',
        },
        preset.variant === 'secondary' && {
          borderWidth: 1,
          borderColor: AppColors.primaryColor,
        },
        style,
      ]}
      {...props}>
      <CustomText
        preset={{
          text: preset.text,
          fontSize: preset.fontSize ? preset.fontSize : 16,
          color: preset.textColor
            ? preset.textColor
            : preset.variant === 'primary'
            ? AppColors.white
            : AppColors.primaryColor,
          fontWeight: preset.fontWeight ? preset.fontWeight : 'bold',
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius,
    borderWidth: 0,
  },
});

export default memo(CustomTouchable);
