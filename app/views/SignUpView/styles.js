import { StyleSheet } from "react-native";

export default StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    formContainer: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 18,
    },
    submitBtn: {
        marginTop: 12,
        paddingVertical: 2,
        alignSelf: 'center'
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    terms: {
    },
    termItem: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});
