import { useState } from 'react';
import PropTypes from 'prop-types';
import { uploadToImgBB, fileToBase64 } from '../utils/imgbbUploader';

// URL de la imagen por defecto (compartida con Menu.jsx y Admin.jsx)
const DEFAULT_IMAGE = `data:image/svg+xml,${encodeURIComponent(`
<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="200" fill="#1A1A1A"/>
  <path d="M150 80C161.046 80 170 71.0457 170 60C170 48.9543 161.046 40 150 40C138.954 40 130 48.9543 130 60C130 71.0457 138.954 80 150 80Z" fill="#D4AF37"/>
  <path d="M190 140H110C110 117.909 127.909 100 150 100C172.091 100 190 117.909 190 140Z" fill="#D4AF37"/>
  <text x="150" y="170" font-family="Arial" font-size="14" fill="#FFFFFF" text-anchor="middle">Imagen no disponible</text>
</svg>`)}`;

// Función para convertir enlaces de Google Drive en enlaces directos
const getGoogleDriveDirectLink = (url) => {
  try {
    // Si es un enlace de visualización de Google Drive
    if (url.includes('drive.google.com/file/d/')) {
      const fileId = url.split('/file/d/')[1].split('/')[0];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
    // Si ya es un enlace directo, lo devolvemos tal cual
    if (url.includes('drive.google.com/uc?')) {
      return url;
    }
    // Si es cualquier otro tipo de enlace, lo devolvemos sin modificar
    return url;
  } catch (error) {
    console.error('Error procesando URL de Google Drive:', error);
    return url;
  }
};

const AddMenuItem = ({ categoryId, onAddItem }) => {
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.description || !newItem.price) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }

    // Validar la URL de la imagen si se proporciona una
    if (newItem.image && !newItem.image.match(/\.(jpeg|jpg|gif|png)$/i)) {
      alert('Por favor ingrese una URL directa de imagen que termine en .jpg, .jpeg, .png o .gif');
      return;
    }

    const itemToAdd = {
      ...newItem,
      id: Date.now(),
      price: Number(newItem.price),
      isPromo: false,
      isHidden: false,
      image: newItem.image || DEFAULT_IMAGE
    };

    onAddItem(categoryId, itemToAdd);
    setNewItem({ name: '', description: '', price: '', image: '' });
  };

  const isValidImageUrl = (url) => {
    try {
      const parsedUrl = new URL(url);
      const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
      return validExtensions.some(ext => parsedUrl.pathname.toLowerCase().endsWith(ext));
    } catch {
      return false;
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona una imagen válida');
        return;
      }

      if (file.size > 2 * 1024 * 1024) { // 2MB máximo
        alert('La imagen es demasiado grande. El tamaño máximo es 2MB');
        return;
      }

      try {
        // Primero mostramos la imagen localmente para feedback inmediato
        const base64Image = await fileToBase64(file);
        setNewItem(prev => ({ ...prev, image: base64Image }));
        
        // Luego subimos a ImgBB usando la API key configurada en imgbbUploader.js
        const result = await uploadToImgBB(file);
        
        if (result.success) {
          // Actualizamos con la URL permanente
          setNewItem(prev => ({ ...prev, image: result.url }));
          console.log('Imagen subida exitosamente a ImgBB:', result.url);
        }
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        alert('Error al subir la imagen. Por favor intenta de nuevo o usa una URL directa.');
      }
    }
  };

  return (
    <div className="add-item-form">
      <h3>Agregar Nuevo Producto</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={newItem.name}
            onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={newItem.description}
            onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            value={newItem.price}
            onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">URL de la Imagen:</label>
          <input
            type="url"
            id="image"
            value={newItem.image}
            onChange={(e) => setNewItem(prev => ({ ...prev, image: e.target.value }))}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
          <small className="form-help">
            Ingrese una URL directa de imagen (debe terminar en .jpg, .jpeg, .png o .gif)<br />
            O suba una imagen directamente usando el botón de abajo
          </small>
          <div className="image-upload-container">
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageUpload}
              className="image-upload-input"
            />
            <label htmlFor="imageUpload" className="image-upload-button">
              Subir imagen a ImgBB
            </label>
          </div>
        </div>

        <button type="submit" className="add-item-btn">
          Agregar Producto
        </button>
      </form>
    </div>
  );
};

AddMenuItem.propTypes = {
  categoryId: PropTypes.number.isRequired,
  onAddItem: PropTypes.func.isRequired
};

export default AddMenuItem;