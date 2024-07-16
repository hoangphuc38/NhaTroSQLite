import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper"
import { useSQLiteContext } from 'expo-sqlite/next';
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
    const db = useSQLiteContext();

    const HandleSignup = async () => {
        if (userName === '' || password === '' || name === '') {
            alert("Đăng ký không hợp lệ");
            return;
        }

        //Check if username is exist
        try {
            const result = await db.getAllAsync('SELECT * FROM TaiKhoan WHERE username = ?', [userName])
            if (result.length > 0) {
                alert("Tên đăng nhập đã tồn tại");
                return;
            }
        }
        catch (error) {
            console.log("Err: ", error);
            alert("Đã xảy ra lỗi");
        }

        setIsPressed(true);
        try {
            const result = await db.withTransactionAsync(async () => {
                await db.runAsync(
                    'INSERT INTO TaiKhoan (username, password, name) VALUES (?, ?, ?)',
                    [userName, password, name]
                )
            })
            const user = await db.getFirstAsync('SELECT id FROM TaiKhoan WHERE username = ? AND password = ?', [userName, password]);
            const addResult1 = await db.withTransactionAsync(async () => {
                await db.runAsync(
                    'INSERT INTO BangGia (user_id, hangmuc, donvi, gia) VALUES (?, "Điện", "nghìn đồng/kWh", 12)',
                    [user.id]
                )
            })
            const addResult2 = await db.withTransactionAsync(async () => {
                await db.runAsync(
                    'INSERT INTO BangGia (user_id, hangmuc, donvi, gia) VALUES (?, "Nước", "nghìn đồng/khối", 3.5)',
                    [user.id]
                )
            })
            const addResul3 = await db.withTransactionAsync(async () => {
                await db.runAsync(
                    'INSERT INTO BangGia (user_id, hangmuc, donvi, gia) VALUES (?, "Rác", "nghìn đồng/tháng", 10)',
                    [user.id]
                )
            })
            setIsPressed(false);
            alert("Đăng ký thành công");
            navigation.navigate("Đăng nhập");
        }
        catch (error) {
            console.log("Err: ", error);
            setIsPressed(false);
            alert("Đăng ký không thành công");
        }
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