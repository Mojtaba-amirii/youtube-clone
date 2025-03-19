import getChannelById from "@/actions/getChannelById";
import getVideosByChannelId from "@/actions/getVideosByChannelId";
import ChannelHeader from "@/components/channel/ChannelHeader";
import VideoCard from "@/components/shared/VideoCard";

interface ChannelPageParams {
  channelId?: string;
}

export default async function ChannelPage({
  params,
}: {
  params: Promise<ChannelPageParams>;
}) {
  const { channelId } = await params;

  const channel = await getChannelById({ channelId });
  const videos = await getVideosByChannelId({ channelId });

  return channel ? (
    <div className="flex flex-col">
      <ChannelHeader channel={channel} videoCount={videos.length} />
      <div className="border-b-2 border-neutral-800 capitalize">
        <div className="border-b-2 border-b-neutral-400 text-center w-24 md:mx-32 mx-auto px-6 py-2">
          Videos
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-3 mx-auto py-8 sm:grid-cols-2 sm:mx-24 xl:grid-cols-5">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  ) : (
    <h1>Channel not found</h1>
  );
}
