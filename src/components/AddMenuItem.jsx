import { useState } from 'react';
import PropTypes from 'prop-types';

// URL de la imagen por defecto (compartida con Menu.jsx y Admin.jsx)
const DEFAULT_IMAGE = `data:image/svg+xml,${encodeURIComponent(`
<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="200" fill="#1A1A1A"/>
  <path d="M150 80C161.046 80 170 71.0457 170 60C170 48.9543 161.046 40 150 40C138.954 40 130 48.9543 130 60C130 71.0457 138.954 80 150 80Z" fill="#D4AF37"/>
  <path d="M190 140H110C110 117.909 127.909 100 150 100C172.091 100 190 117.909 190 140Z" fill="#D4AF37"/>
  <text x="150" y="170" font-family="Arial" font-size="14" fill="#FFFFFF" text-anchor="middle">Imagen no disponible</text>
</svg>`)}`;

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

    // Validate image URL if provided
    if (newItem.image && !isValidImageUrl(newItem.image)) {
      alert('Por favor ingrese una URL de imagen válida');
      return;
    }

    const itemToAdd = {
      ...newItem,
      id: Date.now(), // Generar un ID único
      price: Number(newItem.price),
      isPromo: false,
      isHidden: false,
      image: newItem.image || DEFAULT_IMAGE
    };

    onAddItem(categoryId, itemToAdd);
    setNewItem({ name: '', description: '', price: '', image: '' }); // Limpiar el formulario
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
          <small className="form-help">Ingrese la URL de una imagen (formatos: jpg, jpeg, png, gif, webp)</small>
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