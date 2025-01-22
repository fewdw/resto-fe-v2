import React from "react";
import Link from "next/link";

interface ProfileTabsProps {
  selectedTab: 0 | 1;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ selectedTab }) => {
  return (
    <div role="tablist" className="tabs tabs-boxed">
      <Link
        href={`/profile/favorites`}
        role="tab"
        className={`tab ${selectedTab === 0 ? "tab-active" : ""}`}
      >
        Favorites
      </Link>
      <Link
        href={`/profile/add`}
        role="tab"
        className={`tab ${selectedTab === 1 ? "tab-active" : ""}`}
      >
        Add
      </Link>
    </div>
  );
};

export default ProfileTabs;
