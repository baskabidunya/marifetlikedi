import ProfilePage from "@/components/profile/ProfilePage";
import AdSlot from "@/components/ads/AdSlot";

export const metadata = {
  title: "Profilim - Marifetli Kedi",
  description: "Kozmik profilinizi keşfedin.",
};

export default function Profile() {
  return (
    <>
      <ProfilePage />
      <AdSlot
        name="profile"
        className="my-12 max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop"
      />
    </>
  );
}
