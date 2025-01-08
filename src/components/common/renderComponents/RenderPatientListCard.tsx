import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IMyPatientItems } from '../../../@types/CommonTypes';
import { formatDateOfBirth } from '../../../utils/CommonFunctions';

interface IProps {
  item: IMyPatientItems;
  onPatientPressed: (item: IMyPatientItems) => void;
}
const RenderPatientListCard = (props: IProps) => {
  return (
    <TouchableOpacity
      onPress={() => props.onPatientPressed(props.item)}
      style={[
        styles.patientCard,
        props.item.status === 'Active' && styles.activeCard,
      ]}>
      <Image
        resizeMode="contain"
        source={require('../../../assets/images/dummyUser.png')}
        style={styles.patientImage}
      />
      <View style={styles.patientInfo}>
        <Text style={styles.patientName}>
          Name: {props.item?.name[0]?.family}
        </Text>
        <Text style={styles.patientDetails}>
          DOB:{' '}
          {formatDateOfBirth(
            props.item?.birthDate ? props.item?.birthDate : '',
          )}
        </Text>
      </View>
      {props.item?.status === 'Active' && (
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{props.item?.status}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RenderPatientListCard;

const styles = StyleSheet.create({
  activeCard: {
    borderColor: '#0397A8',
    borderWidth: 1,
  },
  patientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  patientImage: {
    width: 42,
    height: 42,
    borderRadius: 25,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#06A2B4',
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
  },
  patientDetails: {
    fontSize: 12,
    color: '#555',
  },
  statusBadge: {
    backgroundColor: '#0397A8',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
  },
});
