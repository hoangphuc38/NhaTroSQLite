import React from "react";
import styles from "./styles";
import { View, Text, TouchableOpacity } from "react-native"

function Room({ numberRoom, isEmpty, onPress }) {
    return (
        <TouchableOpacity style={isEmpty ? styles.Emptycontainer : styles.container} onPress={onPress}>
            <Text style={styles.numberRoom}>{numberRoom}</Text>
        </TouchableOpacity>
    )
}

export default Room;