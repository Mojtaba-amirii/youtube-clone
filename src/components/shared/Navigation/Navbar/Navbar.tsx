import Search from "../../../search/Search";
import NavigationHeader from "../NavigationHeader";
import UserOptions from "./UserOptions/UserOptions";

const Navbar = () => {
  return (
    <nav className=" fixed w-full bg-stone-950 z-20 h-16 px-2 flex flex-row justify-between items-center">
      <NavigationHeader />
      <Search />
      <UserOptions />
    </nav>
  );
};

export default Navbar;
