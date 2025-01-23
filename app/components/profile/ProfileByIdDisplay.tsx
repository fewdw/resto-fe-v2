import { fetchUserProfileById } from "@/app/lib/UserData";
import { useState, useEffect } from "react";

interface UserProfile {
  name: string;
}

interface ProfileByIdDisplayProps {
  username: string;
}

const ProfileByIdDisplay: React.FC<ProfileByIdDisplayProps> = ({
  username,
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const data = await fetchUserProfileById(username);
      setUser(data);
    };
    loadUser();
  }, [username]);

  return <div>{user ? `Profile of ${user.name}` : "Loading profile..."}</div>;
};

export default ProfileByIdDisplay;
