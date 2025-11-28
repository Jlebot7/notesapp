import React from "react";

interface UserInfo {
  username: string;
  onLogout: () => void;
}

const ProfileInfo: React.FC<UserInfo> = ({ username, onLogout }) => {
  return (
    <div className="flex items-center gap-5">
      <div>
        <p className="text-sm font-medium">{username}</p>
        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
