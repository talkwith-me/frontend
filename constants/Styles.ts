import Colors from '@/constants/Colors';
import {StyleSheet} from 'react-native';


export const defaultStyles = StyleSheet.create({
    headerContainer: {
        backgroundColor: Colors.white,
        height: 60
    },
    headerFont: {
        fontFamily: 'ngc-b',
        padding: 20,
        fontSize: 20
    },
    bodyContainer: {
        top: 30,
        padding: 20
    },
    fontL: {
        fontFamily: 'ngc-b',
        fontSize: 18,
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 20,
    },
    fontM: {
        fontFamily: 'ngc',
        fontSize: 14,
        lineHeight: 24
    },
    fontS: {
        fontFamily: 'ngc',
        fontSize: 12,
        color: Colors.grey
    },
    button: {
        padding: 10, 
        backgroundColor: Colors.primary, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 10, 
        maxWidth: 70, 
        maxHeight: 40
    }
})