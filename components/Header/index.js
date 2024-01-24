import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";

function Header({ title, navigation }) {

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
                <FontAwesomeIcon icon={faMagnifyingGlass} size={20} />
            </View>
        </SafeAreaView>
    );
}

export default Header;