import React, { useEffect, useState } from "react";
import SidebarDropDown from "./SidebarDropDown";
import {
  geetCategoryWithSub,
  getCategories,
} from "../../utils/hepperFunctions";

function SideBar({ selectedSubItems, setSelectedSubItems }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const categoryData = await getCategories();
      const sub = await geetCategoryWithSub();
      setCategories(sub ?? []);
    })();
  }, []);

  return (
    <div className="w-fit md:top-0 md:relative absolute top-[150px] left-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 p-1 flex flex-col justify-between border border-buttonColor rounded-md absolute right-0 top-0 sm:hidden"
      >
        <div className="h-1 w-full rounded-full bg-buttonColor" />
        <div className="h-1 w-full rounded-full bg-buttonColor" />
        <div className="h-1 w-full rounded-full bg-buttonColor" />
      </button>
      <div
        className={`w-[200px] text-[16px] font-[400] font-poppins flex-col gap-4 ${
          isOpen ? "flex absolute left-0 z-30 bg-white p-4" : "hidden"
        } sm:flex`}
      >
        <span className="text-headerColor font-[500]">Home</span>
        <span className="mb-5">All Categories</span>

        {categories.map((item, index) => (
          <div key={item._id} className={`${index !== 0 && "mt-2"}`}>
            <SidebarDropDown
              item={item}
              isOpen={selectedCategories.includes(item._id)}
              toggleCategory={() => {
                setSelectedCategories((prev) =>
                  prev.includes(item._id)
                    ? prev.filter((id) => id !== item._id)
                    : [...prev, item._id]
                );
              }}
              selectedSubItems={selectedSubItems}
              toggleSubItem={(sub) => {
                setSelectedSubItems((prev) =>
                  prev.includes(sub)
                    ? prev.filter((s) => s !== sub)
                    : [...prev, sub]
                );
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
