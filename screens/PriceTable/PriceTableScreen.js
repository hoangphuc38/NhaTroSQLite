import React, { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

function PriceTableScreen() {
    const data = [
        { id: '1', content: "Phòng ki-ốt", price: "900", unit: "nghìn đồng/tháng" },
        { id: '2', content: "Phòng trọ", price: "800", unit: "nghìn đồng/tháng" },
        { id: '3', content: "Điện", price: "3.5", unit: "nghìn đồng/kWh" },
        { id: '4', content: "Nước", price: "12", unit: "nghìn đồng/khối" },
        { id: '5', content: "Rác", price: "10", unit: "nghìn đồng/tháng" },
    ]

    const [modalVisible, setModalVisible] = useState(false);
    const [roomKiotPrice, setRoomKiotPrice] = useState('900');
    const [roomOrdinaryPrice, setRoomOrdinaryPrice] = useState('800');
    const [electricPrice, setElectricPrice] = useState('3.5');
    const [waterPrice, setWaterPrice] = useState('12');
    const [rubbishPrice, setRubbishPrice] = useState('10');

    const renderItem = (item) => {
        return (
            <View style={styles.row}>
                <Text style={styles.cell}>{item.content}</Text>
                <Text style={styles.cell}>{item.price}</Text>
                <Text style={styles.cell}>{item.unit}</Text>
            </View>
        )

    }

    return (
        <View style={styles.container}>
            <View style={styles.containerWrapper}>
                <View style={styles.headerTopBar}>
                    <Text style={styles.headerTopBarText}>Bảng giá</Text>
                </View>

                <View style={styles.header}>
                    <Text style={styles.heading}>Hạng mục</Text>
                    <Text style={styles.heading}>Giá</Text>
                    <Text style={styles.heading}>Đơn vị</Text>
                </View>

                <FlatList
                    data={data}
                    keyExtractor={(item) => { item.id }}
                    renderItem={({ item }) => renderItem(item)}
                />
            </View>

            <Pressable
                style={[styles.button, styles.buttonUpdate]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textBtn}>Cập nhật</Text>
            </Pressable>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <View style={styles.modalContent}>
                            <View style={styles.electricContent}>
                                <View style={styles.content}>
                                    <Text style={styles.title}>Giá ph kiốt (nghìn đồng/tháng):</Text>
                                    <TextInput style={styles.inputModal}
                                        inputMode="numeric"
                                        value={roomKiotPrice} />
                                </View>

                                <View style={styles.content}>
                                    <Text style={styles.title}>Giá ph trọ (nghìn đồng/tháng):</Text>
                                    <TextInput style={styles.inputModal}
                                        inputMode="numeric"
                                        value={roomOrdinaryPrice} />
                                </View>

                                <View style={styles.content}>
                                    <Text style={styles.title}>Giá điện (nghìn đồng/kWh):</Text>
                                    <TextInput style={styles.inputModal}
                                        inputMode="numeric"
                                        value={electricPrice} />
                                </View>

                                <View style={styles.content}>
                                    <Text style={styles.title}>Giá nước (nghìn đồng/khối):</Text>
                                    <TextInput style={styles.inputModal}
                                        inputMode="numeric"
                                        value={waterPrice} />
                                </View>

                                <View style={styles.content}>
                                    <Text style={styles.title}>Giá rác (nghìn đồng/tháng):</Text>
                                    <TextInput style={styles.inputModal}
                                        inputMode="numeric"
                                        value={rubbishPrice} />
                                </View>

                            </View>

                            <View style={styles.buttonModal}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textBtn}>Thoát</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.button, styles.buttonSave]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textBtn}>Lưu</Text>
                                </Pressable>
                            </View>

                        </View>
                    </View>
                </View>

            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },

    containerWrapper: {
        backgroundColor: "white",
        marginVertical: 15,
        paddingVertical: 20,
        paddingHorizontal: 20,
    },

    headerTopBar: {
        backgroundColor: "#6AB7E2",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 5,
        elevation: 2,
        marginBottom: 15,
    },

    headerTopBarText: {
        fontWeight: "bold",
        alignSelf: "center",
        color: "white",
        fontSize: 16,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },

    heading: {
        flex: 1,
        fontSize: 14,
        fontWeight: "bold"
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 8,
        marginHorizontal: 2,
        elevation: 1,
        borderRadius: 3,
        borderColor: '#fff',
        padding: 10,
        backgroundColor: "#fff",
    },

    cell: {
        fontSize: 14,
        textAlign: 'left',
        flex: 1,
    },

    button: {
        borderRadius: 10,
        padding: 5,
        elevation: 2,
        width: 120,
        alignSelf: "flex-end",
    },

    buttonClose: {
        backgroundColor: "red",
    },

    buttonSave: {
        backgroundColor: '#2196F3',
    },

    buttonUpdate: {
        backgroundColor: "red",
    },

    textBtn: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
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

    electricContent: {
        gap: 10,
        marginTop: 15,
    },

    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    title: {
        fontWeight: "bold",
        fontSize: 14,
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
})

export default PriceTableScreen;