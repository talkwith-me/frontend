import Colors from '@/constants/Colors';
import {StyleSheet, Platform} from 'react-native';
import FontStyle from './FontStyle';
import FontUtil from '@/app/util/FontUtil';

export const defaultStyles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: Colors.white,
        flex: 1,
        paddingBottom: Platform.OS === 'android' ? 10 : -30,
    },
    headerContainer: {
        backgroundColor: Colors.white,
        height: Platform.OS === 'android' ? 64 : 60
    },
    headerFont: {
        fontFamily: FontUtil.bold,
        padding: 20,
        fontSize: 20
    },
    bodyContainer: {
        padding: 20,
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
    viewAllCard: {
        backgroundColor: Colors.white,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
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
    textInput: {
        fontFamily: FontUtil.regular,
        fontSize: 15,
        lineHeight: 25,
        marginTop: 30,
        textAlignVertical: 'top',	// iOS, 안드로이드 전부 상단에서 시작하게 설정
    },
    fontL: {
        ...FontStyle.fontL
    },
    fontM: {
        ...FontStyle.fontM
    },
    fontMWhite: {
        ...FontStyle.fontM,
        lineHeight: 18,
        color: Colors.white
    },
    fontMBold: {
        ...FontStyle.fontMBold,
    },
    fontMBoldPrimary: {
        ...FontStyle.fontMBold,
        color: Colors.primary
    },
    fontMBoldSecondary: {
        ...FontStyle.fontMBold,
        color: Colors.secondary
    },
    fontMBoldwhite: {
        ...FontStyle.fontMBold,
        lineHeight: 14,
        color: Colors.white
    },
    fontMwhite: {
        ...FontStyle.fontM,
        color: Colors.white
    },
    fontMgrey: {
        ...FontStyle.fontM,
        color: Colors.grey
    },
    fontS: {
        ...FontStyle.fontS,
        color: Colors.grey
    },
    fontSBlack: {
        ...FontStyle.fontS
    },
    fontSBold: {
        ...FontStyle.fontSBold
    },
    fontSPrimary: {
        ...FontStyle.fontS,
        color: Colors.primary
    },
    fontSWhite: {
        ...FontStyle.fontS,
        color: Colors.white
    },
    button: {
        padding: 10, 
        backgroundColor: Colors.primary, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 10, 
        maxWidth: 70, 
        maxHeight: 40
    },
    buttonOpaquely: {
        padding: 10, 
        backgroundColor: Colors.primary, 
        opacity: 0.5,
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 10, 
        maxWidth: 70, 
        maxHeight: 40
    },
    bottomSheetBackground: {
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    bottomSheetModal: {
        position: 'absolute', 
        bottom: 0, 
        padding: 20, 
        width: '100%', 
        borderTopStartRadius: 25, 
        borderTopEndRadius: 25, 
        backgroundColor: Colors.lightGrey
    },
    buttonConfirm: {
        backgroundColor: Colors.primary,
        paddingVertical: 13,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center'
    }
})