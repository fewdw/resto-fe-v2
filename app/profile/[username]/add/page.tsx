import ProfileTabs from "@/app/components/tabs/ProfileTabs";
import React from "react";

const page = () => {
  return (
    <div>
      <ProfileTabs username={"username"} selectedTab={1} />
      user id add profile
    </div>
  );
};

export default page;
