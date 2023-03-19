import React, { useContext, useEffect } from "react";
import classNames from "classnames";
import { ThemeContext } from "../../context/Theme/ThemeContext";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  tab?: "login" | "signup";
  handleTab: (tab: "login" | "signup") => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  tab = "signup",
  handleTab,
}) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  const closeModal = () => {
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {/* Background overlay */}
      <div
        className={classNames(
          `fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 transition-opacity duration-300`,
          {
            "pointer-events-auto opacity-100": isOpen,
            "pointer-events-none opacity-0": !isOpen,
          }
        )}
        onClick={closeModal}
      />

      {/* Modal content */}
      <div
        className={classNames(
          `w-full max-w-[400px] md:max-w-[540px] fixed left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-lg shadow-lg py-[56px] px-[48px] transition-opacity duration-300`,
          {
            "pointer-events-auto opacity-100": isOpen,
            "pointer-events-none opacity-0": !isOpen,
            "bg-dark-secondary": isDarkMode,
            "bg-white": !isDarkMode,
            "top-1/2 md:top-[40%]": tab === "login",
            "top-1/2": tab === "signup",
          }
        )}
      >
        {tab === "signup" ? (
          <SignupForm closeModal={closeModal} handleTab={handleTab} />
        ) : (
          <LoginForm closeModal={closeModal} handleTab={handleTab} />
        )}
      </div>
    </>
  );
};

export default Modal;
