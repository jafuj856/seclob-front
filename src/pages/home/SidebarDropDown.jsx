import React from "react";
import CheckBox from "./CheckBox";
import { ChevronRight } from "lucide-react";

function SidebarDropDown({
  item,
  isOpen,
  toggleCategory,
  selectedSubItems,
  toggleSubItem,
}) {
  return (
    <div className="w-full items-center">
      <div
        onClick={toggleCategory}
        className="flex items-center justify-between cursor-pointer"
      >
        <span>{item?.category}</span>
        <ChevronRight
          className={`transition-transform ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        />
      </div>

      {isOpen && item.sub?.length > 0 && (
        <div className="flex flex-col gap-2 mt-2 ml-4">
          {item.sub.map((sub) => (
            <div key={sub?.id} className="flex items-center gap-2">
              <CheckBox
                isChecked={selectedSubItems.includes(sub?.id)}
                onclick={() => toggleSubItem(sub?.id)}
              />
              <span>{sub?.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SidebarDropDown;
