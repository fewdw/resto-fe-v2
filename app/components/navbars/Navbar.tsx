"use client";
import { useEffect, useState } from "react";

import { UserProfile } from "@/app/types/user";
import { fetchUserProfile } from "@/app/lib/UserData";
import LoggedNavbar from "./LoggedNavbar";
import SignInNav from "./SignInNav";

const Navbar = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const getUserProfile = async () => {
      const data = await fetchUserProfile();
      setUser(data);
    };

    getUserProfile();
  }, []);

  if (!user) {
    return <SignInNav />;
  }

  return <LoggedNavbar profilePic={user.picture} />;
};

export default Navbar;
