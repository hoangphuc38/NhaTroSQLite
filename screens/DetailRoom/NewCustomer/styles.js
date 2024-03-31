import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        paddingLeft: 10,
        paddingRight: 10,
    },

    avatarWrapper: {
        marginTop: 10,
        alignItems: "center",
        marginBottom: 15
    },

    avatar: {
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        marginBottom: 10
    },

    button: {
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
        elevation: 2,
        alignSelf: "center",
    },

    buttonSave: {
        backgroundColor: '#2196F3',
    },

    textBtn: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    inputWrapper: {
        marginBottom: 10,
    },

    radioContainer: {
        flexDirection: "row",
        gap: 40,
    },

    radiobutton: {
        flexDirection: "row",
        alignItems: "center"
    },

})