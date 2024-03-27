import { View, Text } from 'react-native'
import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context';
import { defaultStyles } from '@/constants/Styles';

const Header = (props: {title: string}) => {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <View style={defaultStyles.headerContainer}>
            <Text style={defaultStyles.headerFont}>{props.title}</Text>
          </View>
      </SafeAreaView>
    )
}

export default Header;