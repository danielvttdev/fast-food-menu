// Utility functions for handling image uploads

/**
 * Saves an uploaded image to the public/images directory
 * @param {File} file - The image file to save
 * @returns {Promise<string>} - The URL path to the saved image
 */
export const saveImage = async (file) => {
  try {
    if (!file.type.startsWith('image/')) {
      throw new Error('Invalid file type. Please select an image.');
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error('Image is too large. Maximum size is 5MB.');
    }
    
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('image', file);

    // Send the file to the server
    const response = await fetch('/.netlify/functions/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Error saving image:', error);
    throw error;
  }
};

/**
 * Deletes an image from the public/images directory
 * @param {string} imagePath - The path to the image to delete
 * @returns {Promise<void>}
 */
export const deleteImage = async (imagePath) => {
  try {
    const response = await fetch('/api/delete-image', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ imagePath })
    });

    if (!response.ok) {
      throw new Error('Failed to delete image');
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};