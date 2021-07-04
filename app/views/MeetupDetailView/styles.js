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
    actionBar: {
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerTitle: {
        color: COLOR_WHITE
    },
    actionText: {
        color: COLOR_WHITE,
        textDecorationLine: 'underline'
    },
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
    itemAccountImage: {

    },
    itemHeader: {
        marginTop: 4,
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
    rateContainer: {

    },
    rating: {

    }
});
