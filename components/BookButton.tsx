import { TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { defaultStyles } from '@/constants/Styles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

const BookButton = () => {

  const showBookOptions = () => {
    router.push('/(books)/change');
  }

  return (
    <TouchableOpacity style={defaultStyles.floatingButton} activeOpacity={0.7} onPress={showBookOptions}>
        <Text style={defaultStyles.fontSWhite}>질문지 변경</Text>
        <MaterialCommunityIcons name="bookshelf" size={22} color="white" />
    </TouchableOpacity>
  )
}

export default BookButton