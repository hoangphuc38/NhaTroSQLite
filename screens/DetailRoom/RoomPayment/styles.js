import { StyleSheet } from "react-native"

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },

    filter: {
        backgroundColor: 'transparent',
        padding: 5,
        flexDirection: "row",
        gap: 5,
        justifyContent: "flex-end",
        marginBottom: 15,
    },

    dropdown: {
        width: 110,
        backgroundColor: "white",
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 5,
    },

    icon: {
        marginRight: 5,
    },

    label: {
        display: "none"
    },

    placeholderStyle: {
        fontSize: 14,
    },

    selectedTextStyle: {
        fontSize: 14,
    },

    inputSearchStyle: {
        height: 40,
        fontSize: 14,
    },

    contentWrapper: {
        paddingHorizontal: 10,
        gap: 10,
    },

    roomNumber: {
        alignSelf: "center",
        fontSize: 18,
        fontWeight: "bold",
        color: "blue"
    },

    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    contentSum: {
        gap: 20,
        marginBottom: 20,
    },

    title: {
        fontWeight: "bold",
        fontSize: 14,
    },

    input: {
        backgroundColor: "white",
        borderRadius: 10,
        width: 100,
        paddingHorizontal: 10,
        paddingVertical: 2,
        fontSize: 14,
    },

    inputSum: {
        backgroundColor: "white",
        borderRadius: 10,
        width: 100,
        paddingHorizontal: 10,
        paddingVertical: 2,
        color: "red",
        fontSize: 14,
    },

    inputFinal: {
        backgroundColor: "white",
        borderRadius: 10,
        width: 200,
        paddingHorizontal: 10,
        paddingVertical: 2,
        fontSize: 14,
        color: "red",
        alignSelf: "center"
    },

    inputNote: {
        backgroundColor: "white",
        borderRadius: 10,
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 2,
        fontSize: 14,
        color: "red",
        alignSelf: "center"
    },

    electricContent: {
        gap: 10,
    },

    kindofContent: {
        flexDirection: "row",
        alignSelf: "flex-start",
        fontSize: 18,
        fontWeight: "bold",
        color: "blue"
    },

    buttons: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "flex-end"
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    modal: {
        width: "95%",
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 10,
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

    modalContent: {
        width: "100%",
    },

    inputModal: {
        backgroundColor: "white",
        borderRadius: 10,
        width: 100,
        paddingHorizontal: 10,
        paddingVertical: 2,
        fontSize: 14,
        borderColor: 'gray',
        borderWidth: 1
    },

    buttonModal: {
        flexDirection: "row",
        marginTop: 15,
        justifyContent: "space-evenly"
    },

    button: {
        borderRadius: 10,
        padding: 5,
        elevation: 2,
        width: "40%",
    },

    buttonClose: {
        backgroundColor: "red",
    },

    buttonSave: {
        backgroundColor: '#2196F3',
    },

    textBtn: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})