import getCurrentChannel from "@/actions/getCurrentChannel";
import getVideosByChannelId from "@/actions/getVideosByChannelId";
import AnalyticsSummery from "@/components/studio/AnalyticsSummery";
import VideoDetailsCard from "@/components/studio/VideoDetailsCard";

export default async function StudioPage() {
  const currentChannel = await getCurrentChannel();
  const videos = await getVideosByChannelId({ channelId: currentChannel?.id });

  return (
    <div className=" w-full h-full flex flex-col p-8">
      <AnalyticsSummery videos={videos} />
      <div className=" flex flex-col gap-4 mt-8">
        <h2 className=" text-2xl">Videos</h2>
        {videos.length
          ? videos.map((video) => {
              return <VideoDetailsCard key={video.id} video={video} />;
            })
          : "Upload a video to get started"}
      </div>
    </div>
  );
}
