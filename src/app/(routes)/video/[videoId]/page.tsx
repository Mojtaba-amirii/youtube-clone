import getChannelById from "@/actions/getChannelById";
import VideoCard from "@/components/shared/VideoCard";
import Description from "@/components/video/Description";
import VideoPlayer from "@/components/video/VideoPlayer";
import getCommentsByVideoId from "@/actions/getCommentsByVideoId";
import { getRecommendedVideos } from "@/actions/getRecommendedVideos";
import increaseVideoViewCount from "@/actions/increaseVideoViewCount";
import CommentSection from "@/components/video/CommentSection/CommentSection";
import LikeSubscribeSection from "@/components/video/likeSubscribeSection/LikeSubscribeSection";

interface VideoPageParams {
  videoId?: string;
}

export default async function VideoPage({
  params,
}: {
  params: Promise<VideoPageParams>;
}) {
  const { videoId } = await params;
  const video = await increaseVideoViewCount({ videoId });
  const channel = await getChannelById({ channelId: video?.channelId });
  const comments = await getCommentsByVideoId({ videoId });
  const recommendedVideos = await getRecommendedVideos({ video });

  return video && channel && comments ? (
    <div className=" flex flex-col lg:flex-row mx-6 mt-2 gap-4">
      <div className=" w-full lg:w-3/4 flex flex-col gap-4">
        <VideoPlayer videoSrc={video.videoSrc} />
        <h1 className=" text-2xl font-medium break-all">{video.title}</h1>
        <LikeSubscribeSection video={video} channel={channel} />
        <Description video={video} />
        <CommentSection comments={comments} videoId={video.id} />
      </div>

      <div className="flex flex-col w-full lg:w-1/4 gap-4 pb-4">
        {recommendedVideos &&
          recommendedVideos.map((recommendedVideo) => {
            return (
              <VideoCard
                key={recommendedVideo.id}
                isVertical={false}
                video={recommendedVideo}
                channel={recommendedVideo.channel}
                channelAvatar
              />
            );
          })}
      </div>
    </div>
  ) : (
    <h1>Video not found</h1>
  );
}
