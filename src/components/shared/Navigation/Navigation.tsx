import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import getCurrentSubscriptions from "@/actions/getCurrentSubscriptions";

const Navigation = async () => {
  const subscriptions = await getCurrentSubscriptions();

  return (
    <header>
      <Sidebar subscribedChannels={subscriptions} />
      <Navbar />
    </header>
  );
};

export default Navigation;
