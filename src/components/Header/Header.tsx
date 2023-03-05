import { NavLink } from "react-router-dom";
import logo from "../../images/logo192.png";
import { ThemeChangeButton } from "../ThemeChangeButton/ThemeChangeButton";

export const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <div>
        <NavLink to="/">
          <img src={logo} alt="logo" className="w-8 h-8" />
        </NavLink>
      </div>
      <div>
        <ThemeChangeButton />
      </div>
    </header>
  );
};
