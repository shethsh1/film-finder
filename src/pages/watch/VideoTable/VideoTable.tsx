import classNames from "classnames";
import { useContext } from "react";
import { ThemeContext } from "../../../context/Theme/ThemeContext";

interface VideoTableProps {
  videos: { name: string }[];
  handleActiveVideo: (idx: number) => void;
  activeVideo: number;
}

export const VideoTable: React.FC<VideoTableProps> = ({
  videos,
  handleActiveVideo,
  activeVideo,
}) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";
  return (
    <div
      className={classNames("overflow-auto max-h-[476px] mt-12", {
        "text-dark-font-primary": isDarkMode,
        "text-light-font-primary": !isDarkMode,
      })}
    >
      {videos.map((video, idx) => (
        <div
          key={idx}
          onClick={() => handleActiveVideo(idx)}
          className={classNames("flex p-4 gap-4 select-none cursor-pointer", {
            "bg-dark-secondary hover:bg-dark-hover":
              isDarkMode && activeVideo !== idx,
            "bg-light-secondary hover:bg-light-hover":
              !isDarkMode && activeVideo !== idx,
            "bg-dark-hover": activeVideo === idx && isDarkMode,
            "bg-light-hover": activeVideo === idx && !isDarkMode,
          })}
        >
          <span className="font-bold">{idx + 1}</span>
          <span className="flex-1">{video.name}</span>
        </div>
      ))}
    </div>
  );
};
