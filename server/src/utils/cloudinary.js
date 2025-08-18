const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deleteImage = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return { success: true, result };
  } catch (err) {
    console.log("first")
    console.error(err);
    return { success: false, error: err.message };
  }
};

async function deleteFolder(folderPath) {
  try {
    // Step 1: Delete all images in this folder
    await cloudinary.api.delete_resources_by_prefix(folderPath);

    // Step 2: List subfolders
    const { folders } = await cloudinary.api.sub_folders(folderPath);

    // Step 3: Recursively delete each subfolder
    for (const sub of folders) {
      await deleteFolder(sub.path);
    }

    // Step 4: Delete this folder
    await cloudinary.api.delete_folder(folderPath);
    return { success: true };
  } catch (err) {
    console.error(`Error deleting ${folderPath}:`, err);
    return { success: false };
  }
}

module.exports = { deleteImage, deleteFolder };