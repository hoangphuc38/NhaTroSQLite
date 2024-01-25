import React from "react";
import { Image, View, Text, Button } from "react-native";
import styles from './styles';

function CustomerCard() {
    const openGallery = () => {

    }

    return (
        <View style={styles.card}>
            <View style={styles.leftContent}>
                <View style={styles.imageWrapper}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/images/defaultuser.png')}
                    />
                </View>
                <Button
                    title="Tải ảnh"
                    onPress={openGallery}
                />
            </View>

            <View style={styles.rightContent}>
                <Text>Thông tin cá nhân</Text>
            </View>
        </View>
    );
}

export default CustomerCard;