import { useState, useContext } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { Collapse } from "../Animations";

interface NavDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  children: React.ReactNode;
  hideArrow?: boolean;
}

interface NavDropdownType extends React.FC<NavDropdownProps> {
  Item: React.FC<NavItemProps>;
}

interface NavItemProps {
  href: string;
  label: React.ReactNode;
}

export const NavDropdown: NavDropdownType = ({
  label,
  children,
  hideArrow,
  ...props
}) => {
  let timeout: string | number | NodeJS.Timeout | undefined;
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;

  const handleMouseLeave = () => {
    timeout = setTimeout(() => {
      setIsOpen(false);
    }, 600); // Set the delay time in milliseconds
  };

  const handleMouseEnter = () => {
    clearTimeout(timeout);
  };

  return (
    <div
      className="relative"
      onMouseLeave={() => handleMouseLeave()}
      onMouseEnter={() => handleMouseEnter()}
      {...props}
    >
      <button
        className={classNames(
          "inline-flex h-full items-center justify-center w-full focus:outline-none",
          {
            "text-light-font-primary": !isDarkMode,
            "text-dark-font-primary": isDarkMode,
          }
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl">{label}</span>
        {!hideArrow && (
          <svg
            className="w-5 h-5 ml-1 -mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M10 14l6-6H4z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      <div
        className={classNames(
          "absolute z-10 w-40 cursor-pointer select-none mt-2 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-black ring-opacity-5 focus:outline-none",
          {
            "bg-light-secondary": !isDarkMode,
            "bg-dark-secondary": isDarkMode,
          }
        )}
      >
        <Collapse show={isOpen}>
          <div className="py-1">{children}</div>
        </Collapse>
      </div>
    </div>
  );
};

const NavDropdownItem: React.FC<NavItemProps> = ({ href, label }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        classNames(
          "block px-4 py-2 text-sm  hover:bg-gray-100 hover:text-gray-900",
          {
            "text-light-font-primary": !isDarkMode && !isActive,
            "text-dark-font-primary": isDarkMode && !isActive,
            "bg-gray-100 text-gray-900 pointer-events-none": isActive,
          }
        )
      }
    >
      {label}
    </NavLink>
  );
};

NavDropdown.Item = NavDropdownItem;
