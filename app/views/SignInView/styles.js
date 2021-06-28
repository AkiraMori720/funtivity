import { StyleSheet } from "react-native";

export default StyleSheet.create({
    logo: {
        width: 120,
        height: 120
    },
    formContainer: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 18,
    },
    submitBtn: {
        marginTop: 8,
        paddingVertical: 2,
        alignSelf: 'center'
    },
    forgotContainer: {
        marginTop: 20
    },
    forgotText: {
        textAlign: 'center'
    },
    oauthContainer: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 12
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20
    }
});
