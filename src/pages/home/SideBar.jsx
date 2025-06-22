import React, { useEffect, useState } from "react";
import SidebarDropDown from "./SidebarDropDown";
import {
  geetCategoryWithSub,
  getCategories,
} from "../../utils/hepperFunctions";

function SideBar({ selectedSubItems, setSelectedSubItems }) {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const categoryData = await getCategories();
      const sub = await geetCategoryWithSub();
      setCategories(sub ?? []);
    })();
  }, []);

  return (
    <div className="w-[200px] text-[16px] font-[400] font-poppins sm:flex hidden flex-col gap-4 ">
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
  );
}

export default SideBar;
