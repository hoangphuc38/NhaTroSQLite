import { StyleSheet } from "react-native"

export default styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        paddingLeft: 10,
        paddingRight: 10,
    },

    notation: {
        width: "100%",
        flexDirection: "row",
        marginBottom: 10,
        justifyContent: "space-around",
    },

    empty: {
        flexDirection: "row",
        gap: 10,
    },

    symbol: {
        backgroundColor: "green",
        width: 20,
        height: 20,
        borderRadius: 5,
    },

    symbolfull: {
        backgroundColor: "#0B60B0",
        width: 20,
        height: 20,
        borderRadius: 5,
    },

    note: {
        fontSize: 15,
        fontWeight: "700",
    },

    list: {
        width: "100%",
        marginTop: 10,
        flex: 1,
    }

})