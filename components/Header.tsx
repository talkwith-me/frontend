import { defaultStyles } from '@/constants/Styles';
import React from 'react';
import { Text, View } from 'react-native';

const Header = (props: {title: string}) => {
  return (
    <View style={defaultStyles.headerContainer}>
      <Text style={defaultStyles.headerFont}>{props.title}</Text>
    </View>
  )
}

export default Header;