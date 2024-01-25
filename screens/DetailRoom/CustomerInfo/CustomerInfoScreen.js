import React from "react";
import { FlatList, View } from "react-native";
import styles from "./styles";
import CustomerCard from "../../../components/CustomerCard";

function CustomerInfoScreen() {
    const userList = [
        {
            id: '1',
            name: "Nguyễn Văn A",
            dateBirth: "1990",
            male: true,
            noidangkyHoKhau: "Hà Tĩnh",
            numberCard: "012345678",
            job: "Công nhân",
            numberRoom: "1",
            ngayDi: "10/10/2023",
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
            daChuyen: false,
        },
    ]

    return (
        <View style={styles.container}>
            <FlatList
                data={userList}
                renderItem={
                    ({ item }) => <CustomerCard />
                }
                keyExtractor={item => item.id}
            />
        </View>
    );
}

export default CustomerInfoScreen;