"use client";
import ProfileTabs from "@/app/components/tabs/ProfileTabs";
import { usePathname } from "next/navigation";
import ProfileDisplay from "../../components/profile/ProfileDisplay";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const selectedTab = pathname.includes("/favorites") ? 0 : 1;

  return (
    <div>
      <ProfileDisplay />
      <ProfileTabs selectedTab={selectedTab} />
      <div className="mt-4">{children}</div>
    </div>
  );
}
