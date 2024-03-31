import React from "react";
import { View, Text, Modal, StyleSheet, Pressable } from "react-native";

function DialogBox({ onRequestClose, onClickYes, onClickNo, textDialog, visible }) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <View style={styles.titleModal}>
                            <Text style={styles.modalText}>{textDialog}</Text>
                        </View>

                        <View style={styles.buttons}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={onClickNo}>
                                <Text style={styles.textBtn}>Thoát</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.button, styles.buttonSubmit]}
                                onPress={onClickYes}>
                                <Text style={styles.textBtn}>OK</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    modal: {
        width: "90%",
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
        marginBottom: 20,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: "bold"
    },


    button: {
        borderRadius: 10,
        padding: 5,
        elevation: 2,
        width: "40%",
        alignSelf: "center"
    },

    textBtn: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10
    },

    buttonClose: {
        backgroundColor: '#B31312',
    },

    buttonSubmit: {
        backgroundColor: '#2196F3'
    },
})

export default DialogBox