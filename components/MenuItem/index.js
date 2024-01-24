import React from "react";
import { Text, View } from "react-native";

function MenuItem({ title, icon }) {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            {icon}
            <Text>{title}</Text>
        </View>
    );
}

export default MenuItem;