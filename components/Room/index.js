import React from "react";
import styles from "./styles";
import { View, Text, TouchableOpacity } from "react-native"

function Room({ numberRoom, onPress }) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.numberRoom}>{numberRoom}</Text>
        </TouchableOpacity>
    )
}

export default Room;