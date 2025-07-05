import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadImage = async (filePath) => {
    try {
        if(!filePath) return null; 
        // upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(filePath,{
            resource_type: 'auto', // Automatically detect the resource type
            folder: 'portfolio_images' // Optional: specify a folder in Cloudinary
        });
        console.log(result.url)
        fs.unlinkSync(filePath); // Delete the file after upload
        return result.secure_url; // Return the URL of the uploaded image
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        throw new Error("Image upload failed: " + error.message);
    }
}
export default uploadImage;