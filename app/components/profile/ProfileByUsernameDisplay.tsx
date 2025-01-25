import { useState, useEffect } from "react";
import { fetchUserProfileById } from "@/app/lib/UserData";
import { UserProfile } from "@/app/types/user";
import { FRONTEND_URL } from "@/config";
import LoadingProfileSkeleton from "./LoadingProfileSkeleton";

interface ProfileByIdDisplayProps {
  username: string;
}

const ProfileByUsername: React.FC<ProfileByIdDisplayProps> = ({ username }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [tooltip, setTooltip] = useState("Copy?");

  useEffect(() => {
    const loadUser = async () => {
      const data = await fetchUserProfileById(username);
      setUser(data);
    };
    loadUser();
  }, [username]);

  const copyToClipboard = () => {
    if (user) {
      navigator.clipboard.writeText(
        `${FRONTEND_URL}/profile/${user.username}/favorites`
      );
      setTooltip("Copied!");
      setTimeout(() => setTooltip("Copy?"), 300);
    }
  };

  if (!user) {
    return <LoadingProfileSkeleton />;
  }

  return (
    <div className="flex justify-center">
      <div className="card w-96 bg-base-100">
        <figure className="px-10 pt-10">
          <img
            src={user.picture}
            alt={`${user.name}'s picture`}
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-xl font-bold">{user.name}</h2>
          <div className="flex items-center space-x-2">
            <div className="tooltip" data-tip={tooltip}>
              <p
                className="text-gray-500 cursor-pointer hover:text-blue-600 hover:bg-blue-100 px-2 py-1 rounded"
                onClick={copyToClipboard}
              >
                @{user.username}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileByUsername;
