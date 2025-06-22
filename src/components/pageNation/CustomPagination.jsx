import React from "react";
import { Pagination, PaginationItem } from "@mui/material";

function CustomPagination({ count, page, onChange }) {
  return (
    <Pagination
      count={count}
      page={page}
      onChange={onChange}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#eda415",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#eda415",
                color: "#fff",
              },
            },
            "&:not(.Mui-selected)": {
              backgroundColor: "transparent",
              color: "#eda415",
              "&:hover": {
                backgroundColor: "#eda415",
                color: "#fff",
              },
            },
            borderRadius: "100%",
          }}
        />
      )}
    />
  );
}

export default CustomPagination;
