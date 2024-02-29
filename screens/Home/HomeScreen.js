import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Modal, Pressable, TouchableHighlight, TouchableOpacity } from "react-native"
import styles from "./styles";
import { StatusBar } from "expo-status-bar";
import Room from "../../components/Room";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import roomAPI from "../../api/roomAPI";

function HomeScreen({ navigation }) {

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const response = await roomAPI.getAll();
                console.log("Success: ", response);
                setRoomData(response);
                setLoading(false);
            }
            catch (error) {
                console.log("Xảy ra lỗi: ", error);
                setLoading(false);
            }
        }

        fetchAPI();
    }, [])

    const [loading, setLoading] = useState(true);
    const [RoomData, setRoomData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [roomType, setRoomType] = useState("");
    const [roomNumber, setRoomNumber] = useState("");

    const ShowRoomInfo = (item) => {
        setModalVisible(true);
        setRoomType(item.loaiPhong);
        setRoomNumber(item.tenPhong);
        console.log("so phong: ", item.tenPhong);
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
                                            room: roomNumber
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
                                        })
                                        setModalVisible(false)
                                    }}
                                >
                                    <Text style={styles.textContent}>Thanh toán tiền phòng</Text>
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

        </View>
    );
}

export default HomeScreen;