"use client";
import ProfileByUsername from "@/app/components/profile/ProfileByUsernameDisplay";
import ProfileByUsernameTab from "@/app/components/tabs/ProfileByUsernameTab";
import { usePathname } from "next/navigation";
import { use } from "react";

type ProfileParams = {
  username: string;
};

export default function ProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<ProfileParams>;
}) {
  const pathname = usePathname();
  const selectedTab = pathname.includes("/favorites") ? 0 : 1;
  const { username } = use(params);

  return (
    <div>
      <ProfileByUsername username={username} />
      <ProfileByUsernameTab selectedTab={selectedTab} username={username} />
      <div className="mt-4">{children}</div>
    </div>
  );
}
