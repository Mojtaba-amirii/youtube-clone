"use client";

import { MdMenu } from "react-icons/md";
import { useContext } from "react";

import Logo from "../Logo";
import IconButton from "../IconButton";
import { SidebarContext } from "@/context/SidebarContext";

const NavigationHeader = () => {
  const sidebar = useContext(SidebarContext);

  return (
    <div className="flex flex-row items-center">
      <IconButton
        onClick={() =>
          sidebar?.isOpen ? sidebar.onClose() : sidebar?.onOpen()
        }
      >
        <MdMenu className=" h-6 w-6" />
      </IconButton>
      <Logo />
    </div>
  );
};

export default NavigationHeader;
