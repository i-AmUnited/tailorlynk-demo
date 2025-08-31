import { useEffect } from "react";

const Title = ({ title, children }) => {
  useEffect(() => {
    document.title = title ? `${title} | TailorLynk` : "TailorLynk";
  }, [title]);

  return children;
};

export default Title;
