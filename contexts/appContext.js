import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [openAddRoom, setOpenAddRoom] = useState(false);
    //const [roomId, setRoomId] = useState(false);

    return (
        <AppContext.Provider value={{ openAddRoom, setOpenAddRoom }}>
            {children}
        </AppContext.Provider>
    )
}