import { createContext, useContext } from "react";

 const AppContext = createContext(undefined);
 const useAppContext = () => useContext(AppContext);

export {AppContext, useAppContext}