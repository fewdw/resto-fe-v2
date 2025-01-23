import React from "react";
import Link from "next/link";

interface ProfileTabsProps {
  selectedTab: 0 | 1;
  username: string;
}

const ProfileByUsernameTab: React.FC<ProfileTabsProps> = ({
  selectedTab,
  username,
}) => {
  return (
    <div role="tablist" className="tabs tabs-boxed">
      <Link
        href={`/profile/${username}/favorites`}
        role="tab"
        className={`tab ${selectedTab === 0 ? "tab-active" : ""}`}
      >
        Favorites
      </Link>
      <Link
        href={`/profile/${username}/add`}
        role="tab"
        className={`tab ${selectedTab === 1 ? "tab-active" : ""}`}
      >
        Add
      </Link>
    </div>
  );
};

export default ProfileByUsernameTab;
