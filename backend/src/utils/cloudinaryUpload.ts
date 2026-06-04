import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = async (filePath: string): Promise<string> => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "books",
  });

  return result.secure_url;
};
