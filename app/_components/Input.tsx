import React, { FC } from "react";

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  inputClassName?: string;
}

const Input: FC<InputProps> = ({
  type,
  placeholder,
  inputClassName,
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={inputClassName}
      {...props}
    />
  );
};

export default Input;
