import { getData } from "../apis/axios";

export const getCategories = async () => {
  const categories = await getData("/categories");
  return categories?.data;
};

export const getSubCategories = async () => {
  const sub = await getData("/subcategories");

  return sub?.data;
};

export const geetCategoryWithSub = async () => {
  const all = await getData("/subcategories/all");
  return all?.data;
};
