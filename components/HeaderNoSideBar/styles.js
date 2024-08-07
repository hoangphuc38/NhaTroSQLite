import { StyleSheet } from "react-native"

export default styles = StyleSheet.create({
    taskbar: {
        width: "100%",
        padding: 10,
        marginBottom: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#0B60B0"
    },

    text: {
        fontSize: 20,
        color: "white"
    },

    button: {
        backgroundColor: "white",
        padding: 2,
        borderRadius: 5,
    },
})