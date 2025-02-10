"use client";

import { MdMenu } from "react-icons/md";
import IconButton from "../IconButton";

const NavigationHeader = () => {
  return (
    <div className="flex flex-row items-center">
      <IconButton>
        <MdMenu className=" h-6 w-6" />
      </IconButton>
    </div>
  );
};

export default NavigationHeader;
