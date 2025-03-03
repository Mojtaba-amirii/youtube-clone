import getSubscriptionVideos from "@/actions/getSubscriptionVideos";
import SubscriptionsList from "@/components/subscriptions/SubscriptionsList";

export default async function Subscriptions() {
  const subscriptionsVideos = await getSubscriptionVideos();

  return subscriptionsVideos.length ? (
    <SubscriptionsList videos={subscriptionsVideos} />
  ) : (
    "No Subscriptions Videos Found"
  );
}
