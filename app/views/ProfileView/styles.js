import { StyleSheet } from "react-native";

export default StyleSheet.create({
    header: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey'
    },
    avatarContainer: {
        position: 'relative'
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 1,
        borderColor: 'white'
    },
    actionImage: {
        width: 48,
        height: 48,
    },
    editAction: {
        position: 'absolute',
        right: -10,
        top: -20
    },
    setAvatarAction: {
        position: 'absolute',
        right: -36,
        top: 47
    },
    selectThemeAction: {
        position: 'absolute',
        right: -10,
        top: 112
    },
    profileEmail: {
        marginTop: 32,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    profileName: {
        marginTop: 12,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    optionContainer: {
        height: 64,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderBottomWidth: 1
    },
    optionMenuTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    optionViewTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
});
