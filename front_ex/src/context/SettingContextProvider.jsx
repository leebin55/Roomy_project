import React, { createContext, useContext } from "react";

const AppContext = createContext();
export const useSettingContext = () => useContext(AppContext);

function SettingContextProvider({ children }) {
  const settingList = [
    { id: 1, title: "임시완", link: "/room/setting/temp1" },
    { id: 2, title: "임시 2 ", link: "/room/setting/temp2" },
    { id: 3, title: "임시 3 ", link: "/room/setting/temp3" },
    { id: 4, title: "임시 4 ", link: "/room/setting/temp4" },
    { id: 5, title: "임진왜란", link: "/room/setting/temp5" },
  ];
  const settingProps = {
    settingList,
  };

  return (
    <AppContext.Provider value={settingProps}>{children}</AppContext.Provider>
  );
}

export default SettingContextProvider;
