"use client";

import { createContext, FC, PropsWithChildren, useState } from "react";

type SidebarState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const SidebarContext = createContext<SidebarState | null>(null);

const SidebarContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContextProvider;
