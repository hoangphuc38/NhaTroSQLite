import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper"
import authAPI from "../../api/authAPI";
import { SafeAreaView } from "react-native-safe-area-context";

const SignupScreen = props => {
    const [name, setName] = useState("");
    const [focusName, setFocusName] = useState(false);
    const [userName, setUserName] = useState("");
    const [focusUserName, setFocusUserName] = useState(false);
    const [password, setPassword] = useState("");
    const [focusPassword, setFocusPassword] = useState(false);
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [focusRepeatPassword, setFocusRepeatPassword] = useState(false);

    const [showed1, setShowed1] = useState(true);
    const [showed2, setShowed2] = useState(true);

    const [isPressed, setIsPressed] = useState(false);
    const { navigation } = props;

    const HandleSignup = async () => {
        if (userName === '' || password === '' || name === '') {
            alert("Đăng ký không hợp lệ");
            return;
        }
        return await authAPI.register(userName, password, name)
            .then(() => {
                alert("Đăng ký thành công");
                navigation.navigate("Đăng nhập");
            })
            .catch((error) => {
                console.log(error);
                alert("Đăng ký không thành công");
            })
    }

    const HandleGoBack = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.loginText}>Đăng ký ngay</Text>

            <View style={styles.loginWrapper}>
                <View style={styles.inputWrapper}>
                    <TextInput placeholder="Tên người dùng"
                        placeholderTextColor="gray"
                        onFocus={() => setFocusName(true)}
                        value={name}
                        onChangeText={name => setName(name)}
                        mode="outlined"
                        outlineStyle={{ borderWidth: 0.5 }}
                    />
                    {
                        name == '' && focusName
                            ? <HelperText type="error" visible={true}>
                                Vui lòng nhập tên người dùng
                            </HelperText>
                            : null
                    }
                </View>

                <View style={styles.inputWrapper}>
                    <TextInput placeholder="Tên đăng nhập"
                        placeholderTextColor="gray"
                        onFocus={() => setFocusUserName(true)}
                        value={userName}
                        onChangeText={userName => setUserName(userName)}
                        mode="outlined"
                        outlineStyle={{ borderWidth: 0.5 }}
                    />
                    {
                        userName == '' && focusUserName
                            ? <HelperText type="error" visible={true}>
                                Vui lòng nhập tên đăng nhập
                            </HelperText>
                            : null
                    }
                </View>

                <View style={styles.inputWrapper}>
                    <TextInput placeholder="Mật khẩu"
                        placeholderTextColor="gray"
                        value={password}
                        onChangeText={password => setPassword(password)}
                        onFocus={() => setFocusPassword(true)}
                        mode="outlined"
                        outlineStyle={{ borderWidth: 0.5 }}
                        secureTextEntry={showed1}
                        right={<TextInput.Icon icon="eye"
                            onPress={() => {
                                setShowed1(!showed1);
                            }}
                        />}
                    />
                    {
                        password == '' && focusPassword
                            ? <HelperText type="error" visible={true}>
                                Vui lòng nhập mật khẩu
                            </HelperText>
                            : null
                    }
                </View>

                <View style={styles.inputWrapper}>
                    <TextInput placeholder="Lặp lại mật khẩu"
                        placeholderTextColor="gray"
                        value={repeatedPassword}
                        onChangeText={password => setRepeatedPassword(password)}
                        onFocus={() => setFocusRepeatPassword(true)}
                        mode="outlined"
                        outlineStyle={{ borderWidth: 0.5 }}
                        secureTextEntry={showed2}
                        right={<TextInput.Icon icon="eye"
                            onPress={() => {
                                setShowed2(!showed2);
                            }}
                        />}
                    />
                    {
                        repeatedPassword !== password && focusRepeatPassword
                            ? <HelperText type="error" visible={true}>
                                Mật khẩu lặp lại không khớp
                            </HelperText>
                            : null
                    }
                </View>
            </View>

            <Button mode="contained"
                loading={isPressed}
                buttonColor="#0E46A3"
                style={styles.loginBtn}
                onPress={HandleSignup}>
                Đăng ký
            </Button>

            <View style={styles.signupContainer}>
                <Text>Đã có tài khoản?</Text>
                <Text style={styles.signupText} onPress={HandleGoBack}>Đăng nhập</Text>
            </View>

        </SafeAreaView>
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

export default SignupScreen;