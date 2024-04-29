import { useState, useEffect, useRef } from "react";

export default function useComponentVisible(open) {
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(prevState => prevState ? !prevState : false);
    }
  };

  useEffect(() => {
    if (!open) return;
    document.addEventListener("click", handleClickOutside, !isComponentVisible);

    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside,
        !isComponentVisible
      );
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}