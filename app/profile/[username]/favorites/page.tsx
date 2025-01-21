import ProfileTabs from "@/app/components/tabs/ProfileTabs";
import React from "react";

const page = () => {
  return (
    <div>
      <ProfileTabs username={"username"} selectedTab={0} />
      user id favorite profile
    </div>
  );
};

export default page;
