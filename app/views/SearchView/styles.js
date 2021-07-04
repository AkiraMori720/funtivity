import { StyleSheet } from "react-native";
import {COLOR_BLUE} from "../../constants/colors";

export default StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 8,
        justifyContent: 'space-between'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1
    },
    itemImage: {
        width: 48,
        height: 48,
        borderRadius: 24
    },
    itemName: {
        marginLeft: 12
    },
    actionContainer: {

    },
    action: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        paddingVertical: 2,
        paddingHorizontal: 12
    },
    actionImage: {
        width: 128,
        height: 30
    },
    actionText: {
        marginLeft: 4,
        color: 'white'
    }
});
