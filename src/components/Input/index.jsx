import React from "react";

export const Input = ({ name, register, outOfFocus, defaultValue }) => (
  <input
    {...register(name, { required: true })}
    type="text"
    autoFocus
    defaultValue={defaultValue}
    onBlur={outOfFocus}
    className="caret-primary outline-none rounded w-full"
  />
);
