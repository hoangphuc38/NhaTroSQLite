import React, { useState } from "react";
import { FlatList, View, Text } from "react-native";
import styles from "./styles";
import CustomerCard from "../../../components/CustomerCard";
import { SearchBar } from "react-native-elements";

function CustomerInfoScreen() {
    const userList = [
        {
            id: '1',
            name: "Nguyễn Văn A",
            dateBirth: "1990",
            male: true,
            noidangkyHoKhau: "Thông Bình - Tân Hồng - Đồng Tháp",
            numberCard: "012345678",
            job: "Công nhân",
            numberRoom: "1",
            ngayDi: null,
            daChuyen: false,
        },
        {
            id: '2',
            name: "Nguyễn Văn A",
            dateBirth: "1990",
            male: true,
            noidangkyHoKhau: "Hà Tĩnh",
            numberCard: "012345678",
            job: "Công nhân",
            numberRoom: "1",
            ngayDi: "10/10/2023",
            daChuyen: true,
        },

    ]

    const [searchValue, setSearchValue] = useState('');

    return (
        <View style={styles.container}>
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
                            name={item.name}
                            datebirth={item.dateBirth}
                            male={item.male}
                            noidangkyHoKhau={item.noidangkyHoKhau}
                            numberCard={item.numberCard}
                            job={item.job}
                            numberRoom={item.numberRoom}
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