import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, FlatList, TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import summaryAPI from "../../api/summaryAPI";

function SummaryScreen() {
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

    const dataTable = [
        { id: '1', room: "1", content: "2000.000", note: "" },
        { id: '2', room: "2", content: "1500.000", note: "" },
        { id: '3', room: "3", content: "900.000", note: "" },
        { id: '4', room: "4", content: "450.000", note: "" },
        { id: '5', room: "5", content: "350.000", note: "" },
        { id: '6', room: "6", content: "2000.000", note: "" },
        { id: '7', room: "7", content: "1500.000", note: "" },
        { id: '8', room: "8", content: "900.000", note: "" },
        { id: '9', room: "9", content: "450.000", note: "" },
        { id: '10', room: "10", content: "350.000", note: "" },
    ]

    const [month, setMonth] = useState(null);
    const [isFocusMonth, setIsFocusMonth] = useState(false);
    const [year, setYear] = useState(null);
    const [isFocusYear, setIsFocusYear] = useState(false);
    const [data, setData] = useState([]);
    const [arrayNote, setArrayNote] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                let month = new Date();
                let year = new Date();
                const response = await summaryAPI.getSummary(month.getMonth() + 1, year.getFullYear());
                console.log("Success: ", response);
                setData(response.danhSachHoaDon);

            }
            catch (error) {
                console.log("Xảy ra lỗi: ", error);
                setLoading(false);
            }
        }

        fetchAPI();
    }, [])

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

    const renderItem = (item, index) => {
        return (
            <View style={styles.row}>
                <Text style={styles.cellRoom}>{item.phong.tenPhong}</Text>
                <Text style={styles.cellContent}>{item.tongHoaDon}</Text>
                <TextInput style={styles.ghiChu}
                    onChangeText={(text) => {
                        let arrayNote = [...data];
                        arrayNote[index].ghiChu = text;
                        setData(arrayNote);
                    }}
                    value={item.ghiChu}>
                </TextInput>
            </View>
        )
    }

    return (
        <View style={styles.container}>
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

            <View style={styles.tableWrapper}>

                <View style={styles.headerTopBar}>
                    <Text style={styles.headerTopBarText}>Tổng kết tháng</Text>
                </View>

                <View style={styles.header}>
                    <Text style={styles.headingRoom}>Phòng</Text>
                    <Text style={styles.headingContent}>Tổng cộng</Text>
                    <Text style={styles.headingNote}>Ghi chú</Text>
                </View>

                <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => renderItem(item, index)}
                />
            </View>
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
        marginBottom: 15,
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

    headerTopBar: {
        backgroundColor: "#6AB7E2",
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 5,
        elevation: 2,
        marginBottom: 15,
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
        elevation: 1,
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
})

export default SummaryScreen;