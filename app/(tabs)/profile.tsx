import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Header from '@/components/Header'

const profile = () => {
  return (
    <View>
      <Stack.Screen options={{
        header: () => <Header title={"마이페이지"} />
      }} />
    </View>
  )
}

export default profile