import classNames from "classnames";

type PageType = "Trending" | "Top Rated" | "Upcoming";

interface Props {
  isDarkMode: boolean;
  pageType: PageType;
  handlePageType: (pageType: PageType) => void;
  label: PageType;
}

export const TypeButton = ({
  isDarkMode,
  pageType,
  handlePageType,
  label,
}: Props) => {
  const disabled = pageType === label;

  return (
    <button
      disabled={disabled}
      onClick={() => handlePageType(label)}
      className={classNames("px-4 py-2 transition duration-500 ease-in-out", {
        "bg-dark-secondary": isDarkMode && disabled,
        "bg-light-secondary": !isDarkMode && disabled,
      })}
    >
      {label}
    </button>
  );
};
