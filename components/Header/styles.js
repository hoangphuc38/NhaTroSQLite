import { StyleSheet } from "react-native"

export default styles = StyleSheet.create({
    taskbar: {
        width: "100%",
        padding: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    taskbarnoicon: {
        width: "100%",
        padding: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },

    text: {
        fontSize: 20,
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