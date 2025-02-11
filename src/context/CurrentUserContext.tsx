"use client";

import { User } from "@prisma/client";
import { createContext, FC, PropsWithChildren } from "react";

export const CurrentUserContext = createContext<User | null>(null);

interface CurrentUserProviderProps {
  user: User | null;
}

const CurrentUserProvider: FC<PropsWithChildren<CurrentUserProviderProps>> = ({
  user,
  children,
}) => {
  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
