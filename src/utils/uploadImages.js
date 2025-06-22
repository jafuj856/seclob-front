import axios from "axios";

const cloudName = "dnggsagr4";
const uploadPreset = "testing-preset"; // make sure this preset is unsigned

const uploadImage = async (file) => {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`; // NO /image/ here
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  try {
    const response = await axios.post(url, formData);
    return response.data;
  } catch (error) {
    console.error("Upload error:", error.response?.data || error.message);
    throw error;
  }
};

export default uploadImage;
