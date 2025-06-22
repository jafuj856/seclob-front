import React from "react";

function CheckBox({ isChecked, onclick }) {
  return (
    <div
      onClick={onclick}
      className={`rounded-lg h-[26px] w-[26px] flex items-center justify-center ${
        isChecked ? "bg-[#3F3F3F]" : "bg-[#B3D4E5]"
      }`}
    >
      {isChecked && (
        <svg
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.53333 3.85266L3.98599 6.30533L8.89999 1.39999"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

export default CheckBox;
