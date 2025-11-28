import React, { useState, ChangeEvent, FormEvent } from "react";
import InputPass from "../components/InputPass";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";

const Login: React.FC = () => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter your password");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post("/auth/login", {
        username: username,
        password: password,
      });
      if (response.data && response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        navigate("/home");
        window.location.reload();
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setError("Wrong password, try again");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="flex items-center justify-center mt-20">
        <div className="w-90 border rounded bg-white px-5 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-xl mb-4">Access to Note.ts</h4>
            <input
              value={username}
              onChange={handleUserNameChange}
              type="text"
              placeholder="Username"
              className="input-box"
              required
            />
            <InputPass value={password} onChange={handlePasswordChange} />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
