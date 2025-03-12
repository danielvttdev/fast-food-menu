/**
 * Utility for uploading images to ImgBB
 */

// Default ImgBB API key
const DEFAULT_IMGBB_API_KEY = '7822dd13774fbc863869b48daeddc5e8';

/**
 * Uploads an image to ImgBB and returns the URL
 * @param {File|Blob|String} imageData - The image to upload (File object, Blob, or base64 string)
 * @param {String} [apiKey=DEFAULT_IMGBB_API_KEY] - Your ImgBB API key (optional, uses default if not provided)
 * @returns {Promise<Object>} - Promise that resolves to the ImgBB response
 */
export const uploadToImgBB = async (imageData, apiKey = DEFAULT_IMGBB_API_KEY) => {
  if (!apiKey) {
    throw new Error('ImgBB API key is required');
  }

  if (!imageData) {
    throw new Error('Image data is required');
  }

  // Create FormData object
  const formData = new FormData();
  formData.append('key', apiKey);
  
  // Handle different types of image data
  if (imageData instanceof File || imageData instanceof Blob) {
    formData.append('image', imageData);
  } else if (typeof imageData === 'string') {
    // If it's a base64 string, we need to remove the data URL prefix if present
    const base64Data = imageData.includes('base64,') 
      ? imageData.split('base64,')[1] 
      : imageData;
    formData.append('image', base64Data);
  } else {
    throw new Error('Invalid image data format');
  }

  try {
    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`ImgBB upload failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.success) {
      return {
        success: true,
        url: data.data.url,              // Direct image URL
        display_url: data.data.display_url, // URL to display page
        delete_url: data.data.delete_url,   // URL to delete the image
        thumbnail: data.data.thumb?.url,    // Thumbnail URL if available
      };
    } else {
      throw new Error('ImgBB upload failed: ' + (data.error?.message || 'Unknown error'));
    }
  } catch (error) {
    console.error('Error uploading to ImgBB:', error);
    throw error;
  }
};

/**
 * Helper function to convert a File object to base64
 * @param {File} file - The file to convert
 * @returns {Promise<string>} - Promise that resolves to the base64 string
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};