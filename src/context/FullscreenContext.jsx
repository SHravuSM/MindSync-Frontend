import { createContext, useState, useEffect, useCallback } from "react";

export const FullscreenContext = createContext();

export const FullscreenProvider = ({ children }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sync internal state when native fullscreen changes
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

  const enterFullscreen = useCallback((element = document.documentElement) => {
    try {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    } catch (_) {
      // silently ignore (likely blocked by browser gesture policy)
    }
  }, []);

  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }, []);

  // Public helpers to enable/disable persistent auto-fullscreen.
  const enableAutoFullscreen = useCallback(() => {
    localStorage.setItem("auto_fullscreen", "true");
    if (!document.fullscreenElement) {
      enterFullscreen();
    }
  }, [enterFullscreen]);

  const disableAutoFullscreen = useCallback(() => {
    localStorage.removeItem("auto_fullscreen");
  }, []);

  // On mount, if user opted-in previously, attempt fullscreen.
  useEffect(() => {
    if (localStorage.getItem("auto_fullscreen") === "true" && !document.fullscreenElement) {
      // Attempt immediately; if browser blocks, it will be retried on first user interaction.
      enterFullscreen();
      // Set up one-time first interaction trigger as fallback
      const trigger = () => {
        if (!document.fullscreenElement) enterFullscreen();
        cleanup();
      };
      const cleanup = () => {
        window.removeEventListener("click", trigger);
        window.removeEventListener("keydown", trigger);
        window.removeEventListener("touchstart", trigger);
      };
      window.addEventListener("click", trigger);
      window.addEventListener("keydown", trigger);
      window.addEventListener("touchstart", trigger);
      return cleanup;
    }
  }, [enterFullscreen]);

  return (
    <FullscreenContext.Provider
      value={{
        isFullscreen,
        enterFullscreen,
        exitFullscreen,
        enableAutoFullscreen,
        disableAutoFullscreen
      }}
    >
      {children}
    </FullscreenContext.Provider>
  );
};
