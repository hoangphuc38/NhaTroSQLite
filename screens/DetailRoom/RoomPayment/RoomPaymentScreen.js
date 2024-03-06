import React, { useEffect, useState, useMemo, useRef } from "react";
import { Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import styles from "./styles";
import { Dropdown } from "react-native-element-dropdown";
import { Button } from "@rneui/themed/dist/Button";
import ViewShot, { captureScreen } from "react-native-view-shot";
import billAPI from "../../../api/billAPI";
import pricetableAPI from "../../../api/pricatableAPI";
import roomAPI from "../../../api/roomAPI";

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

    const { room, roomId } = route.params;
    const viewShotRef = useRef();

    useEffect(() => {
        const fetchRoomAPI = async () => {
            try {
                const roomInfo = await roomAPI.getDetailRoom(roomId);

                if (roomInfo.loaiPhong === 1) {
                    setRoomType(false);
                }
                else setRoomType(true);
            }
            catch (error) {
                console.log("Xảy ra lỗi: ", error);
            }
        }
        const fetchTableAPI = async () => {
            try {
                const data = await pricetableAPI.getAll();

                getPriceTableData(data);
            }
            catch (error) {
                console.log("Xảy ra lỗi: ", error);
            }
        }
        const fetchBillAPI = async () => {
            try {
                let month = new Date();
                let year = new Date();
                const response = await billAPI.getHoaDonPhong(roomId, month.getMonth() + 1, year.getFullYear());

                setElectricBillLastMonth(response.soDienThangTruoc.toString());
                setElectricBillThisMonth(response.soDienThangNay.toString());
                setSumElectricBill(response.tongSoDien.toString());
                setLivingTime(response.soNgayO.toString());
                setSumRoomBill(response.tongTienPhong.toString());

                setWaterBillLastMonth(response.soNuocThangTruoc.toString());
                setWaterBillThisMonth(response.soNuocThangNay.toString());
                setSumWaterBill(response.tongSoNuoc.toString())

                setTotalBill(response.tongHoaDon.toString());
                setNote(response.ghiChu);

                setLoading(false);
            }
            catch (error) {
                console.log("Xảy ra lỗi: ", error);
                setElectricBillLastMonth('');
                setElectricBillThisMonth('');
                setSumElectricBill('');

                setWaterBillLastMonth('');
                setWaterBillThisMonth('');
                setSumWaterBill('');
                setLivingTime('');
                setSumRoomBill('');
                setTotalBill('');
                setLoading(false);
            }
        }

        fetchRoomAPI();
        fetchTableAPI();
        fetchBillAPI();
    }, [route])

    const [month, setMonth] = useState(null);
    const [isFocusMonth, setIsFocusMonth] = useState(false);
    const [year, setYear] = useState(null);
    const [isFocusYear, setIsFocusYear] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const [billPresentation, setBillPresentation] = useState(true);
    const [loading, setLoading] = useState(true);
    const [uri, setUri] = useState('');

    const [roomType, setRoomType] = useState(false);

    //Get data in priceTable
    const [kiotPrice, setKiotPrice] = useState('0');
    const [roomPrice, setRoomPrice] = useState('0');
    const [waterPrice, setWaterPrice] = useState('0');
    const [electricPrice, setElectricPrice] = useState('0');
    const [rubbishPrice, setRubishPrice] = useState('0');

    //Get data in bill
    const [electricBillThisMonth, setElectricBillThisMonth] = useState('0');
    const [sumElectricBill, setSumElectricBill] = useState('0');
    const [electricTotal, setElectricTotal] = useState('0');

    const [waterBillThisMonth, setWaterBillThisMonth] = useState('0');
    const [sumWaterBill, setSumWaterBill] = useState('0');
    const [waterTotal, setWaterTotal] = useState('0');

    const [livingTime, setLivingTime] = useState('0');
    const [sumRoomBill, setSumRoomBill] = useState('0');

    const [electricBillLastMonth, setElectricBillLastMonth] = useState('0');
    const [waterBillLastMonth, setWaterBillLastMonth] = useState('0');

    const [totalBill, setTotalBill] = useState('0');
    const [note, setNote] = useState('');

    const handleElectricBillThisMonthChange = (value, lastValue) => {
        setElectricBillThisMonth(value);
        const thisMonth = parseInt(value);
        const lastMonth = parseInt(lastValue);
        const sum = thisMonth - lastMonth;
        setSumElectricBill(sum.toString());
    };

    const handleWaterBillThisMonthChange = (value, lastValue) => {
        setWaterBillThisMonth(value);
        const thisMonth = parseInt(value);
        const lastMonth = parseInt(lastValue);
        const sum = thisMonth - lastMonth;
        setSumWaterBill(sum.toString());
    };

    const totalElectricUpdate = useMemo(() => {
        if (parseInt(sumElectricBill) < 0 || (parseInt(sumElectricBill) * parseFloat(electricPrice)).toString() === 'NaN') {
            return '0';
        }
        else {
            const sum = (parseInt(sumElectricBill) * parseFloat(electricPrice)).toString()
            setElectricTotal(sum);
            return sum;
        }
    }, [sumElectricBill, electricPrice])

    const totalWaterUpdate = useMemo(() => {
        if (parseInt(sumWaterBill) < 0 || (parseInt(sumWaterBill) * parseFloat(waterPrice)).toString() === 'NaN') {
            return '0';
        }
        else {
            const sum = (parseInt(sumWaterBill) * parseFloat(waterPrice)).toString()
            setWaterTotal(sum)
            return sum;
        }
    }, [sumWaterBill, waterPrice])

    const totalRoomUpdate = useMemo(() => {
        if (parseInt(livingTime) < 0 || livingTime === '0' || livingTime === '') {
            return '0';
        }
        if (roomType === false) {
            const sum = (parseInt(parseFloat(roomPrice) / 30 * parseInt(livingTime))).toString();
            setSumRoomBill(sum)
            return sum;
        }
        else {
            const sum = (parseInt(parseFloat(kiotPrice) / 30 * parseInt(livingTime))).toString();
            setSumRoomBill(sum)
            return sum;
        }

    }, [livingTime, roomPrice, kiotPrice])

    const totalBillUpdate = useMemo(() => {
        let electric = parseFloat(electricTotal);
        let water = parseFloat(waterTotal);
        let rubbish = parseFloat(rubbishPrice);
        let room = parseFloat(sumRoomBill);
        if (electric < 0 || water < 0 || room < 0) {
            return '0';
        }
        else {
            const totalBill = electric + water + rubbish + room;
            setTotalBill(totalBill);
            return totalBill.toString();
        }

    }, [electricTotal, waterTotal, rubbishPrice, sumRoomBill])


    const getThisMonth = () => {
        let month = new Date();
        return 'Tháng ' + (month.getMonth()).toString();
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

    const handleCreateBill = async () => {
        let today = new Date();

        return await billAPI.createHoaDonPhong(
            today.toJSON(),
            parseInt(electricBillLastMonth),
            parseInt(electricBillThisMonth),
            parseInt(sumElectricBill),
            parseFloat(electricTotal),
            parseInt(waterBillLastMonth),
            parseInt(waterBillThisMonth),
            parseInt(sumWaterBill),
            parseFloat(waterTotal),
            parseInt(livingTime),
            parseFloat(sumRoomBill),
            parseFloat(totalBill),
            note,
            roomId
        )
            .then(() => {
                setAlertVisible(true);
            })
            .catch((error) => {
                console.log(error);
                alert("Thêm hóa đơn thất bại");
            });
    }

    const getPriceTableData = (data) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === 1) setKiotPrice(data[i].gia.toString());
            else if (data[i].id === 2) setRoomPrice(data[i].gia.toString());
            else if (data[i].id === 3) setElectricPrice(data[i].gia.toString());
            else if (data[i].id === 4) setWaterPrice(data[i].gia.toString());
            else setRubishPrice(data[i].gia.toString());
        }
    }

    const CaptureViewShot = async () => {
        const imageURI = await viewShotRef.current.capture();
        console.log("Chụp thành công: ", imageURI);
        setUri(imageURI);

        if (!uri) return;

        const albumName = 'Screenshot';
        const path = await RNFS.copyFile(uri, `${RNFS.DocumentDirectoryPath}/${albumName}/${Date.now()}.jpg`);
        await CameraRoll.saveToCameraRoll(path, { album: albumName });
    }

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

            {
                loading ? <Text>Đang tải ...</Text>
                    :
                    <View style={styles.contentWrapper}>
                        <Text style={styles.roomNumber}>Phòng {room}</Text>

                        <View style={styles.electricContent}>
                            <Text style={styles.kindofContent}>1. Điện</Text>

                            <View style={styles.content}>
                                <Text style={styles.title}>Giá điện (nghìn đồng/kWh):</Text>
                                <TextInput style={styles.input}
                                    inputMode="numeric"
                                    editable={false} value={electricPrice} />
                            </View>

                            <View style={styles.content}>
                                <Text style={styles.title}>Số điện tháng trước:</Text>
                                <TextInput style={styles.input}
                                    inputMode="numeric"
                                    onChangeText={(e) => setElectricBillLastMonth(e)}
                                    value={electricBillLastMonth} />
                            </View>

                            <View style={styles.content}>
                                <Text style={styles.title}>Số điện tháng này:</Text>
                                <TextInput style={styles.input}
                                    inputMode="numeric"
                                    onChangeText={(e) => handleElectricBillThisMonthChange(e, electricBillLastMonth)}
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
                                    value={totalElectricUpdate}
                                />
                            </View>
                        </View>

                        <View style={styles.electricContent}>
                            <Text style={styles.kindofContent}>2. Nước</Text>

                            <View style={styles.content}>
                                <Text style={styles.title}>Giá nước (nghìn đồng/khối):</Text>
                                <TextInput style={styles.input}
                                    inputMode="numeric"
                                    editable={false} value={waterPrice} />
                            </View>

                            <View style={styles.content}>
                                <Text style={styles.title}>Số nước tháng trước:</Text>
                                <TextInput style={styles.input}
                                    inputMode="numeric"
                                    onChangeText={(e) => setWaterBillLastMonth(e)}
                                    value={waterBillLastMonth} />
                            </View>

                            <View style={styles.content}>
                                <Text style={styles.title}>Số nước tháng này:</Text>
                                <TextInput style={styles.input}
                                    inputMode="numeric"
                                    onChangeText={(e) => handleWaterBillThisMonthChange(e, waterBillLastMonth)}
                                    value={waterBillThisMonth}
                                />
                            </View>

                            <View style={styles.content}>
                                <Text style={styles.title}>Tổng số nước:</Text>
                                <TextInput style={styles.inputSum}
                                    inputMode="numeric"
                                    readOnly
                                    value={parseInt(sumWaterBill) < 0 || sumWaterBill === 'NaN'
                                        ? '0'
                                        : sumWaterBill
                                    }
                                />
                            </View>

                            <View style={styles.content}>
                                <Text style={styles.title}>Tổng tiền nước (nghìn đồng):</Text>
                                <TextInput style={styles.inputSum}
                                    inputMode="numeric"
                                    readOnly
                                    value={totalWaterUpdate}
                                />
                            </View>
                        </View>

                        <View style={styles.electricContent}>
                            <Text style={styles.kindofContent}>3. Rác</Text>

                            <View style={styles.content}>
                                <Text style={styles.title}>Giá rác (nghìn đồng/tháng):</Text>
                                <TextInput style={styles.input}
                                    inputMode="numeric"
                                    editable={false} value={rubbishPrice} />
                            </View>

                        </View>

                        <View style={styles.electricContent}>
                            <Text style={styles.kindofContent}>4. Phòng</Text>

                            <View style={styles.content}>
                                <Text style={styles.title}>Giá phòng (nghìn đồng/tháng):</Text>
                                <TextInput style={styles.input}
                                    inputMode="numeric"
                                    editable={false}
                                    value={roomType ? kiotPrice : roomPrice} />
                            </View>

                            <View style={styles.content}>
                                <Text style={styles.title}>Số ngày ở (bình thường thì ghi 30):</Text>
                                <TextInput style={styles.input}
                                    inputMode="numeric"
                                    onChangeText={(e) => setLivingTime(e)}
                                    value={livingTime}
                                />
                            </View>

                            <View style={styles.content}>
                                <Text style={styles.title}>Tổng tiền phòng (nghìn đồng):</Text>
                                <TextInput style={styles.inputSum}
                                    inputMode="numeric"
                                    readOnly
                                    value={totalRoomUpdate}
                                />
                            </View>

                        </View>

                        <View style={styles.electricContent}>
                            <Text style={styles.kindofContent}>Tổng cộng</Text>

                            <View style={styles.contentSum}>
                                <Text style={styles.title}>Tiền trọ tháng này:</Text>

                                <TextInput style={styles.inputFinal}
                                    inputMode="numeric"
                                    readOnly
                                    value={totalBillUpdate} />

                            </View>

                        </View>

                        <View style={styles.electricContent}>
                            <Text style={styles.kindofContent}>Ghi chú</Text>

                            <View style={styles.contentSum}>
                                <TextInput style={styles.inputNote}
                                    onChangeText={(e) => setNote(e)}
                                    value={note} />

                            </View>

                        </View>

                    </View>
            }

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
                    }}
                    onPress={handleCreateBill} />
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={alertVisible}
                onRequestClose={() => setAlertVisible(!alertVisible)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.notification}>
                        <View style={styles.modalContent}>
                            <View style={styles.electricContent}>
                                <View style={styles.contentAlert}>
                                    <Text style={styles.titleAlert}>Thêm hóa đơn thành công.</Text>
                                    <Text style={styles.titleAlert}>Bạn có muốn in ra hình ảnh hóa đơn ?</Text>
                                </View>
                            </View>

                            <View style={styles.buttonModal}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setAlertVisible(!alertVisible)}>
                                    <Text style={styles.textBtn}>Thoát</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.button, styles.buttonSave]}
                                    onPress={() => setAlertVisible(!alertVisible)}>
                                    <Text style={styles.textBtn}>OK</Text>
                                </Pressable>
                            </View>

                        </View>
                    </View>
                </View>
            </Modal>

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

            <Modal
                animationType="fade"
                transparent={true}
                visible={true}
                onRequestClose={() => setBillPresentation(!billPresentation)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        <View style={styles.modalContent}>
                            <ViewShot style={styles.electricContent}
                                ref={viewShotRef}
                                options={{ format: 'jpg', quality: 1.0 }}>
                                <View style={styles.contentDate}>
                                    <Text style={styles.title}>Ngày 3/2/2024</Text>
                                </View>

                                <View style={styles.contentHeader}>
                                    <Text style={styles.titleHeader}>Phòng {room}</Text>
                                </View>

                                <View style={styles.form}>
                                    <View style={styles.titleBill}>
                                        <Text>Số điện tháng trước:</Text>
                                        <Text>Số điện tháng này:</Text>
                                        <Text>Tổng số điện:</Text>
                                        <Text>Tổng tiền điện:</Text>
                                        <Text></Text>
                                        <Text>Số nước tháng trước:</Text>
                                        <Text>Số nước tháng này:</Text>
                                        <Text>Tổng số nước:</Text>
                                        <Text>Tổng tiền nước:</Text>
                                        <Text></Text>
                                        <Text>Tiền rác:</Text>
                                        <Text></Text>
                                        <Text>Tiền phòng:</Text>
                                        <Text></Text>
                                        <Text>Tổng cộng:</Text>
                                    </View>
                                    <View style={styles.titleBill}>
                                        <Text style={styles.contentBill}>1000</Text>
                                        <Text style={styles.title}>1000</Text>
                                        <Text style={styles.contentBill}>1000</Text>
                                        <Text style={styles.title}>1000.000</Text>
                                        <Text></Text>
                                        <Text style={styles.contentBill}>1000</Text>
                                        <Text style={styles.title}>1000</Text>
                                        <Text style={styles.contentBill}>1000</Text>
                                        <Text style={styles.title}>1000.000</Text>
                                        <Text></Text>
                                        <Text style={styles.contentBill}>1000</Text>
                                        <Text></Text>
                                        <Text style={styles.contentBill}>1000</Text>
                                        <Text></Text>
                                        <Text style={styles.contentBillSum}>1000.000</Text>
                                    </View>
                                </View>

                            </ViewShot>

                            <View style={styles.buttonModal}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setBillPresentation(!billPresentation)}>
                                    <Text style={styles.textBtn}>Thoát</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.button, styles.buttonSave]}
                                    onPress={CaptureViewShot}>
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