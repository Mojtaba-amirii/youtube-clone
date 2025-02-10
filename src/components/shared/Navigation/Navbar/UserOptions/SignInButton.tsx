import { MdOutlineAccountCircle } from "react-icons/md";

const SignInButton = () => {
  return (
    <button
      type="button"
      title="Signin"
      className="flex flex-row items-center gap-1 border border-slate-700 px-2 py-1 rounded-full overflow-hidden text-blue-400 cursor-pointer"
    >
      <MdOutlineAccountCircle className="w-6 h-6" />
      Sign In
    </button>
  );
};

export default SignInButton;
