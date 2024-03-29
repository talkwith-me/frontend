import { View, Text } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = (props: {title: string}) => {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}} mode='padding'>
          <View style={defaultStyles.headerContainer}>
            <Text style={defaultStyles.headerFont}>{props.title}</Text>
          </View>
      </SafeAreaView>
    )
}

export default Header;