import { Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { getSubCategories } from "../../utils/hepperFunctions";
import axios from "axios";
import uploadImage from "../../utils/uploadImages";
import { postData } from "../../apis/axios";
import { toast } from "react-toastify";

function ProductAdd({ isOpen, setIsOpen, getProducts }) {
  const initialState = {
    title: "",
    variants: [{ ram: "", price: "", quantity: 1 }],
    subCategory: "",
    description: "",
    images: [],
  };
  const [subCategories, setSubCategories] = useState([]);
  const [product, setProduct] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      const categoryData = await getSubCategories();
      setSubCategories(categoryData ?? []);
    })();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!product.title) newErrors.title = "Title is required";
    if (!product.subCategory) newErrors.subCategory = "Subcategory is required";
    if (!product.description) newErrors.description = "Description is required";
    if (product.variants.some((v) => !v.ram || !v.price || v.quantity < 1)) {
      newErrors.variants =
        "All variant fields must be filled and quantity must be at least 1";
    }
    if (product.images.length === 0) {
      newErrors.images = "At least one image is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...product.variants];
    updatedVariants[index][field] = value;
    setProduct({ ...product, variants: updatedVariants });
  };

  const addVariant = () => {
    setProduct({
      ...product,
      variants: [...product.variants, { ram: "", price: "", quantity: 1 }],
    });
  };

  const removeVariant = (index) => {
    const updatedVariants = product.variants.filter((_, i) => i !== index);
    setProduct({ ...product, variants: updatedVariants });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProduct({ ...product, images: [...product.images, ...files] });
  };

  const handleAddProduct = async () => {
    if (!validate()) return;

    setUploading(true);
    const uploadedUrls = [];
    for (const file of product.images) {
      const url = await uploadImage(file);

      if (url) uploadedUrls.push(url?.secure_url);
      // if upload fails, just skip
    }
    setUploading(false);

    if (uploadedUrls.length === 0) {
      toast.error("No images uploaded successfully. Product not added.");
      return;
    }

    const productToSubmit = {
      title: product.title,
      description: product.description,
      subCategory: product.subCategory,
      variants: product.variants,
      images: uploadedUrls,
    };

    try {
      await postData("/products", productToSubmit);
      toast.success("Product added successfully");
      getProducts();
      setIsOpen(false);
      setProduct(initialState);
      setErrors({});
    } catch (error) {
      console.log(error);

      toast.error("Failed to add product");
    }
  };

  const handleDiscard = () => {
    setProduct(initialState);
    setErrors({});
    setIsOpen(false);
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleDiscard}
      className="flex items-center justify-center w-full p-4"
    >
      <div className="bg-white p-6 w-full sm:max-w-[600px] rounded-xl shadow-md">
        <h1 className="text-center mb-5 font-semibold text-xl">Add Product</h1>

        {/* Title */}
        <div className="flex mb-4">
          <label className="w-1/4 text-black/60 font-medium">Title :</label>
          <div className="w-3/4">
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-1 border-black/40 outline-none"
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>
        </div>

        {/* Variants */}
        <div className="flex mb-4">
          <label className="w-1/4 text-black/60 font-medium">Variants :</label>
          <div className="w-3/4">
            {product.variants.map((variant, index) => (
              <div className="flex items-center gap-2 mb-2" key={index}>
                <input
                  type="text"
                  placeholder="RAM"
                  value={variant.ram}
                  onChange={(e) =>
                    handleVariantChange(index, "ram", e.target.value)
                  }
                  className="w-1/4 px-2 py-1 border rounded-lg border-black/30"
                />
                <input
                  type="text"
                  placeholder="Price"
                  value={variant.price}
                  onChange={(e) =>
                    handleVariantChange(index, "price", e.target.value)
                  }
                  className="w-1/4 px-2 py-1 border rounded-lg border-black/30"
                />
                <input
                  type="number"
                  placeholder="Qty"
                  value={variant.quantity}
                  min={1}
                  onChange={(e) =>
                    handleVariantChange(
                      index,
                      "quantity",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-1/4 px-2 py-1 border rounded-lg border-black/30"
                />
                {index > 0 && (
                  <button onClick={() => removeVariant(index)}>
                    <MdDelete className="text-red-500 text-xl" />
                  </button>
                )}
              </div>
            ))}
            {errors.variants && (
              <p className="text-red-500 text-xs mt-1">{errors.variants}</p>
            )}
          </div>
        </div>
        <button onClick={addVariant} className="text-sm text-blue-500 mb-4">
          <FaPlus className="inline mr-1" /> Add variants
        </button>

        {/* Sub Category */}
        <div className="flex mb-4">
          <label className="w-1/4 text-black/60 font-medium">
            Sub category :
          </label>
          <div className="w-3/4">
            <select
              className="w-full border rounded-lg px-3 py-1 border-black/40 outline-none"
              value={product.subCategory}
              onChange={(e) =>
                setProduct({ ...product, subCategory: e.target.value })
              }
            >
              <option value="">Select</option>
              {subCategories?.length > 0 &&
                subCategories?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
            </select>
            {errors.subCategory && (
              <p className="text-red-500 text-xs mt-1">{errors.subCategory}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="flex mb-4">
          <label className="w-1/4 text-black/60 font-medium">
            Description :
          </label>
          <div className="w-3/4">
            <textarea
              rows="2"
              className="w-full border rounded-lg px-3 py-1 border-black/40 outline-none"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>
        </div>

        {/* Upload Image */}
        <div className="flex mb-4 items-center">
          <label className="w-1/4 text-black/60 font-medium">
            Upload image:
          </label>
          <div className="w-3/4 flex gap-2 flex-wrap p-2 border border-black/20">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-16 h-16 object-cover rounded"
              />
            ))}
            <label className="w-16 h-16 border-dashed border-2 flex items-center justify-center rounded cursor-pointer">
              +
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          {errors.images && (
            <p className="text-red-500 text-xs mt-1">{errors.images}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            disabled={uploading}
            className={`px-5 py-1 rounded text-white ${
              uploading ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-600"
            }`}
            onClick={handleAddProduct}
          >
            {uploading ? "Uploading..." : "ADD"}
          </button>
          <button
            disabled={uploading}
            className="bg-gray-300 text-black px-5 py-1 rounded hover:bg-gray-400"
            onClick={handleDiscard}
          >
            DISCARD
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ProductAdd;
