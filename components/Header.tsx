import { View, Text } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles';

const Header = (props: {title: string}) => {
  return (
    <View style={defaultStyles.headerContainer}>
      <Text style={defaultStyles.headerFont}>{props.title}</Text>
    </View>
  )
}

export default Header;