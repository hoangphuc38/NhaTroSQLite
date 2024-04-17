import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper"

const SignupScreen = props => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isPressed, setIsPressed] = useState(false);
    const { navigation } = props;

    const HandleSignup = () => {
        navigation.navigate("Đăng nhập");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.loginText}>Đăng ký ngay</Text>

            <View style={styles.loginWrapper}>
                <View style={styles.inputWrapper}>
                    <TextInput placeholder="Tên người dùng"
                        placeholderTextColor="gray"
                        value={name}
                        onChangeText={name => setName(name)}
                        mode="outlined"
                        outlineStyle={{ borderWidth: 0.5 }}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <TextInput placeholder="Tên đăng nhập"
                        placeholderTextColor="gray"
                        value={userName}
                        onChangeText={userName => setUserName(userName)}
                        mode="outlined"
                        outlineStyle={{ borderWidth: 0.5 }}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <TextInput placeholder="Mật khẩu"
                        placeholderTextColor="gray"
                        value={password}
                        onChangeText={password => setPassword(password)}
                        mode="outlined"
                        outlineStyle={{ borderWidth: 0.5 }}
                        secureTextEntry
                        right={<TextInput.Icon icon="eye" />}
                    />
                </View>
            </View>

            <Button mode="contained"
                loading={isPressed}
                buttonColor="#0E46A3"
                style={styles.loginBtn}
                onPress={HandleSignup}>
                Đăng ký
            </Button>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center"
    },

    loginText: {
        fontSize: 35,
        fontWeight: "bold"
    },

    loginWrapper: {
        marginVertical: 30,
        width: "100%"
    },

    inputWrapper: {
        marginBottom: 10,
    },

    loginBtn: {
        width: "100%",
        paddingVertical: 5,
        borderRadius: 5
    },
})

export default SignupScreen;