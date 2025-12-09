"use client";

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { MdOutlineVideoCall } from "react-icons/md";

import UserMenu from "./UserMenu";
import SignInButton from "./SignInButton";
import IconButton from "@/components/shared/IconButton";
import Avatar, { AvatarSize } from "@/components/shared/Avatar";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import { CurrentChannelContext } from "@/context/CurrentChannelContext";
import { CreateChannelModalContext } from "@/context/CreateChannelModalContext";

const UserOptions = () => {
  const currentUser = useContext(CurrentUserContext);
  const currentChannel = useContext(CurrentChannelContext);
  const createChannelModal = useContext(CreateChannelModalContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleUploadVideo = () => {
    if (!currentChannel) {
      createChannelModal?.onOpen();
    } else {
      router.push("/studio/upload");
    }
  };

  return currentUser ? (
    <>
      <div className="flex items-center space-x-4">
        <IconButton onClick={handleUploadVideo}>
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
