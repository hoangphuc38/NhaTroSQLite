import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [openAddRoom, setOpenAddRoom] = useState(false);
    const [userInfo, setUserInfo] = useState('');

    return (
        <AppContext.Provider value={{ openAddRoom, setOpenAddRoom, userInfo, setUserInfo }}>
            {children}
        </AppContext.Provider>
    )
}