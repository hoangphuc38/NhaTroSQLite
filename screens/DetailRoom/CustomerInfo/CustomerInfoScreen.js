import React, { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import styles from "./styles";
import CustomerCard from "../../../components/CustomerCard";
import { SearchBar } from '@rneui/themed/dist/SearchBar';
import customerAPI from "../../../api/customerAPI";

function CustomerInfoScreen({ route }) {

    const { room, roomId } = route.params;

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const response = await customerAPI.getPeopleInRoom(roomId);
                console.log("so phong: ", room);
                console.log("Success: ", response);
                setUserList(response);
            }
            catch (error) {
                console.log("Xảy ra lỗi: ", error);
                console.log("id: ", roomId)
            }
        }

        fetchAPI();

    }, [route])

    const [searchValue, setSearchValue] = useState('');
    const [userList, setUserList] = useState([]);

    return (
        <View style={styles.container}>
            <View style={styles.roomTitle}>
                <Text style={styles.roomText}>Phòng {room}</Text>
            </View>

            <View style={styles.searchbar}>
                <SearchBar
                    placeholder="Tìm kiếm người ở"
                    onChangeText={(e) => setSearchValue(e)}
                    value={searchValue}
                    lightTheme={true}
                    containerStyle={styles.containerSearchBar}
                    inputContainerStyle={styles.inputContainer}
                    inputStyle={styles.inputText}
                />
            </View>

            <View style={styles.listcontainer}>
                <FlatList
                    data={userList}
                    renderItem={
                        ({ item }) => <CustomerCard
                            name={item.hoTen}
                            datebirth={item.namSinh}
                            male={item.isNam}
                            noidangkyHoKhau={item.noiDangKyHoKhau}
                            numberCard={item.cccd}
                            job={item.ngheNghiep}
                            numberRoom={room}
                            daChuyen={item.daChuyen}
                            ngayDi={item.ngayDi}
                        />
                    }
                    keyExtractor={item => item.id}
                />
            </View>

        </View>
    );
}

export default CustomerInfoScreen;