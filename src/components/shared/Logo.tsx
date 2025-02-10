import Link from "next/link";
import { IoLogoYoutube } from "react-icons/io";

const Logo = () => {
  return (
    <Link
      href="/"
      title="YouTube-logo"
      className="cursor-pointer mx-4 hidden sm:flex flex-row items-center justify-center"
    >
      <IoLogoYoutube color="red" className=" h-6 w-6" />
      <h1 className="text-2xl font-semibold ml-0.5 tracking-tighter">
        YouTube
      </h1>
    </Link>
  );
};

export default Logo;
