import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Menu.css';
import menuData from '../data/menuData';

// URL de la imagen por defecto con el estilo de la aplicación
const DEFAULT_IMAGE = `data:image/svg+xml,${encodeURIComponent(`
<svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="200" fill="#1A1A1A"/>
  <path d="M150 80C161.046 80 170 71.0457 170 60C170 48.9543 161.046 40 150 40C138.954 40 130 48.9543 130 60C130 71.0457 138.954 80 150 80Z" fill="#D4AF37"/>
  <path d="M190 140H110C110 117.909 127.909 100 150 100C172.091 100 190 117.909 190 140Z" fill="#D4AF37"/>
  <text x="150" y="170" font-family="Arial" font-size="14" fill="#FFFFFF" text-anchor="middle">Imagen no disponible</text>
</svg>`)}`;

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const { addToCart } = useCart();

  // Efecto para cargar los datos del menú
  useEffect(() => {
    const loadMenuData = () => {
      try {
        // Intentamos obtener los datos del localStorage
        const savedMenu = localStorage.getItem('menuData');
        if (savedMenu) {
          const parsedMenu = JSON.parse(savedMenu);
          console.log('Cargando menú desde localStorage:', parsedMenu);
          
          // Check if the data has the new format with timestamp and data properties
          const menuData = parsedMenu.data || parsedMenu; // Handle both new and old format
          
          setCategories(menuData);
          if (!selectedCategory) {
            setSelectedCategory(menuData[0]?.id || null);
          }
          // Actualizamos el timestamp para forzar la recarga de imágenes
          setLastUpdate(Date.now());
        } else {
          console.log('No hay datos en localStorage, usando menuData');
          setCategories(menuData);
          if (!selectedCategory) {
            setSelectedCategory(menuData[0]?.id || null);
          }
        }
      } catch (error) {
        console.error('Error cargando el menú:', error);
        setCategories(menuData);
        if (!selectedCategory) {
          setSelectedCategory(menuData[0]?.id || null);
        }
      }
    };

    loadMenuData();

    // Configurar un intervalo para verificar actualizaciones
    const intervalId = setInterval(loadMenuData, 2000); // Verificar cada 2 segundos

    return () => clearInterval(intervalId);
  }, [selectedCategory]);

  const handleQuantityChange = (itemId, change) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + change)
    }));
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    addToCart(item, quantity);
    setQuantities(prev => ({ ...prev, [item.id]: 1 }));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const selectedCategoryItems = selectedCategory
    ? categories.find(cat => cat.id === selectedCategory)?.items || []
    : [];

  const handleImageError = (e, itemName) => {
    console.log(`Error cargando imagen para ${itemName}, usando imagen por defecto`);
    e.target.onerror = null; // Prevenir loop infinito
    e.target.src = DEFAULT_IMAGE;
  };

  return (
    <div className="menu-container">
      <header className="menu-header">
        <div className="logo-container">
          <img 
            src="/logo.png" 
            alt="Cardon Food Logo" 
            className="restaurant-logo"
          />
        </div>
        <h1>Nuestro Menú</h1>
        <p className="menu-subtitle">Selecciona una categoría para ver los productos</p>
      </header>

      <nav className="categories-container">
        <div className="categories-wrapper">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => {
                console.log('Seleccionando categoría:', category.name);
                setSelectedCategory(category.id);
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </nav>

      <div className="menu-items">
        {selectedCategory && categories
          .find(cat => cat.id === selectedCategory)?.items
          .filter(item => !item.isHidden)
          .map(item => (
            <div key={item.id} className="menu-item">
              <div className="item-image">
                <img 
                  src={item.image || DEFAULT_IMAGE}
                  alt={item.name}
                  onError={(e) => handleImageError(e, item.name)}
                  loading="lazy"
                  key={item.image} // Forzar re-render cuando cambia la imagen
                />
                {item.isPromo && <span className="promo-badge">Promo</span>}
              </div>
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="item-footer">
                  <span className="price">${formatPrice(item.price)}</span>
                  <div className="add-to-cart-controls">
                    <div className="quantity-controls">
                      <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                      <span>{quantities[item.id] || 1}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                    </div>
                    <button 
                      className="add-button"
                      onClick={() => handleAddToCart(item)}
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="whatsapp-float">
        <a
          href="https://api.whatsapp.com/send?phone=5491123884009&text=Hola,%20quisiera%20hacer%20un%20pedido"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjMjVEMzY2IiBkPSJNMS44OTIgMjIuMDg2bDEuNDItNC4yNDVhMTAuMDAyIDEwLjAwMiAwIDAxLTEuMzItNC45OUMxLjk5MiA2Ljc5IDYuNzkyIDIgMTIuODUyIDJjNi4wNiAwIDEwLjg2IDQuNzkgMTAuODYgMTAuODUgMCA2LjA2LTQuODQgMTAuODYtMTAuODYgMTAuODYtMS43MyAwLTMuNDUtLjQyLTQuOTktMS4zMmwtNC4yNDUgMS40MnptMTAuOTYtMy4zNmMyLjA0IDAgNC4wNC0uNTIgNS44LTEuNTFsLjQxLS4yMy0xLjY3LS41Ny0uMzcuMjFjLTEuNTYuODktMy4zMyAxLjM2LTUuMTQgMS4zNi01LjggMC0xMC41Mi00LjcxLTEwLjUyLTEwLjUyIDEwLjUyLTEwLjUyIDEwLjUyIDQuNzEgMTAuNTIgMTAuNTIgMCAxLjgxLS40NyAzLjU4LTEuMzYgNS4xNGwtLjIxLjM3LjU3IDEuNjcuMjMtLjQxYy45OS0xLjc2IDEuNTEtMy43NiAxLjUxLTUuOCAwLTYuNi01LjM2LTExLjkyLTExLjkyLTExLjkyLTEwLjUyIDAtNS44IDQuNzEtMTAuNTIgMTAuNTItMTAuNTIgNS44IDAgMTAuNTIgNC43MSAxMC41MiAxMC41MiAwIDEuODEtLjQ3IDMuNTgtMS4zNiA1LjE0bC0uMjEuMzcuNTcgMS42Ny4yMy0uNDFjLjk5LTEuNzYgMS41MS0zLjc2IDEuNTEtNS44IDAtNi42LTUuMzYtMTEuOTYtMTEuOTYtMTEuOTZTMS45MzIgNi4yNSAxLjkzMiAxMi44NWMwIDIuMDQuNTIgNC4wNCAxLjUxIDUuOGwuMjMuNDEgMS42Ny0uNTctLjIxLS4zN2MtLjg5LTEuNTYtMS4zNi0zLjMzLTEuMzYtNS4xNCAwLTUuOCA0LjcxLTEwLjUyIDEwLjUyLTEwLjUyeiIvPjwvc3ZnPg==';
            }}
          />
          Hacer Pedido
        </a>
      </div>
    </div>
  );
};

export default Menu;