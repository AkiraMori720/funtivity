import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
    },
    itemContainer: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemHeader: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemImage: {
        width: 48,
        height: 48,
        borderRadius: 24
    },
    itemText: {
        color: 'black',
        marginLeft: 8
    },
    emptyContainer: {
        flexGrow:1,
        alignItems: 'center',
        marginTop: 40
    },
    emptyText:{
        fontSize: 20,
        fontWeight: 'bold'
    }
});
