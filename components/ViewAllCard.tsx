import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';

const ViewAllCard = (props: {text: string, onPress: () => void}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
        <View style={{padding: 20}}>
            <View style={defaultStyles.viewAllCard}>
                <FontAwesome style={[defaultStyles.fontL]} name="angle-right" />
            </View>
            <Text style={[defaultStyles.fontS, {textAlign: 'center', marginTop: 10, lineHeight: 18}]}>{props.text}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default ViewAllCard;