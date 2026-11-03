import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ErrorPage } from "../pages/ErrorPage";
import { AppLayout } from "../components/Layout/AppLayout";

const load = (importer, name) =>
  lazy(() => importer().then((m) => ({ default: m[name] })));

const Home = load(() => import("../pages/Home"), "Home");
const Login = load(() => import("../pages/Login"), "Login");
const Register = load(() => import("../pages/Register"), "Register");
const Account = load(() => import("../pages/Account"), "Account");
const Compress = load(() => import("../pages/Compress"), "Compress");
const Convert = load(() => import("../pages/Convert"), "Convert");
const History = load(() => import("../pages/History"), "History");

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "account", element: <Account /> },
      { path: "compress", element: <Compress /> },
      { path: "convert", element: <Convert /> },
      { path: "history", element: <History /> },
    ],
  },
]);

export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </>
  );
};