import ProfileTabs from "@/app/components/tabs/ProfileTabs";
import React from "react";

const page = () => {
  return (
    <div>
      <ProfileTabs username={"username"} selectedTab={1} />
    </div>
  );
};

export default page;
