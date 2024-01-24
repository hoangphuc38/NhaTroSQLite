import React from "react";
import styles from "./styles";
import { View, Text } from "react-native"

function Room({ numberRoom, isEmpty }) {
    return (
        <View style={isEmpty ? styles.Emptycontainer : styles.container}>
            <Text style={styles.numberRoom}>{numberRoom}</Text>
        </View>
    )
}

export default Room;