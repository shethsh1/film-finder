import { useState } from "react";

interface NavDropdownProps {
  title: string;
  children: React.ReactNode;
}

interface NavDropdownType extends React.FC<NavDropdownProps> {
  Item: React.FC<NavItemProps>;
}

interface NavItemProps {
  href: string;
  label: React.ReactNode;
}

export const NavDropdown: NavDropdownType = ({ title, children }) => {
  let timeout: string | number | NodeJS.Timeout | undefined;
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseLeave = () => {
    timeout = setTimeout(() => {
      setIsOpen(false);
    }, 800); // Set the delay time in milliseconds
  };

  const handleMouseEnter = () => {
    clearTimeout(timeout);
  };

  return (
    <div
      className="relative"
      onMouseLeave={() => handleMouseLeave()}
      onMouseEnter={() => handleMouseEnter()}
    >
      <button
        className="inline-flex items-center justify-center w-full text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-medium">{title}</span>
        <svg
          className="w-5 h-5 ml-2 -mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path fillRule="evenodd" d="M10 14l6-6H4z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-40 cursor-pointer select-none mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">{children}</div>
        </div>
      )}
    </div>
  );
};

const NavDropdownItem: React.FC<NavItemProps> = ({ href, label }) => {
  return (
    <a
      href={href}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    >
      {label}
    </a>
  );
};

NavDropdown.Item = NavDropdownItem;
