import { fetchUserProfile } from "@/app/lib/UserData";
import { UserProfile } from "@/app/types/user";
import React, { useEffect, useState } from "react";

const ProfileDisplay = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [tooltip, setTooltip] = useState("Copy?");

  useEffect(() => {
    (async () => setUser(await fetchUserProfile()))();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("hello");
    setTooltip("Copied!");
    setTimeout(() => setTooltip("Copy?"), 500);
  };

  if (!user) return null;

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
            <p className="text-gray-500">@{user.username}</p>
            <div className="tooltip tooltip-top" data-tip={tooltip}>
              <button
                className="btn btn-sm btn-primary"
                onClick={copyToClipboard}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDisplay;
