import { useContext, useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View, FlatList, TextInput, ActivityIndicator, Modal, Pressable, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useIsFocused } from "@react-navigation/native";
import { AppContext } from "../../contexts/appContext";
import { useSQLiteContext } from "expo-sqlite";
import { Button } from "@rneui/themed/dist/Button";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSortDown, faSortUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from "react-native-view-shot";

function SummaryScreen() {
    const isFocused = useIsFocused();

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

    const { userInfo, sumCoc, setSumCoc, sumTra, setSumTra } = useContext(AppContext);
    const db = useSQLiteContext();

    const [month, setMonth] = useState(null);
    const [isFocusMonth, setIsFocusMonth] = useState(false);
    const [year, setYear] = useState(null);
    const [isFocusYear, setIsFocusYear] = useState(false);
    const [electricTotal, setElectricTotal] = useState('');
    const [waterTotal, setWaterTotal] = useState('');
    const [total, setTotal] = useState('');

    const [data, setData] = useState([]);
    const [dataCoc, setDataCoc] = useState([]);
    const [dataTra, setDataTra] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [openAddRoomCoc, setOpenAddRoomCoc] = useState(false);
    const [openAddRoomTra, setOpenAddRoomTra] = useState(false);

    const [loading, setLoading] = useState(false);
    const [isListRoomVisible, setIsListRoomVisible] = useState(false);
    const [isListCocVisible, setIsListCocVisible] = useState(false);
    const [isListTraVisible, setIsListTraVisible] = useState(false);

    const [newName, setNewName] = useState("");
    const [newPrice, setNewPrice] = useState("");

    const [totalAfterModify, setTotalAfterModify] = useState('0');

    const viewShotRef = useRef();

    const [status, requestPermission] = MediaLibrary.usePermissions();

    if (status == null) {
        requestPermission();
    }

    useEffect(() => {
        if (isFocused) {
            getData();
        }
    }, [isFocused]);

    const getData = async () => {
        try {
            let month = new Date();
            let year = new Date();
            setMonth((month.getMonth()).toString());
            setYear((year.getFullYear()).toString());

            const response = await db.getFirstAsync(
                `SELECT * FROM TongKetThang WHERE user_id = ? AND strftime('%m', ngaytongket) = ? AND strftime('%Y', ngaytongket) = ?`,
                [userInfo.id,
                month.getMonth() + 1 < 10 ? '0' + (month.getMonth() + 1).toString() : (month.getMonth() + 1).toString(),
                year.getFullYear().toString()]
            )
            const result = await db.getAllAsync(
                `SELECT * FROM HoaDonPhong INNER JOIN Phong ON Phong.id = HoaDonPhong.phong_id ` +
                `WHERE tongket_id = ? AND ` +
                `strftime('%m', ngayhoadon) = ? AND strftime('%Y', ngayhoadon) = ?`,
                [response.id,
                month.getMonth() + 1 < 10 ? '0' + (month.getMonth() + 1).toString() : (month.getMonth() + 1).toString(),
                year.getFullYear().toString()]
            )
            setData(result);
            setElectricTotal(response.tongdien.toString());
            setWaterTotal(response.tongnuoc.toString());
            setTotal(response.tongtientongket.toString());

            if (parseInt(totalAfterModify) === '0') {
                setTotalAfterModify(response.tongtientongket.toString());
            }

            setTotalAfterModify((response.tongtientongket + sumCoc - sumTra).toString())

            setLoading(false);
        }
        catch (error) {
            console.log("Xảy ra lỗi: ", error);
            setLoading(false);
        }
    }

    const getThisMonth = () => {
        let month = new Date();
        return 'Tháng ' + (month.getMonth()).toString();
    }

    const getThisYear = () => {
        let year = new Date();
        return (year.getFullYear()).toString();
    }

    const getSummaryOfMonth = async (monthValue, yearValue) => {
        try {
            setLoading(true);
            const response = await db.getFirstAsync(
                `SELECT * FROM TongKetThang WHERE user_id = ? AND strftime('%m', ngaytongket) = ? AND strftime('%Y', ngaytongket) = ?`,
                [userInfo.id,
                parseInt(monthValue) + 1 < 10 ? '0' + (parseInt(monthValue) + 1).toString() : (parseInt(monthValue) + 1).toString(),
                parseInt(yearValue).toString()]
            )
            const result = await db.getAllAsync(
                `SELECT * FROM HoaDonPhong INNER JOIN Phong ON Phong.id = HoaDonPhong.phong_id ` +
                `WHERE tongket_id = ? AND ` +
                `strftime('%m', ngayhoadon) = ? AND strftime('%Y', ngayhoadon) = ?`,
                [response.id,
                parseInt(monthValue) + 1 < 10 ? '0' + (parseInt(monthValue) + 1).toString() : (parseInt(monthValue) + 1).toString(),
                parseInt(yearValue).toString()]
            )
            setData(result);
            setElectricTotal(response.tongdien.toString());
            setWaterTotal(response.tongnuoc.toString());
            setTotal(response.tongtientongket.toString());
            setLoading(false);
        }
        catch (error) {
            console.log("Xảy ra lỗi: ", error);
            setData([]);
            setElectricTotal('0');
            setWaterTotal('0');
            setTotal('0');
            setLoading(false);
        }
    }

    const CaptureViewShot = async () => {
        try {
            const localUri = await captureRef(viewShotRef, {
                height: 440,
                quality: 1,
            });

            await MediaLibrary.saveToLibraryAsync(localUri);
            if (localUri) {
                alert("Lưu ảnh thành công, vui lòng kiểm tra bộ sưu tập");
            }

            setModalVisible(false);
        } catch (e) {
            console.log(e);
        }
    }

    const toggleList = () => {
        setIsListRoomVisible(!isListRoomVisible);
    };

    const toggleCoc = () => {
        setIsListCocVisible(!isListCocVisible);
    }

    const toggleTra = () => {
        setIsListTraVisible(!isListTraVisible);
    }

    const HandleNewRoomCoc = (tenphong, tientracoc) => {
        const newdataCoc = [...dataCoc, { tenphong, tientracoc }];
        const newTotal = parseInt(totalAfterModify) + parseInt(tientracoc);

        setSumCoc(sumCoc + parseInt(tientracoc));
        setTotalAfterModify(newTotal.toString());
        setNewName("");
        setNewPrice("");
        setDataCoc(newdataCoc);
        setOpenAddRoomCoc(false);
    }

    const HandleNewRoomTra = (tenphong, tientracoc) => {
        const newdataTra = [...dataTra, { tenphong, tientracoc }];
        const newTotal = parseInt(totalAfterModify) - parseInt(tientracoc);

        setSumTra(sumTra + parseInt(tientracoc))
        setTotalAfterModify(newTotal.toString());
        setNewName("");
        setNewPrice("");
        setDataTra(newdataTra);
        setOpenAddRoomTra(false);
    }

    const HandleDeleteItemCoc = (index) => {
        const newTotal = parseInt(totalAfterModify) - parseInt(dataCoc[index].tientracoc);

        setSumCoc(sumCoc - parseInt(dataCoc[index].tientracoc));
        setDataCoc(dataCoc.filter((_, i) => i !== index));
        setTotalAfterModify(newTotal.toString());
    }

    const HandleDeleteItemTra = (index) => {
        const newTotal = parseInt(totalAfterModify) + parseInt(dataTra[index].tientracoc);

        setSumTra(sumTra - parseInt(dataTra[index].tientracoc));
        setDataTra(dataTra.filter((_, i) => i !== index));
        setTotalAfterModify(newTotal.toString());
    }

    const renderItem = (item, index) => {
        return (
            <View style={styles.content}>
                <Text style={styles.title}>Phòng {item.tenphong} :</Text>
                <TextInput style={styles.inputSumRoom}
                    inputMode="numeric"
                    readOnly
                >
                    <Text>{item.tonghoadon.toString()}</Text>
                </TextInput>
            </View>
        )
    }

    const renderItemCoc = (item, index) => {
        return (
            <View style={styles.content}>
                <Text style={styles.title}>Phòng {item.tenphong} :</Text>
                <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                    <TextInput style={styles.inputSumRoom}
                        inputMode="numeric"
                        readOnly
                    >
                        <Text>{item.tientracoc}</Text>
                    </TextInput>
                    <TouchableOpacity onPress={() => HandleDeleteItemCoc(index)}>
                        <FontAwesomeIcon icon={faTrash} color="red" size={14} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderItemTra = (item, index) => {
        return (
            <View style={styles.content}>
                <Text style={styles.title}>Phòng {item.tenphong} :</Text>
                <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
                    <TextInput style={styles.inputSumRoom}
                        inputMode="numeric"
                        readOnly
                    >
                        <Text>{item.tientracoc}</Text>
                    </TextInput>
                    <TouchableOpacity onPress={() => HandleDeleteItemTra(index)}>
                        <FontAwesomeIcon icon={faTrash} color="red" size={14} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderScreenShotItem = (item, index) => {
        return (
            <View style={styles.content}>
                <Text style={styles.title}>Phòng {item.tenphong} :</Text>
                <Text style={styles.tonghoadonText}>{item.tonghoadon.toString()}</Text>
            </View>
        )
    }

    const renderScreenShotCoc = (item, index) => {
        return (
            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Phòng {item.tenphong} cọc</Text>
                <Text>{item.tientracoc}.000</Text>
            </View>
        )
    }

    const renderScreenShotTra = (item, index) => {
        return (
            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Phòng {item.tenphong} trả phòng</Text>
                <Text >{item.tientracoc}.000</Text>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.filter}>
                <View>
                    <Dropdown
                        style={[styles.dropdown, isFocusMonth && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={MONTH}
                        maxHeight={200}
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
                            getSummaryOfMonth(item.value, year);
                        }}
                    />
                </View>

                <View>
                    <Dropdown
                        style={[styles.dropdown, isFocusYear && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={YEAR}
                        maxHeight={200}
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
                            getSummaryOfMonth(month, item.value);
                        }}
                    />
                </View>
            </View>

            {
                loading ? <ActivityIndicator style={{ justifyContent: "center" }} color={"red"} size={"small"} />
                    :
                    <View style={styles.tableWrapper}>
                        <TouchableOpacity onPress={toggleList}>
                            <View style={styles.titleView}>
                                <Text style={styles.kindofContent}>Danh sách các phòng</Text>
                                <View style={styles.iconContainer}>
                                    <FontAwesomeIcon
                                        icon={isListRoomVisible ? faSortUp : faSortDown}
                                        size={14}
                                        color="blue"
                                        style={isListRoomVisible ? { marginTop: 7 } : {}}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        {isListRoomVisible && (
                            <View style={{ paddingBottom: 10 }}>
                                {data.map((item, index) => (
                                    <View key={item.id}>
                                        {renderItem(item, index)}
                                    </View>
                                ))}
                            </View>
                        )}

                        <TouchableOpacity onPress={toggleCoc}>
                            <View style={styles.titleView}>
                                <Text style={styles.kindofContent}>Danh sách phòng đặt cọc</Text>
                                <View style={styles.iconContainer}>
                                    <FontAwesomeIcon
                                        icon={isListCocVisible ? faSortUp : faSortDown}
                                        size={14}
                                        color="blue"
                                        style={isListCocVisible ? { marginTop: 7 } : {}}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        {isListCocVisible && (
                            <View>
                                {dataCoc.map((item, index) => (
                                    <View key={index}>
                                        {renderItemCoc(item, index)}
                                    </View>
                                ))}

                                <TouchableOpacity onPress={() => setOpenAddRoomCoc(true)}
                                    style={{
                                        padding: 5,
                                        flexDirection: 'row',
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#2196F3",
                                        borderRadius: 5,
                                        marginVertical: 10
                                    }}>
                                    <Text style={styles.textSmallBtn}>Thêm phòng cọc</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        <TouchableOpacity onPress={toggleTra}>
                            <View style={styles.titleView}>
                                <Text style={styles.kindofContent}>Danh sách phòng trả</Text>
                                <View style={styles.iconContainer}>
                                    <FontAwesomeIcon
                                        icon={isListTraVisible ? faSortUp : faSortDown}
                                        size={14}
                                        color="blue"
                                        style={isListTraVisible ? { marginTop: 7 } : {}}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        {isListTraVisible && (
                            <View>
                                {dataTra.map((item, index) => (
                                    <View key={index}>
                                        {renderItemTra(item, index)}
                                    </View>
                                ))}

                                <TouchableOpacity onPress={() => setOpenAddRoomTra(true)}
                                    style={{
                                        padding: 5,
                                        flexDirection: 'row',
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#2196F3",
                                        borderRadius: 5,
                                        marginVertical: 10
                                    }}>
                                    <Text style={styles.textSmallBtn}>Thêm phòng trả</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        <View style={styles.list}>
                            <View style={styles.content}>
                                <Text style={styles.title}>Tổng số điện:</Text>
                                <TextInput style={styles.inputSum}
                                    inputMode="numeric"
                                    readOnly
                                    value={electricTotal + '   nghìn đồng'}
                                />
                            </View>

                            <View style={styles.content}>
                                <Text style={styles.title}>Tổng số nước:</Text>
                                <TextInput style={styles.inputSum}
                                    inputMode="numeric"
                                    readOnly
                                    value={waterTotal + '   nghìn đồng'}
                                />
                            </View>

                            <View style={styles.content}>
                                <Text style={styles.title}>Tổng cộng:</Text>
                                <TextInput style={styles.inputSum}
                                    inputMode="numeric"
                                    readOnly
                                    value={total + '   nghìn đồng'}
                                />
                            </View>

                            <View style={styles.content}>
                                <Text style={styles.title}>Sau cọc/trả còn:</Text>
                                <TextInput style={styles.inputSum}
                                    inputMode="numeric"
                                    readOnly
                                    value={totalAfterModify + '   nghìn đồng'}
                                />
                            </View>
                        </View>

                        <View style={styles.buttons}>
                            <Button title="Xem trước khi in"
                                titleStyle={{ fontWeight: 'bold', fontSize: 14 }}
                                buttonStyle={{
                                    backgroundColor: '#2196F3',
                                    borderColor: 'transparent',
                                    borderWidth: 0,
                                    borderRadius: 30,
                                    paddingHorizontal: 15
                                }}
                                containerStyle={{
                                    width: "auto",
                                    marginTop: 15
                                }}
                                onPress={() => setModalVisible(true)}
                            />
                        </View>
                    </View>
            }
            <Modal
                animationType="fade"
                transparent={true}
                visible={openAddRoomCoc}
                onRequestClose={() => setOpenAddRoomCoc(!openAddRoomCoc)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalAddRoom}>
                        <View style={styles.modalContent}>
                            <View style={styles.titleModal}>
                                <Text style={styles.modalText}>Thêm phòng đặt cọc</Text>
                            </View>

                            <View style={styles.inputWrapper}>
                                <Text style={styles.titleInput}>Tên/Số phòng:</Text>
                                <TextInput style={styles.contentInput}
                                    onChangeText={(e) => setNewName(e)}
                                    value={newName} />
                            </View>

                            <View style={styles.inputWrapper}>
                                <Text style={styles.titleInput}>Tiền đặt cọc (nghìn đồng):</Text>
                                <TextInput style={styles.contentInput}
                                    inputMode="numeric"
                                    onChangeText={(e) => setNewPrice(e)}
                                    value={newPrice} />
                            </View>

                            <View style={styles.buttonModals}>
                                <Pressable
                                    style={[styles.buttonAdd, styles.buttonClose]}
                                    onPress={() => setOpenAddRoomCoc(!openAddRoomCoc)}>
                                    <Text style={styles.textBtn}>Thoát</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.buttonAdd, styles.buttonSubmit]}
                                    onPress={() => HandleNewRoomCoc(newName, newPrice)}>
                                    <Text style={styles.textBtn}>Thêm</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={openAddRoomTra}
                onRequestClose={() => setOpenAddRoomTra(!openAddRoomTra)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalAddRoom}>
                        <View style={styles.modalContent}>
                            <View style={styles.titleModal}>
                                <Text style={styles.modalText}>Thêm phòng trả cọc</Text>
                            </View>

                            <View style={styles.inputWrapper}>
                                <Text style={styles.titleInput}>Tên/Số phòng:</Text>
                                <TextInput style={styles.contentInput}
                                    onChangeText={(e) => setNewName(e)}
                                    value={newName} />
                            </View>

                            <View style={styles.inputWrapper}>
                                <Text style={styles.titleInput}>Tiền trả cọc (nghìn đồng):</Text>
                                <TextInput style={styles.contentInput}
                                    inputMode="numeric"
                                    onChangeText={(e) => setNewPrice(e)}
                                    value={newPrice} />
                            </View>

                            <View style={styles.buttonModals}>
                                <Pressable
                                    style={[styles.buttonAdd, styles.buttonClose]}
                                    onPress={() => setOpenAddRoomTra(!openAddRoomTra)}>
                                    <Text style={styles.textBtn}>Thoát</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.buttonAdd, styles.buttonSubmit]}
                                    onPress={() => HandleNewRoomTra(newName, newPrice)}>
                                    <Text style={styles.textBtn}>Thêm</Text>
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
                            <View style={styles.screenshotContent}
                                ref={viewShotRef}
                                collapsable={false}>

                                <View style={styles.contentHeader}>
                                    <Text style={styles.titleHeader}>{getThisMonth()}/{getThisYear()}</Text>
                                </View>

                                <View style={styles.form}>
                                    <FlatList
                                        key={`flatlist-${2}`}
                                        showsVerticalScrollIndicator={false}
                                        data={data}
                                        keyExtractor={item => item.id}
                                        renderItem={({ item, index }) => renderScreenShotItem(item, index)}
                                        numColumns={2}
                                        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 5 }}
                                    />
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        data={dataCoc}
                                        keyExtractor={item => item.id}
                                        renderItem={({ item, index }) => renderScreenShotCoc(item, index)}
                                    />
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        data={dataTra}
                                        keyExtractor={item => item.id}
                                        renderItem={({ item, index }) => renderScreenShotTra(item, index)}
                                    />
                                </View>

                                <View style={styles.totalForm}>
                                    <Text style={{ fontWeight: 'bold' }}>Tổng cộng:</Text>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                        {totalAfterModify}.000
                                    </Text>
                                </View>

                            </View>

                            <View style={styles.buttonModal}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(false)}>
                                    <Text style={styles.textBtn}>Thoát</Text>
                                </Pressable>

                                <Pressable
                                    style={[styles.button, styles.buttonSave]}
                                    onPress={CaptureViewShot}
                                >
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },

    filter: {
        backgroundColor: 'transparent',
        padding: 5,
        flexDirection: "row",
        gap: 5,
        justifyContent: "flex-end",
        marginTop: 10
    },

    dropdown: {
        width: 110,
        backgroundColor: "white",
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 5,
    },

    icon: {
        marginRight: 5,
    },

    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: -8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },

    placeholderStyle: {
        fontSize: 14,
    },

    selectedTextStyle: {
        fontSize: 14,
    },

    inputSearchStyle: {
        height: 40,
        fontSize: 14,
    },

    tableWrapper: {
        flex: 1,
        marginBottom: 10,
        paddingVertical: 20,
        paddingHorizontal: 5,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 8,
        marginHorizontal: 2,
        elevation: 2,
        borderRadius: 3,
        borderColor: '#fff',
        padding: 10,
        backgroundColor: "#fff",
    },

    list: {
        marginTop: 10,
        paddingTop: 15,
        borderTopWidth: 0.5
    },

    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 7,
    },

    titleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },

    iconContainer: {
        height: 20,
        width: 20,
        alignItems: 'center',
    },

    inputSum: {
        backgroundColor: "white",
        borderRadius: 10,
        width: 210,
        paddingHorizontal: 10,
        paddingVertical: 2,
        color: "red",
        fontSize: 14,
    },

    inputSumRoom: {
        backgroundColor: "white",
        borderRadius: 10,
        width: 220,
        paddingHorizontal: 10,
        paddingVertical: 2,
        color: "#0B60B0",
        fontSize: 14,
    },

    buttons: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "flex-end",
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    modal: {
        width: "95%",
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    modalContent: {
        width: "100%",
    },

    screenshotContent: {
        gap: 10,
        backgroundColor: "white",
        padding: 10,
    },

    contentHeader: {
        flexDirection: "row",
        justifyContent: "center"
    },

    titleHeader: {
        fontSize: 16,
        color: "blue",
        fontWeight: "bold"
    },

    form: {
        gap: 10,
        width: '100%',
    },

    totalForm: {
        flexDirection: "row",
        alignItems: 'baseline',
        gap: 40,
        borderTopWidth: 0.5,
        paddingTop: 10
    },

    contentScreenShot: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    title: {
        fontWeight: "bold",
        fontSize: 14,
    },

    tonghoadonText: {
        marginLeft: 10,
        color: "#0B60B0"
    },

    kindofContent: {
        fontSize: 16,
        fontWeight: "bold",
        color: 'blue'
    },

    buttonModal: {
        flexDirection: "row",
        marginTop: 15,
        justifyContent: "space-evenly"
    },

    button: {
        borderRadius: 10,
        padding: 8,
        elevation: 2,
        width: "40%",
    },

    buttonClose: {
        backgroundColor: "red",
    },

    buttonSave: {
        backgroundColor: '#2196F3',
    },

    textBtn: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15
    },

    textSmallBtn: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    modalAddRoom: {
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    inputWrapper: {
        gap: 5,
        marginBottom: 10,
    },

    buttonModals: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10
    },

    buttonAdd: {
        borderRadius: 10,
        padding: 5,
        elevation: 2,
        width: "40%",
        alignSelf: "center"
    },

    modalText: {
        marginBottom: 10,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: "bold"
    },

    titleInput: {
        fontSize: 14,
        textAlign: "left",
        fontWeight: "bold"
    },

    contentInput: {
        backgroundColor: "white",
        borderRadius: 10,
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 2,
        fontSize: 14,
        borderColor: 'gray',
        borderWidth: 1
    },

    buttonSubmit: {
        backgroundColor: '#2196F3'
    },
})

export default SummaryScreen;