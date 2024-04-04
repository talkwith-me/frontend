import React from 'react';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { defaultStyles } from '@/constants/Styles';

export default function TabLayout() {
    const size = 20;

    return (
        <Tabs 
            sceneContainerStyle={{backgroundColor: Colors.lightGrey}} 
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
                tabBarLabelStyle: {fontFamily: 'ngc-b'},
                tabBarStyle: defaultStyles.tabBarStyle
            }
        }>
            <Tabs.Screen 
                name="index"
                options={{
                    title: '나와의 대화',
                    tabBarLabel: '나와의 대화',
                    tabBarIcon: ({color}) => <FontAwesome6 name="pen-to-square" size={size} color={color} />
                }}
            />
            <Tabs.Screen 
                name="talkwithus" 
                options={{
                    title: '우리의 대화',
                    tabBarLabel: '우리의 대화',
                    tabBarIcon: ({color}) => <Ionicons name="chatbubbles" size={size} color={color} />
                }}
            />
            <Tabs.Screen 
                name="profile" 
                options={{
                    title: '마이페이지',
                    tabBarLabel: '마이페이지',
                    tabBarIcon: ({color}) => <FontAwesome name="user" size={size} color={color} />
                }}
            />
        </Tabs>
    )
}
