import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";

import HomeScreen from "../screens/Home/HomeScreen";
import Header from "../components/Header";
import MenuItem from "../components/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChartSimple, faHouseChimney, faTableList } from "@fortawesome/free-solid-svg-icons";


import CustomerInfoScreen from "../screens/DetailRoom/CustomerInfo/CustomerInfoScreen";
import RoomPayment from "../screens/DetailRoom/RoomPayment/RoomPaymentScreen";
import HeaderNoSideBar from "../components/HeaderNoSideBar";
import PriceTableScreen from "../screens/PriceTable/PriceTableScreen";
import SummaryScreen from "../screens/Summary/SummaryScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Trang chủ"
                    component={HomeScreen}
                    options={({ navigation }) => {
                        return {
                            header: () => <Header title="Trang chủ" navigation={navigation} />,
                            drawerLabel: () => <MenuItem title="Trang chủ" icon={<FontAwesomeIcon icon={faHouseChimney} />} />
                        }
                    }} />

                <Drawer.Screen name="Tổng kết tháng"
                    component={SummaryScreen}
                    options={({ navigation }) => {
                        return {
                            header: () => <Header title="Tổng kết tháng" navigation={navigation} />,
                            drawerLabel: () => <MenuItem title="Tổng kết tháng" icon={<FontAwesomeIcon icon={faChartSimple} />} />
                        }
                    }} />

                <Drawer.Screen name="Bảng giá"
                    component={PriceTableScreen}
                    options={({ navigation }) => {
                        return {
                            header: () => <Header title="Bảng giá" navigation={navigation} />,
                            drawerLabel: () => <MenuItem title="Bảng giá" icon={<FontAwesomeIcon icon={faTableList} />} />
                        }
                    }} />

                <Drawer.Screen name="Chi tiết"
                    component={CustomerInfoScreen}
                    options={({ navigation }) => {
                        return {
                            header: () => <HeaderNoSideBar title="Thông tin người ở" navigation={navigation} />,
                            drawerItemStyle: { height: 0 }
                        }
                    }} />

                <Drawer.Screen name="Thanh toán"
                    component={RoomPayment}
                    options={({ navigation }) => {
                        return {
                            header: () => <HeaderNoSideBar title="Thanh toán tiền phòng" navigation={navigation} />,
                            drawerItemStyle: { height: 0 }
                        }
                    }} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}