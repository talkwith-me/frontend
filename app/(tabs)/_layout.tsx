import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import * as Haptics from 'expo-haptics';
import { Tabs } from 'expo-router';
import React from 'react';
import FontUtil from '../util/FontUtil';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
    const size = 20;

    return (
        <Tabs
            sceneContainerStyle={{
                backgroundColor: Colors.lightGrey
            }}
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
                tabBarLabelStyle: {
                    fontFamily: FontUtil.bold
                }
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: '경험 분석',
                    tabBarLabel: '경험 분석',
                    tabBarIcon: ({color}) => <Entypo name="briefcase" size={size} color={color} />
                }}
                listeners={{
                    tabPress: (e) => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    }
                }}/>
            <Tabs.Screen
                name="talkwithme"
                options={{
                    title: '가치관 분석',
                    tabBarLabel: '가치관 분석',
                    tabBarIcon: ({color}) => <Ionicons name="chatbubble" size={size} color={color}/>
                }}
                listeners={{
                    tabPress: (e) => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    }
                }}/>
            <Tabs.Screen
                name="report"
                options={{
                    title: '리포트',
                    tabBarLabel: '리포트',
                    tabBarIcon: ({color}) => <Ionicons name="document-text" size={size} color={color}/>
                }}
                listeners={{
                    tabPress: (e) => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    }
                }}/>
            <Tabs.Screen
                name="profile"
                options={{
                    title: '마이페이지',
                    tabBarLabel: '마이페이지',
                    tabBarIcon: ({color}) => <FontAwesome name="user" size={size} color={color}/>
                }}
                listeners={{
                    tabPress: (e) => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    }
                }}/>
        </Tabs>
    )
}
