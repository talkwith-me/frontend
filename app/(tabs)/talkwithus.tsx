import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Header from '@/components/Header';

const talkwithus = () => {
  return (
    <View>
      <Stack.Screen options={{
        header: () => <Header title={"우리의 대화"} />
      }} />
      <Text>우리의 대화</Text>
    </View>
  )
}

export default talkwithus