import { StyleSheet } from "react-native";
import {COLOR_BORDER, COLOR_WHITE} from "../../constants/colors";

export default StyleSheet.create({
    inputContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        borderTopWidth: 1,
        borderTopColor: COLOR_BORDER,
        backgroundColor: COLOR_WHITE,
        maxHeight: 44
    },
    input: {
        flexGrow: 1,
        marginLeft: 4,
        marginRight: 48,
        padding: 10,
        fontSize: 14,
        backgroundColor: 'white',
    },
    btnContainer: {
        position: 'absolute',
        right : 12
    },
    sendBtn: {
        width: 32,
        height: 32,
        borderRadius: 16
    }
});
