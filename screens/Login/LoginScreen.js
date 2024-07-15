import React, { useState } from "react";
import { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper"
import { AppContext } from "../../contexts/appContext";
import { useSQLiteContext } from 'expo-sqlite/next';

const LoginScreen = props => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isPressed, setIsPressed] = useState(false);
    const [showed, setShowed] = useState(true);

    const { setUserInfo } = useContext(AppContext);
    const { navigation } = props;

    const db = useSQLiteContext();

    const HandleLogin = async () => {
        setIsPressed(true);
        try {
            const result = await db.getFirstAsync('SELECT * FROM TaiKhoan WHERE username = ? AND password = ?', [userName, password]);
            setUserName("");
            setPassword("");
            if (result !== null) {
                setUserInfo(result);
                setIsPressed(false);
                navigation.navigate("Home");
            }
            else {
                alert("Sai tài khoản hoặc sai mật khẩu");
                setIsPressed(false);
            }

        }
        catch (error) {
            setIsPressed(false);
            alert("Đã xảy ra lỗi khi đăng nhập");
        }
    }

    const HandleSignup = () => {
        navigation.navigate("Đăng ký");
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../../images/circle_logo_with_a_house_and_blue_color.png')}
                style={{ width: 200, height: 200, borderRadius: 30., marginBottom: 10, marginTop: -40 }}
            />
            <Text style={styles.loginText}>NhaTroApp</Text>

            <View style={styles.loginWrapper}>
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
                        secureTextEntry={showed}
                        right={<TextInput.Icon icon="eye"
                            onPress={() => {
                                setShowed(!showed);
                            }
                            } />}
                    />
                </View>
            </View>

            <Button mode="contained"
                loading={isPressed}
                buttonColor="#0E46A3"
                style={styles.loginBtn}
                onPress={HandleLogin}>
                Đăng nhập
            </Button>

            <View style={styles.signupContainer}>
                <Text>Chưa có tài khoản?</Text>
                <Text style={styles.signupText} onPress={HandleSignup}>Đăng ký ngay</Text>
            </View>

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

    signupContainer: {
        flexDirection: "row",
        marginTop: 15,
        gap: 5,
    },

    signupText: {
        fontWeight: "bold"
    }
})

export default LoginScreen;