import { useState, useEffect } from "react";

const getLimit = () => {
  if (window.matchMedia("(min-width: 1280px)").matches) return 10;
  if (window.matchMedia("(min-width: 768px)").matches) return 8;
  return 2;
};

export const useBooksPerPage = () => {
  const [limit, setLimit] = useState(getLimit);

  useEffect(() => {
    const handleResize = () => setLimit(getLimit());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return limit;
};