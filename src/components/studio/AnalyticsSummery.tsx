"use client";

import { Video } from "@prisma/client";
import { FC, useContext, useMemo } from "react";

import Avatar, { AvatarSize } from "../shared/Avatar";
import { compactNumberFormatter } from "@/utils/numUtils";
import AnalyticsSummeryItem from "./AnalyticsSummeryItem";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { CurrentChannelContext } from "@/context/CurrentChannelContext";

interface AnalyticsSummeryProps {
  videos: Video[];
}

const AnalyticsSummery: FC<AnalyticsSummeryProps> = ({ videos }) => {
  useProtectedRoute();
  const currentChannel = useContext(CurrentChannelContext);
  const viewsCount = useMemo(
    () =>
      videos?.reduce((totalViews, video) => totalViews + video.viewCount, 0),
    [videos],
  );

  return (
    <div className=" flex items-center mx-auto gap-4">
      <Avatar
        imageSrc={currentChannel?.imageSrc}
        size={AvatarSize.Large}
        className=" hidden md:inline"
      />
      <div className=" grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsSummeryItem
          value={currentChannel?.name}
          subtitle={`@${currentChannel?.handle}`}
        />
        <AnalyticsSummeryItem
          value={compactNumberFormatter(currentChannel?.subscriberCount ?? 0)}
          subtitle="Subscribers"
        />
        <AnalyticsSummeryItem
          value={compactNumberFormatter(viewsCount)}
          subtitle="Views"
        />
        <AnalyticsSummeryItem
          value={compactNumberFormatter(videos?.length)}
          subtitle="Videos"
        />
      </div>
    </div>
  );
};

export default AnalyticsSummery;
