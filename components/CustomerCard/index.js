import React from "react";
import { Image, View, Text, Button } from "react-native";
import styles from './styles';

function CustomerCard({ name, datebirth, male, noidangkyHoKhau, numberCard, job, numberRoom, ngayDi, daChuyen }) {
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
                <Text style={styles.text}>Họ tên: <Text style={styles.innerText}>{name}</Text></Text>
                <Text style={styles.text}>Năm sinh: <Text style={styles.innerText}>{datebirth}</Text></Text>
                <Text style={styles.text}>Giới tính: <Text style={styles.innerText}>{male ? 'Nam' : 'Nữ'}</Text></Text>
                <View style={styles.multilines}>
                    <Text style={styles.text}>Nơi đăng ký hộ khẩu: </Text>
                    <Text style={styles.innerText}>{noidangkyHoKhau}</Text>
                </View>

                <Text style={styles.text}>Số CCCD: <Text style={styles.innerText}>{numberCard}</Text></Text>
                <Text style={styles.text}>Nghề nghiệp: <Text style={styles.innerText}>{job}</Text></Text>
                <Text style={styles.text}>Nơi tạm trú: <Text style={styles.innerText}>Phòng {numberRoom}</Text></Text>
                <Text style={styles.text}>Đã chuyển: <Text style={styles.innerText}>{daChuyen ? 'Đã chuyển' : 'Chưa'}</Text></Text>
                <Text style={styles.text}>Ngày đi: <Text style={styles.innerText}>{ngayDi !== null ? ngayDi : 'Đang ở'}</Text></Text>
            </View>
        </View>
    );
}

export default CustomerCard;