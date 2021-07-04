import { StyleSheet } from "react-native";

export default StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    itemContent: {
        justifyContent: 'flex-start',
        flexGrow: 1,
        marginLeft: 8
    },
    itemHeader: {
        marginTop: 4,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    unread: {
        width: 16,
        height: 16,
        borderRadius: 8
    },
    itemImage: {
        width: 48,
        height: 48,
        borderRadius: 24
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
