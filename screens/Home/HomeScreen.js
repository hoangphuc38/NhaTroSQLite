import React from "react";
import { View, Text, FlatList } from "react-native"
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Room from "../../components/Room";


function HomeScreen() {
    const RoomData = [
        {
            id: '1',
            roomNumber: '1',
            isEmpty: true,
        },
        {
            id: '2',
            roomNumber: '2',
            isEmpty: false,
        },
        {
            id: '3',
            roomNumber: '3',
            isEmpty: false,
        },
        {
            id: '4',
            roomNumber: '4',
            isEmpty: true,
        },
        {
            id: '5',
            roomNumber: '5',
            isEmpty: false,
        },
        {
            id: '6',
            roomNumber: '6',
            isEmpty: false,
        },
        {
            id: '7',
            roomNumber: '7',
            isEmpty: false,
        },
        {
            id: '8',
            roomNumber: '8',
            isEmpty: true,
        },
    ]

    return (
        <SafeAreaView>
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
                    renderItem={({ item }) => <Room numberRoom={item.roomNumber} isEmpty={item.isEmpty} />}
                    keyExtractor={item => item.id}
                />

            </View>
        </SafeAreaView>
    );
}

export default HomeScreen;