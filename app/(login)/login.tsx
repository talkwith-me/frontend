import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router'
import Colors from '@/constants/Colors';

const login = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Text>login</Text>
    </View>
  )
}

export default login