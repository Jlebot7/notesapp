import React, { useState, ChangeEvent } from "react";

interface InputPassProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const InputPass: React.FC<InputPassProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const [isShowPassword] = useState<boolean>(false);

  return (
    <>
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="input-box"
        required
      />
    </>
  );
};

export default InputPass;
