"use client";

import { Channel } from "@prisma/client";
import { createContext, FC, PropsWithChildren } from "react";

export const CurrentChannelContext = createContext<Channel | null>(null);

interface CurrentChannelProviderProps {
  channel: Channel | null;
}

const CurrentChannelProvider: FC<
  PropsWithChildren<CurrentChannelProviderProps>
> = ({ channel, children }) => {
  return (
    <CurrentChannelContext.Provider value={channel}>
      {children}
    </CurrentChannelContext.Provider>
  );
};

export default CurrentChannelProvider;
