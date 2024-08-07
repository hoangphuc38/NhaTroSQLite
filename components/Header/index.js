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
            <View style={iconButton ? styles.taskbar : styles.taskbarnoicon}>
                <TouchableOpacity onPress={openMenu}
                    style={{
                        padding: 4,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "white",
                        borderRadius: 5
                    }}>
                    <FontAwesomeIcon icon={faBars} size={18} color="black" />
                </TouchableOpacity>

                <View style={iconButton ? null : styles.textnoicon}>
                    <Text style={styles.text}>{title}</Text>
                </View>

                {
                    iconButton ?
                        <TouchableOpacity style={styles.button} onPress={onPressButton}>
                            <FontAwesomeIcon icon={iconButton} size={20} />
                        </TouchableOpacity>
                        : null
                }


            </View>
        </SafeAreaView>
    );
}

export default Header;