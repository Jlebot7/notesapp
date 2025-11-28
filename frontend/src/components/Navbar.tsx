import React, { useState, useEffect } from "react";
import ProfileInfo from "./ProfileInfo";
import { useNavigate } from "react-router-dom";
import Searchbar from "./Searchbar";
import { fetchUserProfile } from "../services/authService";

interface UserInfo {
  username: string;
}

interface NavbarProps {
  userInfo: UserInfo;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({ username: "" });
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const getUserProfile = async () => {
      const profile = await fetchUserProfile();
      setUserInfo({ username: profile.username });
    };
    getUserProfile();
  }, []);

  function onLogout() {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  }

  const handleSearch = () => {};

  const onClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="bg-white flex items-center justify-between px-5 py-3 drop-shadow">
      <h3 className="text-l font-medium text-black py-1">Note.ts</h3>
      <Searchbar
        value={searchQuery}
        onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <ProfileInfo username={userInfo.username} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
