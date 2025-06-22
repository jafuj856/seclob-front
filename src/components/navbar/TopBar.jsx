import { Heart, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";

function TopBar({ isHid, setSearch, search }) {
  const [search1, setSearch1] = useState();
  useEffect(() => {
    if (!search1) {
      setSearch(search1);
    }
  }, [search1]);
  return (
    <div className="h-[100px] fixed top-0 left-0 right-0 z-50 flex items-center bg-headerColor justify-between w-full max-w-screen px-10">
      <div className="flex items-center h-10 w-10" />
      {/* searchBar */}
      {!isHid && (
        <div className="bg-white hidden md:flex rounded-xl overflow-hidden h-10 ">
          <input
            type="text"
            value={search1}
            onChange={(e) => setSearch1(e.target.value)}
            placeholder="Serach any things"
            className="w-full bg-transparent outline-none h-full p-2 "
            name=""
            id=""
          />
          <button
            onClick={() => setSearch(search1)}
            className="bg-buttonColor p-2 px-4 h-full flex items-center justify-center text-white rounded-xl"
          >
            Search
          </button>
        </div>
      )}
      <div className="flex items-center gap-10 font-poppins text-[14px] text-white">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="flex items-center gap-1">
            <Heart className="w-[24px] h-[24px] text-white" />
            <div className="w-[15px] h-[15px] flex items-center justify-center rounded-full bg-buttonColor p-1 text-[11px]">
              0
            </div>
          </div>
          Sign In
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="flex items-center gap-1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.99995 2H3.73996C4.81996 2 5.66996 2.93 5.57996 4L4.74995 13.96C4.60995 15.59 5.89995 16.99 7.53995 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.5399 6.88C21.6599 5.22 20.3999 3.87 18.7299 3.87H5.81996"
                stroke="white"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.25 22C16.9403 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9403 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                stroke="white"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.24995 22C8.94031 22 9.49995 21.4404 9.49995 20.75C9.49995 20.0596 8.94031 19.5 8.24995 19.5C7.5596 19.5 6.99995 20.0596 6.99995 20.75C6.99995 21.4404 7.5596 22 8.24995 22Z"
                stroke="white"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.99995 8H21"
                stroke="white"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div className="w-[15px] h-[15px] flex items-center justify-center rounded-full bg-buttonColor p-1 text-[11px]">
              0
            </div>
          </div>
          Cart
        </div>
      </div>
    </div>
  );
}

export default TopBar;
