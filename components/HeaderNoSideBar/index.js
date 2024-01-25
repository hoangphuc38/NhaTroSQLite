import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";

function HeaderNoSideBar({ title, navigation }) {
    const goBack = () => {
        navigation.goBack();
    }
    return (
        <SafeAreaView >
            <View style={styles.taskbar}>
                <TouchableOpacity onPress={goBack}>
                    <FontAwesomeIcon icon={faArrowLeft} size={20} />
                </TouchableOpacity>

                <Text style={styles.text}>{title}</Text>

                <FontAwesomeIcon icon={faMagnifyingGlass} size={20} />
            </View>
        </SafeAreaView>
    );
}

export default HeaderNoSideBar;