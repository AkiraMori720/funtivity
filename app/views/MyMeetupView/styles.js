import { StyleSheet } from "react-native";
import {COLOR_BLACK, COLOR_WHITE} from "../../constants/colors";

export default StyleSheet.create({
    container: {
        marginVertical: 20,
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
    review: {

    },
    headerBar: {
        padding: 12
    },
    headerTitle: {
        color: COLOR_WHITE
    },
    extensionContent: {

    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12
    },
    userContent: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    userName: {
        marginLeft: 8
    },
    actionContainer: {
        flexDirection: 'row'
    },
    userAction: {
        marginHorizontal: 4
    },
    action: {
        width: 32,
        height: 32
    },
    itemContainer: {
        flexDirection: 'column',
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    itemContent: {
        flexDirection: 'row'
    },
    itemAccountImage: {
        width: 48,
        height: 48,
        borderRadius: 24
    },
    itemHeader: {
        marginLeft: 8,
        flexDirection: 'column'
    },
    itemImageContainer: {
        marginTop: 4,
        width: '100%',
    },
    itemImage: {
        width: '100%',
        height: 200
    },
    itemTitle: {
        color: COLOR_BLACK
    },
    itemMessage: {
        fontSize: 12,
    },
    rateContainer: {
        flexDirection: 'row'
    },
    rating: {
        marginRight: 12,
    }
});
