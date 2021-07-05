import { StyleSheet } from "react-native";

export default StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 32,
        height: 170
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'white'
    },
    profileName: {
        marginTop: 12,
        color: 'white'
    },
    menuIcon: {
        width: 24,
        height: 24
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemCurrent: {
        backgroundColor: '#5c78a7'
    },
    itemLeft: {
        marginHorizontal: 10,
        width: 30,
        alignItems: 'center'
    },
    itemCenter: {
        flex: 1
    },
    itemText: {
        marginVertical: 16,
        color: 'black'
    },
});
