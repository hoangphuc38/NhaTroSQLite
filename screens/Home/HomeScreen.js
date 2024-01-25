import React, { useState } from "react";
import { View, Text, FlatList, Modal, Pressable, TouchableHighlight, TouchableOpacity } from "react-native"
import styles from "./styles";
import { StatusBar } from "expo-status-bar";
import Room from "../../components/Room";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";


function HomeScreen({ navigation }) {
    const RoomData = [
        {
            id: '1',
            roomNumber: '1',
            isEmpty: true,
            roomType: 'Ki ốt',
        },
        {
            id: '2',
            roomNumber: '2',
            isEmpty: false,
            roomType: 'Ki ốt',
        },
        {
            id: '3',
            roomNumber: '3',
            isEmpty: false,
            roomType: 'Phòng trọ',
        },
        {
            id: '4',
            roomNumber: '4',
            isEmpty: true,
            roomType: 'Phòng trọ',
        },
        {
            id: '5',
            roomNumber: '5',
            isEmpty: false,
            roomType: 'Phòng trọ',
        },
        {
            id: '6',
            roomNumber: '6',
            isEmpty: false,
            roomType: 'Phòng trọ',
        },
        {
            id: '7',
            roomNumber: '7',
            isEmpty: false,
            roomType: 'Phòng trọ',
        },
        {
            id: '8',
            roomNumber: '8',
            isEmpty: true,
            roomType: 'Phòng trọ',
        },
    ]

    const [modalVisible, setModalVisible] = useState(false);
    const [roomType, setRoomType] = useState("");
    const [roomNumber, setRoomNumber] = useState("");

    const ShowRoomInfo = (item) => {
        setModalVisible(true);
        setRoomType(item.roomType);
        setRoomNumber(item.roomNumber);
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

            <FlatList
                style={styles.list}
                columnWrapperStyle={{ justifyContent: 'center' }}
                horizontal={false}
                numColumns={2}
                data={RoomData}
                renderItem={
                    ({ item }) => <Room numberRoom={item.roomNumber}
                        isEmpty={item.isEmpty}
                        onPress={() => ShowRoomInfo(item)} />
                }
                keyExtractor={item => item.id}
            />

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
                                <Text style={styles.modalText}>{roomType}</Text>
                            </View>

                            <View style={styles.content}>
                                <TouchableOpacity style={styles.contentWrapper}
                                    onPress={() => {
                                        navigation.navigate('Chi tiết')
                                        setModalVisible(false)
                                    }}
                                >
                                    <Text style={styles.textContent}>Thông tin người ở</Text>
                                    <FontAwesomeIcon icon={faChevronRight} size={18} />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.contentWrapper}
                                    onPress={() => {
                                        navigation.navigate('Thanh toán')
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