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
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    modal: {
        width: "70%",
        height: "30%",
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    modalContent: {
        width: "100%",
    },

    titleModal: {
        flexDirection: "row",
        alignSelf: "center",
    },

    modalText: {
        marginBottom: 10,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: "bold"
    },

    content: {
        marginBottom: 15,
    },

    contentWrapper: {
        paddingVertical: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 2,
        borderColor: "gray"
    },

    textContent: {
        fontSize: 18,
        textAlign: 'center',
    },

    button: {
        borderRadius: 10,
        padding: 5,
        elevation: 2,
        width: "50%",
        alignSelf: "center"
    },

    buttonClose: {
        backgroundColor: '#B31312',
    },

    buttonSubmit: {
        backgroundColor: '#2196F3'
    },

    textBtn: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15
    },

    modalAddRoom: {
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    buttonAdd: {
        borderRadius: 10,
        padding: 5,
        elevation: 2,
        width: "40%",
        alignSelf: "center"
    },

    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10
    },

    inputWrapper: {
        gap: 5,
        marginBottom: 10,
    },

    titleInput: {
        fontSize: 14,
        textAlign: "left",
        fontWeight: "bold"
    },

    contentInput: {
        backgroundColor: "white",
        borderRadius: 10,
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 2,
        fontSize: 14,
        borderColor: 'gray',
        borderWidth: 1
    },

    radioContainer: {
        flexDirection: "row",
        gap: 40,
    },

    radiobutton: {
        flexDirection: "row",
        alignItems: "center"
    }

})