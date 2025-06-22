import React from "react";

function CommonInput({
  err,
  icon,
  onChange,
  name,
  value,
  placeholder,
  type = "text",
}) {
  return (
    <div className="w-full capitalize">
      <div
        className={`flex items-center w-full bg-[#F4F8F5] px-3 py-2 rounded-md ${
          err ? "border border-red-500" : "border border-transparent"
        }`}
      >
        {icon && <div className="mr-2 text-gray-500">{icon}</div>}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm"
        />
      </div>
      {err && <p className="text-red-500 text-xs mt-1">{err}</p>}
    </div>
  );
}

export default CommonInput;
