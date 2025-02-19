import { useCallback, useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

import { CurrentUserContext } from "@/context/CurrentUserContext";

interface UseSubscribeProps {
  channelId: string;
}

const useSubscribe = ({ channelId }: UseSubscribeProps) => {
  const currentUser = useContext(CurrentUserContext);
  const router = useRouter();

  const hasSubscribed = useMemo(() => {
    if (!currentUser) return false;
    const subscriptions = currentUser.subscribedChannelIds || [];
    return subscriptions.includes(channelId);
  }, [currentUser, channelId]);

  const toggleSubscribed = useCallback(async () => {
    if (!currentUser) {
      toast.error("You need to be logged in to subscribe to a channel");
      router.push("/");
      return;
    }

    try {
      if (hasSubscribed) {
        await axios.delete("/api/users/subscriptions", {
          data: { channelId },
        });
      } else {
        await axios.post("/api/users/subscriptions", { channelId });
      }
      router.refresh();
      toast.success(
        hasSubscribed ? "Successfully unsubscribed" : "Successfully subscribed"
      );
    } catch (error) {
      toast.error(
        hasSubscribed ? "Failed to unsubscribe" : "Failed to subscribe"
      );
      throw new Error(String(error));
    }
  }, [currentUser, channelId, hasSubscribed, router]);

  return { hasSubscribed, toggleSubscribed };
};

export default useSubscribe;
