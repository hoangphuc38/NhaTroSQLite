import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";

function HeaderNoSideBar({ title, navigation, iconButton, onPressButton }) {
    const goBack = () => {
        navigation.goBack();
    }
    return (
        <SafeAreaView >
            <View style={styles.taskbar}>
                <TouchableOpacity onPress={goBack}>
                    <FontAwesomeIcon icon={faArrowLeft} size={20} color="white" />
                </TouchableOpacity>

                <Text style={styles.text}>{title}</Text>

                {
                    iconButton !== null
                        ? <TouchableOpacity style={styles.button} onPress={onPressButton}>
                            <FontAwesomeIcon icon={iconButton} size={20} />
                        </TouchableOpacity>
                        :
                        <Text></Text>
                }
            </View>
        </SafeAreaView>
    );
}

export default HeaderNoSideBar;