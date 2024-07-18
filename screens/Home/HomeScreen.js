import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, Modal, Pressable, TouchableOpacity, TextInput } from "react-native"
import styles from "./styles";
import { StatusBar } from "expo-status-bar";
import Room from "../../components/Room";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { RadioButton } from "react-native-paper";
import { AppContext } from "../../contexts/appContext";
import DialogBox from "../../components/DialogBox";
import { ActivityIndicator } from "react-native";
import { useSQLiteContext } from "expo-sqlite";

function HomeScreen({ navigation }) {
    const { userInfo, openAddRoom, setOpenAddRoom, setRoomID } = useContext(AppContext);
    const db = useSQLiteContext();

    useEffect(() => {
        db.withTransactionAsync(async () => {
            getData();
        });
    }, [db])

    const getData = async () => {
        try {
            const result = await db.getAllAsync(
                'SELECT * FROM Phong WHERE user_id = ? ORDER BY CAST(tenphong as decimal) ASC',
                [userInfo.id]
            );
            setRoomData(result);
            setLoading(false);
        }
        catch (error) {
            console.log("Err: ", error);
            setLoading(false);
        }
    }

    const [loading, setLoading] = useState(true);
    const [RoomData, setRoomData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalInfoRoom, setModalInfoRoom] = useState(false);
    const [roomType, setRoomType] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [roomId, setRoomId] = useState("");

    const [newType, setNewType] = useState(1);
    const [newName, setNewName] = useState("");
    const [newPrice, setNewPrice] = useState("");

    const [roomNameUpdate, setRoomNameUpdate] = useState("");
    const [roomTypeUpdate, setRoomTypeUpdate] = useState(1);
    const [roomPriceUpdate, setRoomPriceUpdate] = useState("");


    const ShowRoomInfo = (item) => {
        setModalVisible(true);
        setRoomType(item.loaiphong);
        setRoomNumber(item.tenphong);
        setRoomId(item.id);
        setRoomID(item.id);

        setRoomNameUpdate(item.tenphong);
        setRoomTypeUpdate(item.loaiphong);
        setRoomPriceUpdate(item.giaphong.toString());
    }

    const HandleNewRoom = async () => {
        try {
            const result = await db.withTransactionAsync(async () => {
                await db.runAsync(
                    'INSERT INTO Phong (user_id, tenphong, loaiphong, giaphong) VALUES (?, ?, ?, ?)',
                    [userInfo.id, newName, newType, newPrice]
                )
                getData();
            })
            setRoomType("1");
            setNewName("");
            setNewPrice("");
            setOpenAddRoom(false);
            alert("Thêm phòng thành công");
            setLoading(true);
        }
        catch (error) {
            console.log(error);
            setLoading(false);
            alert("Thêm phòng thất bại");
        }
    }

    const HandleUpdateRoom = async () => {
        try {
            const result = await db.withTransactionAsync(async () => {
                await db.runAsync(
                    'UPDATE Phong SET tenphong = ?, loaiphong = ?, giaphong = ? WHERE id = ?',
                    [roomNameUpdate, roomTypeUpdate, parseFloat(roomPriceUpdate), roomId]
                )
                getData();
            })
            setRoomNameUpdate("");
            setRoomTypeUpdate(1);
            setRoomPriceUpdate("");
            setModalInfoRoom(false);
            alert("Cập nhật thành công");
            setLoading(true);
        }
        catch (error) {
            console.log(error);
            setLoading(false);
            alert("Cập nhật thất bại");
        }
    }

    const OpenDeleteForm = () => {
        setModalVisible(false);
        setModalDelete(true);
    }

    const OpenInfoRoom = () => {
        setModalVisible(false);
        setModalInfoRoom(true);
    }

    const HandleDeleteRoom = async (id) => {
        try {
            const result = await db.withTransactionAsync(async () => {
                await db.runAsync(
                    'DELETE FROM Phong WHERE id = ?',
                    [id]
                )
                getData();
            })
            alert("Xóa phòng thành công");
            setModalDelete(false);
            setLoading(true);
        }
        catch (error) {
            console.log(error);
            setLoading(false);
            setModalDelete(false);
            alert("Xóa phòng thất bại");
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* <View style={styles.notation}>
                <View style={styles.empty}>
                    <View style={styles.symbol}></View>
                    <Text style={styles.note}>Phòng trống</Text>
                </View>

                <View style={styles.empty}>
                    <View style={styles.symbolfull}></View>
                    <Text style={styles.note}>Phòng đã thuê</Text>
                </View>
            </View> */}

            <Modal
                animationType="fade"
                transparent={true}
                visible={openAddRoom}
                onRequestClose={() => setOpenAddRoom(!openAddRoom)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalAddRoom}>
                        <View style={styles.modalContent}>
                            <View style={styles.titleModal}>
                                <Text style={styles.modalText}>Thêm phòng mới</Text>
                            </View>

                            <View style={styles.inputWrapper}>
                                <Text style={styles.titleInput}>Tên/Số phòng:</Text>
                                <TextInput style={styles.contentInput}
                                    onChangeText={(e) => setNewName(e)}
                                    value={newName} />
                            </View>

                            <View style={styles.inputWrapper}>
                                <Text style={styles.titleInput}>Loại phòng:</Text>
                                <RadioButton.Group
                                    onValueChange={newValue => setNewType(newValue)}
                                    value={newType}>
                                    <View style={styles.radioContainer}>
                                        <View style={styles.radiobutton}>
                                            <RadioButton value={1} />
                                            <Text>Phòng trọ</Text>

                                        </View>
                                        <View style={styles.radiobutton}>
                                            <RadioButton value={2} />
                                            <Text>Ki-ốt</Text>
                                        </View>
                                    </View>
                                </RadioButton.Group>

                            </View>

                            <View style={styles.inputWrapper}>
                                <Text style={styles.titleInput}>Giá phòng (nghìn đồng):</Text>
                                <TextInput style={styles.contentInput}
                                    inputMode="numeric"
                                    onChangeText={(e) => setNewPrice(e)}
                                    value={newPrice} />
                            </View>

                            <View style={styles.buttons}>
                                <Pressable
                                    style={[styles.buttonAdd, styles.buttonClose]}
                                    onPress={() => setOpenAddRoom(!openAddRoom)}>
                                    <Text style={styles.textBtn}>Thoát</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.buttonAdd, styles.buttonSubmit]}
                                    onPress={HandleNewRoom}>
                                    <Text style={styles.textBtn}>Thêm</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalInfoRoom}
                onRequestClose={() => setModalInfoRoom(!modalInfoRoom)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalAddRoom}>
                        <View style={styles.modalContent}>
                            <View style={styles.titleModal}>
                                <Text style={styles.modalText}>Thông tin phòng</Text>
                            </View>

                            <View style={styles.inputWrapper}>
                                <Text style={styles.titleInput}>Tên/Số phòng:</Text>
                                <TextInput style={styles.contentInput}
                                    onChangeText={(e) => setRoomNameUpdate(e)}
                                    value={roomNameUpdate} />
                            </View>

                            <View style={styles.inputWrapper}>
                                <Text style={styles.titleInput}>Loại phòng:</Text>
                                <RadioButton.Group
                                    onValueChange={newValue => setRoomTypeUpdate(newValue)}
                                    value={roomTypeUpdate}>
                                    <View style={styles.radioContainer}>
                                        <View style={styles.radiobutton}>
                                            <RadioButton value={1} />
                                            <Text>Phòng trọ</Text>

                                        </View>
                                        <View style={styles.radiobutton}>
                                            <RadioButton value={2} />
                                            <Text>Ki-ốt</Text>
                                        </View>
                                    </View>
                                </RadioButton.Group>

                            </View>

                            <View style={styles.inputWrapper}>
                                <Text style={styles.titleInput}>Giá phòng (nghìn đồng):</Text>
                                <TextInput style={styles.contentInput}
                                    inputMode="numeric"
                                    onChangeText={(e) => setRoomPriceUpdate(e)}
                                    value={roomPriceUpdate} />
                            </View>

                            <View style={styles.buttons}>
                                <Pressable
                                    style={[styles.buttonAdd, styles.buttonClose]}
                                    onPress={() => setModalInfoRoom(!modalInfoRoom)}>
                                    <Text style={styles.textBtn}>Thoát</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.buttonAdd, styles.buttonSubmit]}
                                    onPress={HandleUpdateRoom}>
                                    <Text style={styles.textBtn}>Cập nhật</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            {
                loading ? <ActivityIndicator style={{ justifyContent: "center" }} color={"red"} size={"small"} />
                    :
                    <FlatList
                        style={styles.list}
                        columnWrapperStyle={{ justifyContent: 'center' }}
                        horizontal={false}
                        numColumns={2}
                        data={RoomData}
                        renderItem={
                            ({ item }) => <Room numberRoom={item.tenphong}
                                onPress={() => ShowRoomInfo(item)} />
                        }
                        keyExtractor={item => item.id}
                    />
            }

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <View style={styles.modalContent}>
                            <View style={styles.titleModal}>
                                <Text style={styles.modalText}>Phòng số {roomNumber} - </Text>
                                <Text style={styles.modalText}>{roomType === 1 ? 'Phòng trọ' : 'Ki-ốt'}</Text>
                            </View>

                            <View style={styles.content}>
                                <TouchableOpacity style={styles.contentWrapper}
                                    onPress={OpenInfoRoom}
                                >
                                    <Text style={styles.textContent}>Thông tin phòng</Text>
                                    <FontAwesomeIcon icon={faChevronRight} size={18} />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.contentWrapper}
                                    onPress={() => {
                                        navigation.navigate('Thanh toán', {
                                            room: roomNumber,
                                            roomId: roomId,
                                        })
                                        setModalVisible(false)
                                    }}
                                >
                                    <Text style={styles.textContent}>Thanh toán tiền phòng</Text>
                                    <FontAwesomeIcon icon={faChevronRight} size={18} />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.contentWrapper}
                                    onPress={OpenDeleteForm}
                                >
                                    <Text style={styles.textContent}>Xóa phòng</Text>
                                    <FontAwesomeIcon icon={faChevronRight} size={18} />
                                </TouchableOpacity>
                            </View>


                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textBtn}>Thoát</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

            </Modal>

            <DialogBox
                visible={modalDelete}
                onRequestClose={() => setModalDelete(!modalDelete)}
                onClickNo={() => setModalDelete(false)}
                onClickYes={() => HandleDeleteRoom(roomId)}
                textDialog={"Bạn có chắc chắn muốn xóa phòng " + roomNumber + " ?"}
            />

        </View>
    );
}

export default HomeScreen;