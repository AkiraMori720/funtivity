import { StyleSheet } from "react-native";

export default StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },
    itemHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    itemTail: {
        marginTop: 4,
    },
    itemImage: {
        width: 48,
        height: 48,
        borderRadius: 24
    },
    itemContent: {
        marginTop: 4,
        marginLeft: 8
    },
    itemTitle: {
        fontWeight: 'bold'
    },
    itemMessage: {

    },
    itemTime: {
        fontSize: 10
    }
});
