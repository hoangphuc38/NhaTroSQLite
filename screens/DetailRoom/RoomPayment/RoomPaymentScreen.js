import React, { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import styles from "./styles";
import { Dropdown } from "react-native-element-dropdown";
import { Button } from "@rneui/themed/dist/Button";
import billAPI from "../../../api/billAPI";

function RoomPayment({ route }) {
    const MONTH = [
        { label: 'Tháng 1', value: '1' },
        { label: 'Tháng 2', value: '2' },
        { label: 'Tháng 3', value: '3' },
        { label: 'Tháng 4', value: '4' },
        { label: 'Tháng 5', value: '5' },
        { label: 'Tháng 6', value: '6' },
        { label: 'Tháng 7', value: '7' },
        { label: 'Tháng 8', value: '8' },
        { label: 'Tháng 9', value: '9' },
        { label: 'Tháng 10', value: '10' },
        { label: 'Tháng 11', value: '11' },
        { label: 'Tháng 12', value: '12' },
    ];

    const YEAR = [
        { label: '2024', value: '2024' },
        { label: '2025', value: '2025' },
        { label: '2026', value: '2026' },
        { label: '2027', value: '2027' },
        { label: '2028', value: '2028' },
        { label: '2029', value: '2029' },
    ];

    const { room } = route.params;

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                let month = new Date();
                let year = new Date();
                const response = await billAPI.getHoaDonPhong(room, month.getMonth() + 1, year.getFullYear());

                setElectricBillThisMonth(response.soDienThangNay.toString());
                setSumElectricBill(response.tongSoDien.toString());

                setWaterBillThisMonth(response.soNuocThangNay.toString());
                setSumWaterBill(response.tongSoNuoc.toString())

                console.log("so phong: ", room);
                console.log("Success: ", response);
                setData(response);
            }
            catch (error) {
                console.log("Xảy ra lỗi: ", error);
                setElectricBillThisMonth('');
                setSumElectricBill('');

                setWaterBillThisMonth('');
                setSumWaterBill('')
            }
        }

        fetchAPI();
    }, [route])

    const [data, setData] = useState([]);
    const [month, setMonth] = useState(null);
    const [isFocusMonth, setIsFocusMonth] = useState(false);
    const [year, setYear] = useState(null);
    const [isFocusYear, setIsFocusYear] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [electricBillThisMonth, setElectricBillThisMonth] = useState('');
    const [sumElectricBill, setSumElectricBill] = useState('');
    const [waterBillThisMonth, setWaterBillThisMonth] = useState('');
    const [sumWaterBill, setSumWaterBill] = useState('');

    const handleElectricBillThisMonthChange = (value) => {
        setElectricBillThisMonth(value);
        const thisMonth = parseInt(value);
        const lastMonth = parseInt('1238');
        const sum = thisMonth - lastMonth;
        setSumElectricBill(sum.toString());
    };

    const handleWaterBillThisMonthChange = (value) => {
        setWaterBillThisMonth(value);
        const thisMonth = parseInt(value);
        const lastMonth = parseInt('1238');
        const sum = thisMonth - lastMonth;
        setSumWaterBill(sum.toString());
    };

    const getThisMonth = () => {
        let month = new Date();
        return 'Tháng ' + (month.getMonth() + 1).toString();
    }

    const getThisYear = () => {
        let year = new Date();
        return (year.getFullYear()).toString();
    }

    const renderMonth = () => {
        if (month || isFocusMonth) {
            return (
                <Text style={[styles.label, isFocusMonth && { color: 'blue' }]}>
                    Tháng
                </Text>
            );
        }
        return null;
    };

    const renderYear = () => {
        if (year || isFocusYear) {
            return (
                <Text style={[styles.label, isFocusYear && { color: 'blue' }]}>
                    Năm
                </Text>
            );
        }
        return null;
    };


    return (
        <ScrollView style={styles.container}>
            <View style={styles.filter}>
                <View>
                    {renderMonth()}
                    <Dropdown
                        style={[styles.dropdown, isFocusMonth && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={MONTH}
                        maxHeight={100}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusMonth ? getThisMonth() : '...'}
                        searchPlaceholder="Search..."
                        value={month}
                        onFocus={() => setIsFocusMonth(true)}
                        onBlur={() => setIsFocusMonth(false)}
                        onChange={item => {
                            setMonth(item.value);
                            setIsFocusMonth(false);
                        }}
                    />
                </View>

                <View>
                    {renderYear()}
                    <Dropdown
                        style={[styles.dropdown, isFocusYear && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={YEAR}
                        maxHeight={100}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusYear ? getThisYear() : '...'}
                        searchPlaceholder="Search..."
                        value={year}
                        onFocus={() => setIsFocusYear(true)}
                        onBlur={() => setIsFocusYear(false)}
                        onChange={item => {
                            setYear(item.value);
                            setIsFocusYear(false);
                        }}
                    />
                </View>

            </View>

            <View style={styles.contentWrapper}>
                <Text style={styles.roomNumber}>Phòng {room}</Text>

                <View style={styles.electricContent}>
                    <Text style={styles.kindofContent}>1. Điện</Text>

                    <View style={styles.content}>
                        <Text style={styles.title}>Giá điện (nghìn đồng/kWh):</Text>
                        <TextInput style={styles.input}
                            inputMode="numeric"
                            editable={false} value="3.5" />
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.title}>Số điện tháng trước:</Text>
                        <TextInput style={styles.input}
                            inputMode="numeric"
                            value="1238" />
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.title}>Số điện tháng này:</Text>
                        <TextInput style={styles.input}
                            inputMode="numeric"
                            onChangeText={(e) => handleElectricBillThisMonthChange(e)}
                            value={electricBillThisMonth}
                        />
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.title}>Tổng số điện:</Text>
                        <TextInput style={styles.inputSum}
                            inputMode="numeric"
                            readOnly
                            value={parseInt(sumElectricBill) < 0 || sumElectricBill === 'NaN' ? '0' : sumElectricBill}
                        />
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.title}>Tổng tiền điện (nghìn đồng):</Text>
                        <TextInput style={styles.inputSum}
                            inputMode="numeric"
                            readOnly
                            value={
                                parseInt(sumElectricBill) < 0 || (parseInt(sumElectricBill) * 3.5).toString() === 'NaN'
                                    ? '0'
                                    : (parseInt(sumElectricBill) * 3.5).toString()
                            }
                        />
                    </View>
                </View>

                <View style={styles.electricContent}>
                    <Text style={styles.kindofContent}>2. Nước</Text>

                    <View style={styles.content}>
                        <Text style={styles.title}>Giá nước (nghìn đồng/khối):</Text>
                        <TextInput style={styles.input}
                            inputMode="numeric"
                            editable={false} value="12" />
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.title}>Số nước tháng trước:</Text>
                        <TextInput style={styles.input}
                            inputMode="numeric"
                            value="1238" />
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.title}>Số nước tháng này:</Text>
                        <TextInput style={styles.input}
                            inputMode="numeric"
                            onChangeText={(e) => handleWaterBillThisMonthChange(e)}
                            value={waterBillThisMonth}
                        />
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.title}>Tổng số nước:</Text>
                        <TextInput style={styles.inputSum}
                            inputMode="numeric"
                            readOnly
                            value={parseInt(sumWaterBill) < 0 || sumWaterBill === 'NaN' ? '0' : sumWaterBill}
                        />
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.title}>Tổng tiền nước (nghìn đồng):</Text>
                        <TextInput style={styles.inputSum}
                            inputMode="numeric"
                            readOnly
                            value={
                                parseInt(sumWaterBill) < 0 || (parseInt(sumWaterBill) * 12).toString() === 'NaN'
                                    ? '0'
                                    : (parseInt(sumWaterBill) * 12).toString()
                            }
                        />
                    </View>
                </View>

                <View style={styles.electricContent}>
                    <Text style={styles.kindofContent}>3. Rác</Text>

                    <View style={styles.content}>
                        <Text style={styles.title}>Giá rác (nghìn đồng/tháng):</Text>
                        <TextInput style={styles.input}
                            inputMode="numeric"
                            editable={false} value="12" />
                    </View>

                </View>

                <View style={styles.electricContent}>
                    <Text style={styles.kindofContent}>4. Phòng</Text>

                    <View style={styles.content}>
                        <Text style={styles.title}>Giá phòng (nghìn đồng/tháng):</Text>
                        <TextInput style={styles.input}
                            inputMode="numeric"
                            editable={false} value="12" />
                    </View>

                </View>

                <View style={styles.electricContent}>
                    <Text style={styles.kindofContent}>Tổng cộng</Text>

                    <View style={styles.contentSum}>
                        <Text style={styles.title}>Tiền phòng tháng này (nghìn đồng/tháng):</Text>

                        <TextInput style={styles.inputFinal}
                            inputMode="numeric"
                            editable={false} value="0" />

                    </View>

                </View>

            </View>

            <View style={styles.buttons}>
                <Button title="Thay đổi bảng giá"
                    titleStyle={{ fontWeight: 'bold', fontSize: 14 }}
                    buttonStyle={{
                        backgroundColor: 'rgba(199, 43, 98, 1)',
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 30,
                    }}
                    containerStyle={{
                        width: "auto",
                        marginBottom: 15,
                    }}
                    onPress={() => setModalVisible(true)} />

                <Button title="Xuất bảng thanh toán"
                    titleStyle={{ fontWeight: 'bold', fontSize: 14 }}
                    buttonStyle={{
                        backgroundColor: 'blue',
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 30,
                    }}
                    containerStyle={{
                        width: "auto",
                        marginBottom: 15,
                    }} />
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <View style={styles.modalContent}>
                            <View style={styles.electricContent}>
                                <View style={styles.content}>
                                    <Text style={styles.title}>Giá phòng (nghìn đồng/tháng):</Text>
                                    <TextInput style={styles.inputModal}
                                        inputMode="numeric"
                                        value="12" />
                                </View>

                                <View style={styles.content}>
                                    <Text style={styles.title}>Giá điện (nghìn đồng/kWh):</Text>
                                    <TextInput style={styles.inputModal}
                                        inputMode="numeric"
                                        value="12" />
                                </View>

                                <View style={styles.content}>
                                    <Text style={styles.title}>Giá nước (nghìn đồng/khối):</Text>
                                    <TextInput style={styles.inputModal}
                                        inputMode="numeric"
                                        value="12" />
                                </View>

                                <View style={styles.content}>
                                    <Text style={styles.title}>Giá rác (nghìn đồng/tháng):</Text>
                                    <TextInput style={styles.inputModal}
                                        inputMode="numeric"
                                        value="12" />
                                </View>

                            </View>

                            <View style={styles.buttonModal}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textBtn}>Thoát</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.button, styles.buttonSave]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textBtn}>Lưu</Text>
                                </Pressable>
                            </View>

                        </View>
                    </View>
                </View>

            </Modal>
        </ScrollView>

    );
}

export default RoomPayment;