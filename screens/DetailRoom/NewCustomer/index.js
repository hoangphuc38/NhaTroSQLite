import React, { useContext, useState } from "react";
import styles from "./styles";
import { View, Text, ScrollView, Pressable } from "react-native";
import { Avatar, RadioButton, TextInput } from "react-native-paper";
import { AppContext } from "../../../contexts/appContext";

function NewCustomer({ navigation }) {
    const { roomID } = useContext(AppContext);

    const [hoTen, setHoTen] = useState("");
    const [namSinh, setNamSinh] = useState("");
    const [isNam, setIsNam] = useState(true);
    const [noiDangKyHoKhau, setNoiDangKyHoKhau] = useState("");
    const [cccd, setCCCD] = useState("");
    const [ngheNghiep, setNgheNghiep] = useState("");

    const HandleUploadImage = () => {
        alert("Hiện tại chưa có tính năng tải ảnh");
    }

    // const HandleAddNew = async () => {
    //     return await customerAPI.newPerson(
    //         avatar,
    //         hoTen,
    //         namSinh,
    //         isNam,
    //         noiDangKyHoKhau,
    //         cccd,
    //         ngheNghiep,
    //         roomID)
    //         .then(() => {
    //             alert("Thêm người ở thành công");
    //             navigation.goBack();
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             alert("Thêm người ở thất bại");
    //         })
    // }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.avatarWrapper}>
                <View style={styles.avatar}>
                    <Avatar.Image size={100}
                        source={require('../../../assets/images/defaultuser.png')}
                    />
                </View>
                <Pressable
                    onPress={HandleUploadImage}
                    style={[styles.button, styles.buttonSave]}>
                    <Text style={styles.textBtn}>Tải ảnh lên</Text>
                </Pressable>

            </View>

            <View style={styles.inputWrapper}>
                <TextInput label="Họ và tên"
                    value={hoTen}
                    onChangeText={hoTen => setHoTen(hoTen)}
                    mode="outlined"
                    activeOutlineColor="red"
                    outlineStyle={{ borderWidth: 0.5 }}
                />
            </View>

            <View style={styles.inputWrapper}>
                <TextInput label="Năm sinh"
                    value={namSinh}
                    onChangeText={namSinh => setNamSinh(namSinh)}
                    mode="outlined"
                    activeOutlineColor="red"
                    outlineStyle={{ borderWidth: 0.5 }}
                />
            </View>

            <View style={styles.inputWrapper}>
                <RadioButton.Group onValueChange={newValue => setIsNam(newValue)}
                    value={isNam}>
                    <View style={styles.radioContainer}>
                        <View style={styles.radiobutton}>
                            <RadioButton value={true} />
                            <Text>Nam</Text>
                        </View>
                        <View style={styles.radiobutton}>
                            <RadioButton value={false} />
                            <Text>Nữ</Text>
                        </View>
                    </View>

                </RadioButton.Group>
            </View>

            <View style={styles.inputWrapper}>
                <TextInput label="Nơi đăng ký hộ khẩu"
                    value={noiDangKyHoKhau}
                    onChangeText={noiDangKyHoKhau => setNoiDangKyHoKhau(noiDangKyHoKhau)}
                    mode="outlined"
                    activeOutlineColor="red"
                    outlineStyle={{ borderWidth: 0.5 }}
                />
            </View>

            <View style={styles.inputWrapper}>
                <TextInput label="Số CCCD"
                    value={cccd}
                    onChangeText={cccd => setCCCD(cccd)}
                    mode="outlined"
                    activeOutlineColor="red"
                    outlineStyle={{ borderWidth: 0.5 }}
                />
            </View>

            <View style={styles.inputWrapper}>
                <TextInput label="Nghề nghiệp"
                    value={ngheNghiep}
                    onChangeText={ngheNghiep => setNgheNghiep(ngheNghiep)}
                    mode="outlined"
                    activeOutlineColor="red"
                    outlineStyle={{ borderWidth: 0.5 }}
                />
            </View>

            <View style={styles.buttons}>
                <Pressable style={[styles.buttonBottom, styles.buttonClose]}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.textBtn}>Hủy</Text>
                </Pressable>

                <Pressable style={[styles.buttonBottom, styles.buttonSave]}
                    onPress={HandleAddNew}
                >
                    <Text style={styles.textBtn}>Lưu</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

export default NewCustomer;