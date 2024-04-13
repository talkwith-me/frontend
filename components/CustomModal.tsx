import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { defaultStyles } from '@/constants/Styles';
import Colors from '@/constants/Colors';

const CustomModal = (props: { 
  visible: boolean, 
  onRequestClose: () => void, 
  onConfirm: () => void, 
  onCancel?: () => void, 
  title?: string,
  message?: string,
  smallButton?: boolean
}) => {
  return (
    <Modal
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onRequestClose}
    >
      <View style={styles.modalContainer}>
          <View style={[defaultStyles.card, {padding: 25}]}>
            {props.title && (
              <Text style={[defaultStyles.fontL, {paddingVertical: 10}]}>{props.title}</Text>
            )}
            {props.message && (
              <Text style={[defaultStyles.fontM, {paddingVertical: 5}]}>{props.message}</Text>
            )}
            <View style={styles.buttonContainer}>
              {props.onCancel && (
                <TouchableOpacity style={styles.buttonClose} onPress={props.onCancel} activeOpacity={0.6}>
                  {props.smallButton ? (
                    <Text style={defaultStyles.fontM}>닫기</Text>
                  ) : (
                    <Text style={[defaultStyles.fontMBold, {fontSize: 16}]}>닫기</Text>
                  )}
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.buttonConfirm} onPress={props.onConfirm} activeOpacity={0.6}>
                {props.smallButton ? (
                  <Text style={[defaultStyles.fontM, {color: Colors.white}]}>확인</Text>
                ) : (
                  <Text style={[defaultStyles.fontMBold, {color: Colors.white, fontSize: 16}]}>확인</Text>
                )}
              </TouchableOpacity>
            </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  buttonClose: {
    backgroundColor: Colors.lightGrey,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center'
  },
  buttonConfirm: {
    backgroundColor: Colors.primary,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1, 
    alignItems: 'center'
  }
});

export default CustomModal;
