import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../Header";
import { Footer } from "../Footer";
import "./Layout.css";

const HIDE_CHROME = ["/login", "/register", "/account"];

export const AppLayout = () => {
  const { pathname } = useLocation();
  const hideChrome = HIDE_CHROME.includes(pathname);

  return (
    <div className="app-shell">
      {!hideChrome && <Header />}
      <main className="app-main">
        <Outlet />
      </main>
      {!hideChrome && <Footer />}
    </div>
  );
};