import { Plus, X } from "lucide-react";
import React, { useState } from "react";

const ImageContainer = ({ productId, limit }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddImage = (e) => {
    const selectedFiles = e.target.files;
    const totalFiles = files.length + selectedFiles.length;

    if (selectedFiles.length === 0) return;

    if (files.length === 5) {
      alert("You can only select up to 5 images.");
      return;
    }

    if (totalFiles > 5) {
      alert(`You can only select up to ${5 - files.length} images.`);
      return;
    }

    if (selectedFiles.length > limit) {
      alert(`You can only select up to ${limit} images.`);
      return;
    }

    // check size
    for (let i = 0; i < selectedFiles.length; i++) {
      if (selectedFiles[i].size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB.");
        return;
      }
    }

    setFiles([...files, ...selectedFiles]);
  };

  const uploadImage = async (file) => {
    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const preset = import.meta.env.VITE_CLOUDINARY_PRESET_NAME;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset);
      formData.append("folder", `ssgtecomm/${productId}/images`);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return { product_id: productId, url: data.secure_url, public_id: data.public_id};
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    const data = await Promise.allSettled(files.map((file) => uploadImage(file)));
       const imgData = data.map((d) => (d.status === "fulfilled" ? d.value : null)).filter((value) => value !== null);
    // save urls to db
    // product_id, public_id, url
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    await fetch(`${serverUrl}/admin/product/images`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ images: imgData }),
    });

    window.location.reload();
    setLoading(false);
  };

  return (
   <div className="relative my-5 p-2 flex flex-col rounded border-dashed border-2 border-gray-400 min-h-20 overflow-auto">
      <div className="absolute top-1 right-1">
        <button
          className="disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed bg-blue-200 rounded"
          disabled={files.length === limit}
        >
          <label htmlFor="fileInput" className="cursor-pointer">
            <Plus className="text-blue-600" />
          </label>
        </button>
        <input
          id="fileInput"
          name="fileInput"
          type="file"
          multiple
          accept="image/*"
          className="border hidden"
          onChange={handleAddImage}
        />
      </div>

      {files.length === 0 && <p className="text-gray-400">No files selected</p>}

      {/* images list  */}
      <div className="flex flex-wrap">
        {files.map((file, index) => (
          <div key={index} className="relative">
            <img src={URL.createObjectURL(file)} alt={file.name} className="h-20 w-20 object-cover mr-2" />
            <X
              className="absolute top-0 right-2 cursor-pointer"
              size={20}
              color="red"
              onClick={() => setFiles(files.filter((f) => f !== file))}
            />
          </div>
        ))}
      </div>

      {files.length !== 0 && (
        <div className="mt-2 flex justify-end">
          <button
            disabled={files.length !== limit || loading}
            onClick={handleUpload}
            className="bg-blue-400 cursor-pointer p-1 text-xs px-2 rounded text-white font-semibold
            disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
          >
            {loading ? "uploading..." : "Upload"}
          </button>
        </div>
      )}
    </div>
  );
};
export default ImageContainer;