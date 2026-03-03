import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div>
      <NavBar />
      <div style={{ paddingTop: 70 }}>
        <Outlet />
      </div>
    </div>
  );
}