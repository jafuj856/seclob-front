import { Modal } from "@mui/material";
import React, { useState } from "react";
import { postData } from "../../apis/axios";
import { toast } from "react-toastify";

function AddCategory({ isOpen, handleClose }) {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleAdd = async () => {
    if (!categoryName.trim()) {
      setError("Category name is required");
      return;
    }
    setIsLoading(true);
    try {
      toast.clearWaitingQueue();
      const res = await postData("/categories", { name: categoryName });
      toast.success("category added");
      handleClose();
      setCategoryName("");
      setError("");
    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscard = () => {
    setCategoryName("");
    setError("");
    handleClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleDiscard}
      className="flex items-center justify-center w-full p-4"
    >
      <div className="bg-white p-6 w-full max-w-sm rounded-xl shadow-md">
        <h1 className="text-center mb-5 font-semibold text-lg">Add Category</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 border-black/40 outline-none"
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        <div className="flex justify-center gap-4">
          <button
            className="bg-yellow-500 text-white px-6 py-1.5 rounded hover:bg-yellow-600"
            onClick={handleAdd}
          >
            {isLoading ? "Loading..." : "ADD"}
          </button>
          <button
            className="bg-gray-300 text-black px-6 py-1.5 rounded hover:bg-gray-400"
            onClick={handleDiscard}
          >
            DISCARD
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddCategory;
