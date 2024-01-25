import { StyleSheet } from "react-native"

export default styles = StyleSheet.create({
    card: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        paddingBottom: 10,
        marginBottom: 15,
        borderBottomColor: "gray",
        borderBottomWidth: 2,
    },

    leftContent: {
        gap: 10,
    },

    rightContent: {
        flex: 1,
    },

    imageWrapper: {
        width: 100,
        height: 100,
    },

    image: {
        width: "100%",
        height: "100%",
        resizeMode: "stretch",
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "gray"
    }
})

