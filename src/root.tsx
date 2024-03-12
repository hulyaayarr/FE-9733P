import NavbarComponent from "./Components/layouts/Navbar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div
      style={{
        backgroundColor: "#F1F3FA",
      }}
    >
      <NavbarComponent />
      <Outlet />
    </div>
  );
};

export default Root;
