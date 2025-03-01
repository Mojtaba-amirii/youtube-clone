"use client";

import { FC, useContext } from "react";

import Avatar from "@/components/shared/Avatar";
import { useComment } from "@/hooks/useComment";
import Button from "@/components/shared/Button";
import { CurrentChannelContext } from "@/context/CurrentChannelContext";

interface CommentInputProps {
  videoId: string;
}

export const CommentInput: FC<CommentInputProps> = ({ videoId }) => {
  const currentChannel = useContext(CurrentChannelContext);
  const { text, setText, submitComment } = useComment({ videoId });

  return (
    <div className=" flex items-start gap-2">
      <Avatar imageSrc={currentChannel?.imageSrc || null} />
      <div className=" flex flex-col w-full">
        <input
          type="text"
          title="user-comment"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className=" bg-transparent outline-hidden border-b border-b-neutral-400 focus:border-b-2 focus:border-b-neutral-200 pb-1"
        />
        {text && (
          <div className=" flex justify-end gap-4 mt-2">
            <Button type="secondary" onClick={() => setText("")}>
              Cancel
            </Button>
            <Button type="primary" onClick={submitComment}>
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
