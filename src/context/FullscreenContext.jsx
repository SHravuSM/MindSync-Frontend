import { createContext, useState, useEffect } from "react";

export const FullscreenContext = createContext();

export const FullscreenProvider = ({ children }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function onChange() {
      const fsElement =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;
      setIsFullscreen(!!fsElement);
    }

    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    document.addEventListener("MSFullscreenChange", onChange);

    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
      document.removeEventListener("MSFullscreenChange", onChange);
    };
  }, []);

  const enterFullscreen = (element = document.documentElement) => {
    if (element.requestFullscreen) {
      console.log('hi1')
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      console.log('hi2')
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      console.log('hi3')
      element.msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  return (
    <FullscreenContext.Provider
      value={{ isFullscreen, enterFullscreen, exitFullscreen }}
    >
      {children}
    </FullscreenContext.Provider>
  );
};
