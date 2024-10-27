import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const BackButton = () => {
    const navigation = useNavigation();

    return (
        <View style={{padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1} style={{width: 60}}>
                <Ionicons name="arrow-back-outline" size={24} color={Colors.grey} />
            </TouchableOpacity>
        </View>
    );
}

export default BackButton;