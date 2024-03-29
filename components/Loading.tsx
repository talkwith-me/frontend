import { View } from 'react-native'
import React from 'react'
import {ActivityIndicator} from 'react-native';
import Colors from '@/constants/Colors';

const Loading = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  )
}

export default Loading