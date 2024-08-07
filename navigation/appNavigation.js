import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";

import HomeScreen from "../screens/Home/HomeScreen";
import Header from "../components/Header";
import MenuItem from "../components/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChartSimple, faHouseChimney, faMagnifyingGlass, faPlus, faTableList } from "@fortawesome/free-solid-svg-icons";

import CustomerInfoScreen from "../screens/DetailRoom/CustomerInfo/CustomerInfoScreen";
import RoomPayment from "../screens/DetailRoom/RoomPayment/RoomPaymentScreen";
import HeaderNoSideBar from "../components/HeaderNoSideBar";
import PriceTableScreen from "../screens/PriceTable/PriceTableScreen";
import SummaryScreen from "../screens/Summary/SummaryScreen";
import { AppContext } from "../contexts/appContext";
import NewCustomer from "../screens/DetailRoom/NewCustomer";
import LoginScreen from "../screens/Login/LoginScreen";
import SignupScreen from "../screens/SignUp/SignupScreen";
import DrawerContent from "../components/DrawerContent";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const StackNavigation = () => {
    const navigation = useNavigation();

    return (
        <Stack.Navigator initialRouteName="Đăng nhập">
            <Stack.Screen
                name="Đăng nhập"
                component={LoginScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Đăng ký"
                component={SignupScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Home"
                component={ScreenWithDrawer}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>

    )
}

const ScreenWithDrawer = () => {
    const { setOpenAddRoom } = useContext(AppContext);

    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Trang chủ"
                component={HomeScreen}
                options={({ navigation }) => {
                    return {
                        header: () => <Header title="Trang chủ"
                            navigation={navigation}
                            iconButton={faPlus}
                            onPressButton={() => setOpenAddRoom(true)} />,
                        drawerLabel: () => <MenuItem title="Trang chủ" icon={<FontAwesomeIcon icon={faHouseChimney} />} />
                    }
                }} />

            <Drawer.Screen name="Tổng kết tháng"
                component={SummaryScreen}
                options={({ navigation }) => {
                    return {
                        header: () => <Header title="Tổng kết" navigation={navigation} />,
                        drawerLabel: () => <MenuItem title="Tổng kết tháng" icon={<FontAwesomeIcon icon={faChartSimple} />} />
                    }
                }} />

            <Drawer.Screen name="Bảng giá"
                component={PriceTableScreen}
                options={({ navigation }) => {
                    return {
                        header: () => <Header title="Thông tin" navigation={navigation} />,
                        drawerLabel: () => <MenuItem title="Thông tin" icon={<FontAwesomeIcon icon={faTableList} />} />
                    }
                }} />

            <Drawer.Screen name="Chi tiết"
                component={CustomerInfoScreen}
                options={({ navigation }) => {
                    return {
                        header: () => <HeaderNoSideBar title="Thông tin người ở"
                            navigation={navigation}
                            iconButton={faPlus}
                            onPressButton={
                                () => navigation.navigate("Thêm người ở")
                            }
                        />,
                        drawerItemStyle: { height: 0 }
                    }
                }} />

            <Drawer.Screen name="Thanh toán"
                component={RoomPayment}
                options={({ navigation }) => {
                    return {
                        header: () => <HeaderNoSideBar title="Thanh toán tiền phòng" navigation={navigation} iconButton={null} />,
                        drawerItemStyle: { height: 0 }
                    }
                }} />

            <Drawer.Screen name="Thêm người ở"
                component={NewCustomer}
                options={({ navigation }) => {
                    return {
                        header: () => <HeaderNoSideBar title="Thêm người ở" navigation={navigation} iconButton={null} />,
                        drawerItemStyle: { height: 0 }
                    }
                }}
            />
        </Drawer.Navigator>

    )
}

export default StackNavigation;