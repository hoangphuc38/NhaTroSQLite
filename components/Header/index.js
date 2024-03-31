import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";

function Header({ title, navigation, iconButton, onPressButton }) {
    const openMenu = () => {
        navigation.openDrawer();
    }
    return (
        <SafeAreaView >
            <View style={styles.taskbar}>
                <TouchableOpacity onPress={openMenu}>
                    <FontAwesomeIcon icon={faBars} size={20} />
                </TouchableOpacity>

                <Text style={styles.text}>{title}</Text>
                <TouchableOpacity style={styles.button} onPress={onPressButton}>
                    <FontAwesomeIcon icon={iconButton} size={20} />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}

export default Header;