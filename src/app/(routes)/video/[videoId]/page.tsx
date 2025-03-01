import getChannelById from "@/actions/getChannelById";
import Description from "@/components/video/Description";
import VideoPlayer from "@/components/video/VideoPlayer";
import getCommentsByVideoId from "@/actions/getCommentsByVideoId";
import increaseVideoViewCount from "@/actions/increaseVideoViewCount";
import LikeSubscribeSection from "@/components/video/LikeSubscribeSection/LikeSubscribeSection";
import CommentSection from "@/components/video/CommentSection/CommentSection";

interface VideoPageParams {
  videoId?: string;
}

export default async function VideoPage({
  params,
}: {
  params: VideoPageParams;
}) {
  const { videoId } = await params;
  const video = await increaseVideoViewCount({ videoId });
  const channel = await getChannelById({ channelId: video?.channelId });
  const comments = await getCommentsByVideoId({ videoId });

  return video && channel && comments ? (
    <div className=" flex flex-col lg:flex-row mx-6 mt-2 gap-4">
      <div className=" w-full lg:w-3/4 flex flex-col gap-4">
        <VideoPlayer videoSrc={video.videoSrc} />
        <h1 className=" text-2xl font-medium break-all">{video.title}</h1>
        <LikeSubscribeSection video={video} channel={channel} />
        <Description video={video} />
        <CommentSection comments={comments} videoId={video.id} />
      </div>
      <div className="flex flex-col w-full lg:w-1/4 gap-4 pb-4"></div>
    </div>
  ) : (
    <h1>Video not found</h1>
  );
}
