import { createContext, useMemo, useState } from "react";

export const SidebarContext = createContext();

export const SidebarContextProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const valueObj = useMemo(
    () => ({
      isSidebarOpen,
      closeSidebar,
      openSidebar,
    }),
    [isSidebarOpen],
  );

  return (
    <SidebarContext.Provider value={valueObj}>
      {children}
    </SidebarContext.Provider>
  );
};
