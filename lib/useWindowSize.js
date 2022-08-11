import { useState, useEffect } from "react";

// Hook
const useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize

      function handleSize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      // Add event listener
      window.addEventListener("resize", handleSize);

      // Call handler right away so state gets updated with inital window
      handleSize();
      // Remove event listener on cleanup

      return () => window.removeEventListener("resize", handleSize);
    }
  }, []);
  return windowSize;
};

export default useWindowSize;
