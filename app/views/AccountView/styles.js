import { StyleSheet } from "react-native";
import {COLOR_BORDER, COLOR_BUTTON_GRAY, COLOR_GRAY_LIGHT, COLOR_WHITE} from "../../constants/colors";

export default StyleSheet.create({
    headerContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    headerBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        opacity: 0.4
    },
    accountImage: {
        width: 140,
        height: 140,
        borderRadius: 70
    },
    accountEmail: {
        marginTop: 8,
        fontWeight: 'bold',
        color: COLOR_WHITE
    },
    accountName: {
        color: COLOR_WHITE,
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 8,
    },
    accountAddress: {
        marginTop: 8,
        color: COLOR_WHITE
    },
    actionContainer: {
        flexDirection: 'row',
        marginTop: 16
    },
    accountAction: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        marginHorizontal: 8,
        paddingHorizontal: 16,
        paddingVertical: 4
    },
    actionImage: {
        width: 32,
        height: 32
    },
    actionText: {
        color: COLOR_WHITE
    },
    option: {
        padding: 16,
        borderTopColor: COLOR_BORDER,
        borderTopWidth: 1
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    optionContent: {
        color: 'grey'
    }
});
