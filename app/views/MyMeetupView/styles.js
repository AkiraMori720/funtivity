import { StyleSheet } from "react-native";
import {COLOR_WHITE} from "../../constants/colors";

export default StyleSheet.create({
    container: {
        paddingVertical: 20,
    },
    detail: {
        paddingHorizontal: 16
    },
    header: {
        marginBottom: 8
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    captionText: {
        fontSize: 12,
    },
    content: {
        flexDirection: 'row',
    },
    mainImage: {
        width: 256,
        height: 200
    },
    subImages: {
        height: 200,
        marginLeft: 8,
        flexGrow: 1,
        justifyContent: 'space-between'
    },
    subImage: {
        width: '100%',
        height: 96
    },
    ownerContainer: {
        flexDirection: 'row',
        paddingVertical: 8
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24
    },
    ownerContent: {
        marginLeft: 8
    },
    ownerName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    ownerCaption: {

    },
    descriptionContainer:{
        marginTop: 8
    },
    extension: {
        marginTop: 8
    },
    join: {

    },
    interested: {

    },
    headerBar: {
        padding: 12
    },
    headerTitle: {
        color: COLOR_WHITE
    },
    extensionContent: {

    }
});
