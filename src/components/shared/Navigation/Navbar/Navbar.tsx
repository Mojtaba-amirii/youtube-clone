import NavigationHeader from "../NavigationHeader";

const Navbar = () => {
  return (
    <nav className=" fixed w-full bg-stone-950 z-20 h-16 px-2 flex flex-row justify-between items-center">
      <NavigationHeader />
    </nav>
  );
};

export default Navbar;
