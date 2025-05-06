import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [openAddRoom, setOpenAddRoom] = useState(false);
    const [roomID, setRoomID] = useState('')
    const [userInfo, setUserInfo] = useState('');
    const [totalAfterModify, setTotalAfterModify] = useState('0');

    return (
        <AppContext.Provider
            value={{
                openAddRoom, setOpenAddRoom,
                roomID, setRoomID,
                userInfo, setUserInfo,
                totalAfterModify, setTotalAfterModify
            }}>
            {children}
        </AppContext.Provider>
    )
}