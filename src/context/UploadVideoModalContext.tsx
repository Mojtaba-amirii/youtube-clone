"use client";

import { createContext, FC, PropsWithChildren, useState } from "react";

type ModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const UploadVideoModalContext = createContext<ModalState | null>(null);

const UploadVideoModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <UploadVideoModalContext.Provider
      value={{
        isOpen,
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false),
      }}
    >
      {children}
    </UploadVideoModalContext.Provider>
  );
};

export default UploadVideoModalProvider;
