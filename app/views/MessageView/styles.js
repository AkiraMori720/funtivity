import { StyleSheet } from "react-native";

export default StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        paddingVertical: 12,
        marginHorizontal: 20,
    },
    itemContent: {
        justifyContent: 'flex-start',
        flexGrow: 1,
        flex:1,
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
    },
    emptyContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText:{
        fontSize: 20,
        fontWeight: 'bold'
    }
});
