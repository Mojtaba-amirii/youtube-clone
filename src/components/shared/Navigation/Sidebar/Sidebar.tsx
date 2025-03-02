"use client";

import { FC, useContext } from "react";
import { Channel } from "@prisma/client";
import { useRouter } from "next/navigation";
import { MdOutlineHome, MdOutlineSubscriptions } from "react-icons/md";

import Avatar, { AvatarSize } from "../../Avatar";
import NavigationHeader from "../NavigationHeader";
import MenuItem from "../Navbar/UserOptions/MenuItem";
import { SidebarContext } from "@/context/SidebarContext";
import { CurrentChannelContext } from "@/context/CurrentChannelContext";

interface SidebarProps {
  subscribedChannels: Channel[];
}

const Sidebar: FC<SidebarProps> = ({ subscribedChannels }) => {
  const sidebar = useContext(SidebarContext);
  const router = useRouter();
  const currentUser = useContext(CurrentChannelContext);

  const handleItemClick = (onClick: () => void) => {
    onClick();
    sidebar?.onClose();
  };

  return (
    <>
      {sidebar?.isOpen && (
        <div
          className=" w-screen h-screen bg-black/50 fixed z-30"
          onClick={() => sidebar.onClose()}
        />
      )}
      <aside
        className={` fixed w-64 bg-stone-950 z-40 mt-2 px-6 flex flex-col h-screen overflow-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
          sidebar?.isOpen ? " translate-x-0" : " -translate-x-full"
        } ease-in-out duration-300`}
      >
        <NavigationHeader />
        <div className=" pt-6 pb-3 border-b border-b-neutral-700">
          <MenuItem
            label="Home"
            round
            logo={<MdOutlineHome className=" w-6 h-6 mr-4" />}
            onClick={() => handleItemClick(() => router.push("/"))}
          />
          {currentUser && (
            <MenuItem
              label="Subscriptions"
              logo={<MdOutlineSubscriptions className=" w-6 h-6 mr-4" />}
              round
              onClick={() =>
                handleItemClick(() => router.push("/subscriptions"))
              }
            />
          )}
        </div>
        {currentUser && (
          <div className=" mt-3">
            <h2 className=" font-medium mb-2">Subscriptions</h2>
            {subscribedChannels.map((channel) => (
              <MenuItem
                key={channel.id}
                label={channel.name}
                logo={
                  <Avatar
                    imageSrc={channel.imageSrc}
                    size={AvatarSize.Small}
                    className=" mr-2"
                  />
                }
                round
                onClick={() =>
                  handleItemClick(() => router.push(`/channel/${channel.id}`))
                }
              />
            ))}
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
