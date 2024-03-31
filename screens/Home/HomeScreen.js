import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, Modal, Pressable, TouchableOpacity, TextInput } from "react-native"
import styles from "./styles";
import { StatusBar } from "expo-status-bar";
import Room from "../../components/Room";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import roomAPI from "../../api/roomAPI";
import { RadioButton } from "react-native-paper";
import { AppContext } from "../../contexts/appContext";
import DialogBox from "../../components/DialogBox";

function HomeScreen({ navigation }) {

    useEffect(() => {
        fetchAPI();
    }, [])

    const fetchAPI = async () => {
        try {
            const response = await roomAPI.getAll();
            setRoomData(response);
            setLoading(false);
        }
        catch (error) {
            console.log("Xảy ra lỗi: ", error);
            setLoading(false);
        }
    }

    const { openAddRoom, setOpenAddRoom } = useContext(AppContext);

    const [loading, setLoading] = useState(true);
    const [RoomData, setRoomData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [roomType, setRoomType] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [roomId, setRoomId] = useState("");

    const [newType, setNewType] = useState(1);
    const [newName, setNewName] = useState("");
    const [newPrice, setNewPrice] = useState("");

    const ShowRoomInfo = (item) => {
        setModalVisible(true);
        setRoomType(item.loaiPhong);
        setRoomNumber(item.tenPhong);
        setRoomId(item.id);
    }

    const HandleNewRoom = async () => {
        return await roomAPI.createNewRoom(newName, newType, newPrice)
            .then(() => {
                setRoomType("1");
                setNewName("");
                setNewPrice("");
                setOpenAddRoom(false);
                alert("Thêm phòng thành công");
                setLoading(true);
                fetchAPI();
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                alert("Thêm phòng thất bại");
            })
    }

    const OpenDeleteForm = () => {
        setModalVisible(false);
        setModalDelete(true);
    }

    const HandleDeleteRoom = async (id) => {
        return await roomAPI.deleteRoom(id)
            .then(() => {
                alert("Xóa phòng thành công");
                setModalDelete(false);
                setLoading(true);
                fetchAPI();
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                setModalDelete(false);
                alert("Xóa phòng thất bại");
            })
    }

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            <View style={styles.notation}>
                <View style={styles.empty}>
                    <View style={styles.symbol}></View>
                    <Text style={styles.note}>Phòng trống</Text>
                </View>

                <View style={styles.empty}>
                    <View style={styles.symbolfull}></View>
                    <Text style={styles.note}>Phòng đã thuê</Text>
                </View>
            </View>

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

            {
                loading ? <Text>Đang tải</Text>
                    :
                    <FlatList
                        style={styles.list}
                        columnWrapperStyle={{ justifyContent: 'center' }}
                        horizontal={false}
                        numColumns={2}
                        data={RoomData}
                        renderItem={
                            ({ item }) => <Room numberRoom={item.tenPhong}
                                isEmpty={item.danhSachNguoi.length > 0 ? true : false}
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
                                    onPress={() => {
                                        navigation.navigate('Chi tiết', {
                                            room: roomNumber,
                                            roomId: roomId
                                        })
                                        setModalVisible(false)
                                    }}
                                >
                                    <Text style={styles.textContent}>Thông tin người ở</Text>
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