import { useState, useCallback } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [payload, setPayload] = useState(null);

  const open = useCallback((data = null) => {
    setPayload(data);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, payload, open, close };
};