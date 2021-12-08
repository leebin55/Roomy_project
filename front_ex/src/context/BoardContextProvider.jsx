import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();
export const useBoardContext = () => useContext(AppContext);

function BoardContextProvider({ childern }) {
  const [updating, setUpdating] = useState();
  const Data = {
    updating,
  };
  return <AppContext.Provider value={Data}>{childern}</AppContext.Provider>;
}

export default BoardContextProvider;
