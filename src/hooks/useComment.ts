import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useState } from "react";

import { CurrentChannelContext } from "@/context/CurrentChannelContext";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import { CreateChannelModalContext } from "@/context/CreateChannelModalContext";

interface UseCommentProps {
  videoId?: string | null;
}

export const useComment = ({ videoId }: UseCommentProps) => {
  const currentChannel = useContext(CurrentChannelContext);
  const currentUser = useContext(CurrentUserContext);
  const createChannelModal = useContext(CreateChannelModalContext);
  const router = useRouter();
  const [text, setText] = useState("");

  const submitComment = useCallback(async () => {
    if (!currentUser) {
      alert("Please sign in to comment!");
      return;
    }
    if (!currentChannel) {
      createChannelModal?.onOpen();
      return;
    }
    if (!videoId) {
      return;
    }

    const data = { text, videoId, channelId: currentChannel.id };

    try {
      if (text.trim()) {
        await axios
          .post(`/api/comments/${videoId}`, data)
          .then(() => setText(""));
      }
      router.refresh();
      toast.success("Comment been added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit comment");
    }
  }, [
    currentUser,
    currentChannel,
    createChannelModal,
    videoId,
    text,
    router,
    setText,
  ]);

  return {
    text,
    setText,
    submitComment,
  };
};
