import { FC, useContext } from "react";
import { PiUserSquareFill, PiYoutubeLogo, PiSignOut } from "react-icons/pi";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import MenuItem from "./MenuItem";
import { CreateChannelModalContext } from "@/context/CreateChannelModalContext";
import { CurrentChannelContext } from "@/context/CurrentChannelContext";

interface UserMenuProps {
  onClose: () => void;
}

const UserMenu: FC<UserMenuProps> = ({ onClose }) => {
  const createChannelModal = useContext(CreateChannelModalContext);
  const currentChannel = useContext(CurrentChannelContext);
  const router = useRouter();

  return (
    <>
      <div className=" h-screen w-screen fixed z-30" onClick={onClose}></div>
      <div className=" absolute rounded-md shadow-md w-72 bg-zinc-800 right-2 top-16 text-sm flex flex-col overflow-hidden z-40">
        <MenuItem
          label="Your Channel"
          logo={<PiUserSquareFill className=" w-7 h-7 mr-3" />}
          onClick={() => {
            if (!currentChannel) {
              createChannelModal?.onOpen();
            } else {
              router.push(`/channel/${currentChannel.id}`);
            }
            onClose();
          }}
        />
        <MenuItem
          label="Youtube Studio"
          logo={<PiYoutubeLogo className=" w-7 h-7 mr-3" />}
          onClick={() => {
            if (!currentChannel) {
              createChannelModal?.onOpen();
            } else {
              router.push(`/studio`);
            }
            onClose();
          }}
        />
        <MenuItem
          label="Sign out"
          logo={<PiSignOut className=" w-7 h-7 mr-3" />}
          onClick={() => {
            signOut();
            onClose();
          }}
        />
      </div>
    </>
  );
};

export default UserMenu;
