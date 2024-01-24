import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";

import HomeScreen from "../screens/Home/HomeScreen";
import Header from "../components/Header";
import DetailRoomScreen from "../screens/DetailRoom/DetailRoomScreen";
import MenuItem from "../components/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChartSimple, faHouseChimney } from "@fortawesome/free-solid-svg-icons";

const Drawer = createDrawerNavigator();

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

                <Drawer.Screen name="Chi tiết"
                    component={DetailRoomScreen}
                    options={({ navigation }) => {
                        return {
                            header: () => <Header title="Thống kê" navigation={navigation} />,
                            drawerLabel: () => <MenuItem title="Thống kê" icon={<FontAwesomeIcon icon={faChartSimple} />} />
                        }
                    }} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}