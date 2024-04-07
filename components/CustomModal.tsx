import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { defaultStyles } from '@/constants/Styles';

const CustomModal = (props: { visible: boolean, onRequestClose: () => void, onConfirm: () => void, onCancel: () => void, message: string }) => {
  return (
    <Modal
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onRequestClose}
    >
      <View style={styles.modalContainer}>
          <View style={defaultStyles.card}>
          <Text style={defaultStyles.fontM}>{props.message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={props.onCancel}>
              <Text style={defaultStyles.fontM}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={props.onConfirm}>
              <Text style={defaultStyles.fontM}>확인</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
    width: '100%',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CustomModal;
