import { Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/LoginPage";
import QueuePage from "../pages/QueuePage";
import CreateTicketPage from "../pages/CreateTicketPage";
import DesktopPage from "../pages/DesktopPage";

const getRoutes = () => [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/queue",
        element: <QueuePage />,
      },
      {
        path: "/create-ticket",
        element: <CreateTicketPage />,
      },
      {
        path: "/desktop",
        element: <DesktopPage />,
      },
      {
        path: "*",
        element: <Navigate to="/login" />,
      },
    ],
  },
];

export default getRoutes;
