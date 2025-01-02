import React from 'react';
import { Text, TextProps } from 'react-native';
import { memo } from 'react';
import { FontFamily } from '../../../constants/AppFonts';

interface IProps extends TextProps {
  preset: {
    text: string;
    fontSize: number;
    color: string;
    fontWeight: 'italic' | 'thin' | 'regular' | 'medium' | 'bold';
  };
}

const CustomText = ({ preset, style, ...styleProp }: IProps) => {
  return (
    <Text
      {...styleProp}
      style={[
        {
          fontSize: preset.fontSize,
          color: preset.color,
          fontFamily:
            preset.fontWeight.toLowerCase() === 'italic'
              ? FontFamily.italic
              : preset.fontWeight.toLowerCase() === 'thin'
              ? FontFamily.thin
              : preset.fontWeight.toLowerCase() === 'regular'
              ? FontFamily.regular
              : preset.fontWeight.toLowerCase() === 'medium'
              ? FontFamily.medium
              : preset.fontWeight.toLowerCase() === 'bold'
              ? FontFamily.bold
              : FontFamily.regular,
        },
        style,
      ]}>
      {preset.text}
    </Text>
  );
};

export default memo(CustomText);
