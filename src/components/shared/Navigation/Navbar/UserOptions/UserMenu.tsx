import { FC } from "react";
import { PiUserSquareFill, PiYoutubeLogo, PiSignOut } from "react-icons/pi";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  onClose: () => void;
}

const UserMenu: FC<UserMenuProps> = ({ onClose }) => {
  return (
    <>
      <div className=" h-screen w-screen fixed z-30" onClick={onClose}></div>
      <div className=" absolute rounded-md shadow-md w-72 bg-zinc-800 right-2 top-16 text-sm flex flex-col overflow-hidden z-40">
        <MenuItem
          label="Your Channel"
          logo={<PiUserSquareFill className=" w-7 h-7 mr-3" />}
        />
        <MenuItem
          label="Youtube Studio"
          logo={<PiYoutubeLogo className=" w-7 h-7 mr-3" />}
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
