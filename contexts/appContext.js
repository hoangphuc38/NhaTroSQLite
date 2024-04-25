import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [openAddRoom, setOpenAddRoom] = useState(false);
    const [userId, setUserId] = useState('');

    return (
        <AppContext.Provider value={{ openAddRoom, setOpenAddRoom, userId, setUserId }}>
            {children}
        </AppContext.Provider>
    )
}