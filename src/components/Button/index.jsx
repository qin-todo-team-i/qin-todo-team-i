import React from "react";

export const Button = ({ children, type, disabled, onClick, className }) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`w-full ${className}`}
  >
    {children}
  </button>
);
