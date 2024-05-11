import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, FlatList, TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import summaryAPI from "../../api/summaryAPI";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../../contexts/appContext";

function SummaryScreen() {
    const navigation = useNavigation();

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

    const { userInfo } = useContext(AppContext);

    const [month, setMonth] = useState(null);
    const [isFocusMonth, setIsFocusMonth] = useState(false);
    const [year, setYear] = useState(null);
    const [isFocusYear, setIsFocusYear] = useState(false);
    const [data, setData] = useState([]);
    const [electricTotal, setElectricTotal] = useState('');
    const [waterTotal, setWaterTotal] = useState('');
    const [total, setTotal] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                let month = new Date();
                let year = new Date();
                setMonth((month.getMonth()).toString());
                setYear((year.getFullYear()).toString());

                const response = await summaryAPI.getSummary(month.getMonth() + 1, year.getFullYear(), userInfo.userId);
                setData(response.danhSachHoaDon);
                setElectricTotal(response.tongDien.toString());
                setWaterTotal(response.tongNuoc.toString());
                setTotal(response.tongTienTongKet.toString());

                console.log("Điện: ", response.tongDien.toString());
                console.log("Nước: ", response.tongNuoc.toString())
                console.log("Phòng: ", response.tongTienTongKet.toString())
                setLoading(false);

            }
            catch (error) {
                console.log("Xảy ra lỗi: ", error);
                setLoading(false);
            }
        }

        setLoading(true);
        const unsubscribe = navigation.addListener('focus', fetchAPI);

        fetchAPI();

        return unsubscribe;
    }, [navigation])

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
            const response = await summaryAPI.getSummary(parseInt(monthValue) + 1, parseInt(yearValue), userInfo.userId);
            setData(response.danhSachHoaDon);
            setElectricTotal(response.tongDien.toString());
            setWaterTotal(response.tongNuoc.toString());
            setTotal(response.tongTienTongKet.toString());


            setLoading(false);
        }
        catch (error) {
            console.log("Xảy ra lỗi: ", error);
            console.log("Tháng: ", parseInt(monthValue));
            console.log("Năm: ", yearValue);
            setData([]);
            setElectricTotal('0');
            setWaterTotal('0');
            setTotal('0');
            setLoading(false);
        }
    }

    const renderItem = (item, index) => {
        return (
            <View style={styles.row}>
                <Text style={styles.cellRoom}>{item.phong.tenPhong}</Text>
                <Text style={styles.cellContent}>{item.tongHoaDon}</Text>
                <TextInput style={styles.cellNote}
                    value={item.ghiChu}>
                </TextInput>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.filter}>
                <View>
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
                            getSummaryOfMonth(month, item.value);
                        }}
                    />
                </View>

            </View>

            {
                loading ? <Text>Đang tải ...</Text>
                    :
                    <View style={styles.tableWrapper}>

                        <View style={styles.headerTopBar}>
                            <Text style={styles.headerTopBarText}>Tổng kết tháng</Text>
                        </View>

                        <View style={styles.header}>
                            <Text style={styles.headingRoom}>Phòng</Text>
                            <Text style={styles.headingContent}>Tổng cộng</Text>
                            <Text style={styles.headingNote}>Ghi chú</Text>
                        </View>

                        <View style={styles.list}>
                            <FlatList
                                data={data}
                                keyExtractor={item => item.id}
                                renderItem={({ item, index }) => renderItem(item, index)}
                            />
                        </View>

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
                    </View>
            }


        </View>
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
        paddingVertical: 10,
        paddingHorizontal: 5,
    },

    headerTopBar: {
        backgroundColor: "#6AB7E2",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 5,
        elevation: 2,
        marginBottom: 5
    },

    headerTopBarText: {
        fontWeight: "bold",
        alignSelf: "center",
        color: "white",
        fontSize: 16,
    },

    header: {
        flexDirection: "row",
        padding: 10,
    },

    headingRoom: {
        flex: 1,
        fontSize: 14,
        fontWeight: "bold"
    },

    headingContent: {
        flex: 2,
        fontSize: 14,
        fontWeight: "bold"
    },

    headingNote: {
        flex: 3,
        fontSize: 14,
        fontWeight: "bold"
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

    cellRoom: {
        fontSize: 14,
        textAlign: 'left',
        flex: 1,
    },

    cellContent: {
        fontSize: 14,
        textAlign: 'left',
        flex: 1.5,
    },

    cellNote: {
        paddingVertical: 2,
        fontSize: 14,
        textAlign: 'left',
        flex: 3,
        borderBottomWidth: 1,
        borderBottomColor: "gray"
    },

    list: {
        marginBottom: 10,
        height: 300
    },

    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 7,
    },

    title: {
        fontWeight: "bold",
        fontSize: 14,
    },

    inputSum: {
        backgroundColor: "white",
        borderRadius: 10,
        width: 220,
        paddingHorizontal: 10,
        paddingVertical: 2,
        color: "red",
        fontSize: 14,
    },
})

export default SummaryScreen;