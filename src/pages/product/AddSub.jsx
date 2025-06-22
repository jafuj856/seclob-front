import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { getCategories } from "../../utils/hepperFunctions";
import { postData } from "../../apis/axios";
import { toast } from "react-toastify";

function AddSub({ isOpen, handleClose }) {
  const [category, setCategory] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [error, setError] = useState({});
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      const categoryData = await getCategories();
      setCategories(categoryData ?? []);
    })();
  }, []);

  const validate = () => {
    const errors = {};
    if (!category) errors.category = "Category is required";
    if (!subCategoryName.trim())
      errors.subCategoryName = "Subcategory name is required";
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAdd = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const payload = { name: subCategoryName.trim(), category };
      await postData("/subcategories", payload);
      toast.success("Subcategory added successfully");
      handleClose();
      setCategory("");
      setSubCategoryName("");
      setError({});
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDiscard = () => {
    setCategory("");
    setSubCategoryName("");
    setError({});
    handleClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleDiscard}
      className="flex items-center justify-center w-full p-4"
    >
      <div className="bg-white p-6 w-full max-w-sm rounded-xl shadow-md">
        <h1 className="text-center mb-5 font-semibold text-lg">
          Add Sub Category
        </h1>

        <div className="mb-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 border-black/40 outline-none"
          >
            <option value="">Select category</option>
            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          {error.category && (
            <p className="text-red-500 text-xs mt-1">{error.category}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter sub category name"
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 border-black/40 outline-none"
          />
          {error.subCategoryName && (
            <p className="text-red-500 text-xs mt-1">{error.subCategoryName}</p>
          )}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleAdd}
            disabled={isSubmitting}
            className="bg-yellow-500 text-white px-6 py-1.5 rounded hover:bg-yellow-600"
          >
            {isSubmitting ? "Adding..." : "ADD"}
          </button>
          <button
            onClick={handleDiscard}
            className="bg-gray-300 text-black px-6 py-1.5 rounded hover:bg-gray-400"
          >
            DISCARD
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddSub;
