import { useState, useEffect } from "react";

const getRows = () => (window.matchMedia("(min-width: 768px)").matches ? 2 : 1);

export const useBooksPerPage = (listRef) => {
  const [limit, setLimit] = useState(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const updateLimit = () => {
      const columns =
        getComputedStyle(list).gridTemplateColumns.split(" ").length;
      setLimit(columns * getRows());
    };

    const observer = new ResizeObserver(updateLimit);
    observer.observe(list);

    return () => observer.disconnect();
  }, [listRef]);

  return limit;
};
