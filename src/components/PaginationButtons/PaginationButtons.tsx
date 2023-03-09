import classNames from "classnames";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/Theme/ThemeContext";

interface PaginationTooltipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  page: number;
  handlePageChange: (page: number) => void;
}

export const PaginationButtons: React.FC<PaginationTooltipProps> = ({
  page,
  handlePageChange,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark" ? true : false;

  return (
    <div
      className={classNames(
        "mt-8 flex gap-4 sm:flex-row flex-col justify-center md:justify-start items-center ",
        {
          "text-dark-font-primary": isDarkMode,
          "text-light-font-primary": !isDarkMode,
        }
      )}
    >
      <div>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          {...props}
          className={classNames(
            "py-2 px-4 rounded-md transition duration-500 ease-in-out w-36",
            {
              "bg-dark-secondary": isDarkMode,
              "bg-light-secondary": !isDarkMode,
              "hover:bg-gray-600": page !== 1,
              "bg-gray-600": page === 1,
            }
          )}
        >
          Previous Page
        </button>
      </div>

      <div>
        <button
          onClick={() => handlePageChange(page + 1)}
          {...props}
          className={classNames(
            "py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300 ease-in-out w-36",
            {
              "bg-dark-secondary": isDarkMode,
              "bg-light-secondary": !isDarkMode,
            }
          )}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};
