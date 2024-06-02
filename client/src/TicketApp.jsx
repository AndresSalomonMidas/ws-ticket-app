import { RouterProvider } from "react-router-dom";
import getRouter from "./routes/router";
import { SocketProvider } from "./context/SocketContext";
import { SidebarContextProvider } from "./context/SidebarContext";

const TicketApp = () => {
  return (
    <SocketProvider>
      <SidebarContextProvider>
        <RouterProvider router={getRouter()} />
      </SidebarContextProvider>
    </SocketProvider>
  );
};

export default TicketApp;
