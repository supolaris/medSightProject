import { View, StyleSheet } from 'react-native';
import React from 'react';
import CustomText from '../texts/CustomText';
import { AppMessages } from '../../../constants/AppMessages';
import { AppColors } from '../../../constants/AppColors';
import { normalizeFont, normalizeHeight } from '../../../utils/CommonFunctions';

const RenderNoDataView = () => {
  return (
    <View style={styles.container}>
      <CustomText
        preset={{
          text: AppMessages.noDataAvailable,
          color: AppColors.black,
          fontSize: normalizeFont(18),
          fontWeight: 'bold',
        }}
        style={{
          textAlign: 'center',
        }}
      />
    </View>
  );
};

export default RenderNoDataView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: normalizeHeight(120),
  },
});
