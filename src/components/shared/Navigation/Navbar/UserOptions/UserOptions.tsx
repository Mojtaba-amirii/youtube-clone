"use client";

import { useContext, useState } from "react";
import { MdOutlineVideoCall } from "react-icons/md";

import SignInButton from "./SignInButton";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import IconButton from "@/components/shared/IconButton";
import Avatar, { AvatarSize } from "@/components/shared/Avatar";
import UserMenu from "./UserMenu";

const UserOptions = () => {
  const currentUser = useContext(CurrentUserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return currentUser ? (
    <>
      <div className="flex items-center space-x-4">
        <IconButton>
          <MdOutlineVideoCall className=" h-7 w-7" />
        </IconButton>
        <Avatar
          size={AvatarSize.Small}
          imageSrc={currentUser.image}
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>
      {menuOpen ? <UserMenu onClose={() => setMenuOpen(false)} /> : undefined}
    </>
  ) : (
    <SignInButton />
  );
};

export default UserOptions;
