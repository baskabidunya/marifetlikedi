import { getAnnouncements } from "@/lib/admin";
import AnnouncementList from "./AnnouncementList";

export const dynamic = "force-dynamic";

export default async function AdminDuyurularPage() {
  const items = await getAnnouncements();
  return <AnnouncementList items={items} />;
}
