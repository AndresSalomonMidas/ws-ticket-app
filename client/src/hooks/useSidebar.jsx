import { useContext, useEffect } from "react";
import { SidebarContext } from "../context/SidebarContext";

export const useSidebar = (isSidebarOpen) => {
  const { closeSidebar, openSidebar } = useContext(SidebarContext);

  useEffect(() => {
    if (isSidebarOpen) {
      openSidebar();
    } else {
      closeSidebar();
    }
  }, [isSidebarOpen, closeSidebar, openSidebar]);
};
