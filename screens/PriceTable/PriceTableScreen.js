import React, { useState, useEffect, useContext } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AppContext } from "../../contexts/appContext";
import { useSQLiteContext } from "expo-sqlite";
import { RadioButton } from "react-native-paper";

function PriceTableScreen() {
    const { userInfo } = useContext(AppContext);
    const db = useSQLiteContext();

    useEffect(() => {
        db.withTransactionAsync(async () => {
            getData();
        });
    }, [db])

    const getData = async () => {
        try {
            const result = await db.getAllAsync('SELECT * FROM BangGia WHERE user_id = ?', [userInfo.id]);
            console.log("Success: ", result);
            setData(result);
            setLoading(false);
        }
        catch (error) {
            console.log("Err: ", error);
            setLoading(false);
        }
    }

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [electricPrice, setElectricPrice] = useState('');
    const [waterPrice, setWaterPrice] = useState('');
    const [rubbishPrice, setRubbishPrice] = useState('');
    const [typeUpdate, setTypeUpdate] = useState("Điện");

    const HandleUpdatePrice = async () => {
        let gia = "";
        switch (typeUpdate) {
            case "Điện":
                gia = electricPrice;
                break;
            case "Nước":
                gia = waterPrice;
                break;
            case "Rác":
                gia = rubbishPrice;
                break;
        }
        try {
            const result = await db.withTransactionAsync(async () => {
                await db.runAsync(
                    'UPDATE BangGia SET gia = ? WHERE user_id = ? AND hangmuc = ?',
                    [parseFloat(gia), userInfo.id, typeUpdate]
                )
                getData();
            })
            setElectricPrice("");
            setWaterPrice("");
            setRubbishPrice("");
            setTypeUpdate("Điện")
            setModalVisible(false);
            alert("Cập nhật bảng giá thành công");
            setLoading(true);
        }
        catch (error) {
            console.log(error);
            setLoading(false);
            alert("Cập nhật bảng giá thất bại");
        }
    }

    const renderItem = (item) => {
        return (
            <View style={styles.row}>
                <Text style={styles.cell}>{item.hangmuc}</Text>
                <Text style={styles.cell}>{item.gia}</Text>
                <Text style={styles.cell}>{item.donvi}</Text>
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
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => renderItem(item)}
                />

            </View>

            <View style={{ flexDirection: "row-reverse", gap: 10 }}>
                <Pressable
                    style={[styles.button, styles.buttonUpdate]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textBtn}>Cập nhật</Text>
                </Pressable>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <View style={styles.modalContent}>
                            <Text style={{ marginLeft: 5, fontStyle: "italic" }}>Chọn hạng mục cần cập nhật</Text>
                            <View style={styles.electricContent}>
                                <RadioButton.Group
                                    onValueChange={value => setTypeUpdate(value)}
                                    value={typeUpdate}
                                >
                                    <View style={{ gap: 10 }}>
                                        <View style={styles.content}>
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <RadioButton value="Điện" />
                                                <Text style={styles.title}>Giá điện (nghìn đồng/kWh):</Text>
                                            </View>
                                            <TextInput style={styles.inputModal}
                                                inputMode="numeric"
                                                onChangeText={(e) => setElectricPrice(e)}
                                                value={electricPrice} />
                                        </View>

                                        <View style={styles.content}>
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <RadioButton value="Nước" />
                                                <Text style={styles.title}>Giá nước (nghìn đồng/khối):</Text>
                                            </View>
                                            <TextInput style={styles.inputModal}
                                                inputMode="numeric"
                                                onChangeText={(e) => setWaterPrice(e)}
                                                value={waterPrice} />
                                        </View>

                                        <View style={styles.content}>
                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                <RadioButton value="Rác" />
                                                <Text style={styles.title}>Giá rác (nghìn đồng/tháng):</Text>
                                            </View>
                                            <TextInput style={styles.inputModal}
                                                inputMode="numeric"
                                                onChangeText={(e) => setRubbishPrice(e)}
                                                value={rubbishPrice} />
                                        </View>
                                    </View>
                                </RadioButton.Group>
                            </View>

                            <View style={styles.buttonModal}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textBtn}>Thoát</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.button, styles.buttonSave]}
                                    onPress={() => HandleUpdatePrice()}>
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
        paddingHorizontal: 10,
        paddingVertical: 10
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

    inputAddModal: {
        backgroundColor: "white",
        borderRadius: 10,
        width: "100%",
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