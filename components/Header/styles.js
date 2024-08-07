import { StyleSheet } from "react-native"

export default styles = StyleSheet.create({
    taskbar: {
        width: "100%",
        padding: 8,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#0B60B0",
    },

    taskbarnoicon: {
        width: "100%",
        padding: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0B60B0",
    },

    text: {
        fontSize: 23,
        color: "white"
    },

    textnoicon: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        paddingLeft: -20
    },

    button: {
        backgroundColor: "white",
        padding: 2,
        borderRadius: 5,
    },
})