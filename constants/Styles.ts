import Colors from '@/constants/Colors';
import {StyleSheet, Platform} from 'react-native';

export const defaultStyles = StyleSheet.create({
    headerContainer: {
        backgroundColor: Colors.white,
        height: 60,
    },
    headerFont: {
        fontFamily: 'ngc-b',
        padding: 20,
        fontSize: 20
    },
    bodyContainer: {
        top: Platform.OS === 'android' ? 60 : 26,
        padding: 20,
    },
    profileContainer: {
        top: Platform.OS === 'android' ? 60 : 26,
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        elevation: 5,
    },
    commentElement: {
        backgroundColor: Colors.white,
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 25,
        paddingBottom: 25,
    },
    listElement: {
        marginBottom: 1,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        paddingBottom: 15,
    },
    fontL: {
        fontFamily: 'ngc-b',
        fontSize: 18,
    },
    fontM: {
        fontFamily: 'ngc',
        fontSize: 14,
        lineHeight: 24
    },
    fontMBold: {
        fontFamily: 'ngc-b',
        fontSize: 14,
        lineHeight: 24
    },
    fontMwhite: {
        fontFamily: 'ngc',
        fontSize: 14,
        lineHeight: 24,
        color: Colors.white
    },
    fontMgrey: {
        fontFamily: 'ngc',
        fontSize: 14,
        lineHeight: 24,
        color: Colors.grey
    },
    fontS: {
        fontFamily: 'ngc',
        fontSize: 12,
        color: Colors.grey
    },
    fontSBlack: {
        fontFamily: 'ngc',
        fontSize: 12,
    },
    fontSBold: {
        fontFamily: 'ngc-b',
        fontSize: 12,
    },
    fontSPrimary: {
        fontFamily: 'ngc',
        fontSize: 12,
        color: Colors.primary
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