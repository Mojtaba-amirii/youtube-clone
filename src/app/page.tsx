import VideoCard from "@/components/shared/VideoCard";
import getTrendingVideos from "@/actions/getTrendingVideos";

export default async function Home() {
  const trendingVideos = await getTrendingVideos();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mx-12 py-8 sm:grid-cols-2 sm:mx-24 xl:grid-cols-4">
      {trendingVideos
        ? trendingVideos.map((trendingVideo) => {
            return (
              <VideoCard
                key={trendingVideo.id}
                video={trendingVideo}
                channel={trendingVideo.channel}
                channelAvatar
              />
            );
          })
        : "No videos found"}
    </div>
  );
}
