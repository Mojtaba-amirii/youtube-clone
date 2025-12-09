"use client";

import dayjs from "@/vendor/dayjs";
import Avatar from "@/components/shared/Avatar";
import type { Channel, Comment } from "@prisma/client";

import { FC } from "react";

interface CommentProps {
  comment: Comment & { channel: Channel };
}

const Comment: FC<CommentProps> = ({ comment }) => {
  return (
    <div key={comment.id} className=" flex items-start gap-2">
      <Avatar imageSrc={comment.channel.imageSrc} />
      <div className=" flex flex-col gap-1">
        <div className=" flex items-center gap-2 text-sm">
          <p className=" font-medium">@{comment.channel.handle}</p>
          <p className=" font-light text-neutral-400">
            {dayjs(comment.createdAt).fromNow()}
          </p>
        </div>
        <p>{comment.text}</p>
      </div>
    </div>
  );
};

export default Comment;
