import { useState, useEffect } from 'react';
import '../styles/Admin.css';
import AddMenuItem from '../components/AddMenuItem';
import menuData from '../data/menuData';
import { uploadToImgBB, fileToBase64 } from '../utils/imgbbUploader';

// URL de la imagen por defecto (compartida con Menu.jsx)
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

const Admin = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    // Cargar el menú desde localStorage si existe
    const loadMenuData = () => {
      try {
        const savedMenu = localStorage.getItem('menuData');
        if (savedMenu) {
          const parsedMenu = JSON.parse(savedMenu);
          const menuData = parsedMenu.data || parsedMenu; // Handle both new and old format
          setCategories(menuData);
          // Seleccionar la primera categoría por defecto
          if (menuData.length > 0) {
            setSelectedCategory(menuData[0].id);
          }
          setLastUpdate(Date.now());
        } else {
          console.log('No hay datos en localStorage, usando menuData por defecto');
          setCategories(menuData);
          if (menuData.length > 0) {
            setSelectedCategory(menuData[0].id);
          }
        }
      } catch (error) {
        console.error('Error cargando el menú:', error);
        setCategories(menuData);
        if (menuData.length > 0) {
          setSelectedCategory(menuData[0].id);
        }
      }
    };

    loadMenuData();
    // Configurar un intervalo para verificar actualizaciones
    const intervalId = setInterval(loadMenuData, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Contraseña incorrecta');
    }
  };

  const handleUpdatePrice = (categoryId, itemId, newPrice) => {
    setCategories(prevCategories => {
      const newCategories = prevCategories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: category.items.map(item => {
              if (item.id === itemId) {
                return { ...item, price: Number(newPrice) };
              }
              return item;
            })
          };
        }
        return category;
      });
      setHasUnsavedChanges(true);
      return newCategories;
    });
  };

  const handleTogglePromo = (categoryId, itemId) => {
    setCategories(prevCategories => {
      const newCategories = prevCategories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: category.items.map(item => {
              if (item.id === itemId) {
                return { ...item, isPromo: !item.isPromo };
              }
              return item;
            })
          };
        }
        return category;
      });
      setHasUnsavedChanges(true);
      return newCategories;
    });
  };

  const handleToggleHideItem = (categoryId, itemId) => {
    setCategories(prevCategories => {
      const newCategories = prevCategories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: category.items.map(item => {
              if (item.id === itemId) {
                return { ...item, isHidden: !item.isHidden };
              }
              return item;
            })
          };
        }
        return category;
      });
      setHasUnsavedChanges(true);
      return newCategories;
    });
  };

  const handleDeleteItem = (categoryId, itemId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      setCategories(prevCategories => {
        const newCategories = prevCategories.map(category => {
          if (category.id === categoryId) {
            return {
              ...category,
              items: category.items.filter(item => item.id !== itemId)
            };
          }
          return category;
        });
        setHasUnsavedChanges(true);
        return newCategories;
      });
    }
  };

  const handleSaveChanges = () => {
    const menuDataWithTimestamp = {
      timestamp: Date.now(),
      data: categories
    };
    localStorage.setItem('menuData', JSON.stringify(menuDataWithTimestamp));
    setHasUnsavedChanges(false);
    setLastUpdate(Date.now());
    alert('Cambios guardados exitosamente');
  };

  const handleImageUpload = async (categoryId, itemId, file) => {
    if (file) {
      try {
        if (!file.type.startsWith('image/')) {
          alert('Por favor selecciona una imagen válida');
          return;
        }

        if (file.size > 2 * 1024 * 1024) { // 2MB máximo
          alert('La imagen es demasiado grande. El tamaño máximo es 2MB');
          return;
        }

        // Primero mostramos la imagen localmente para feedback inmediato
        const base64Image = await fileToBase64(file);
        setCategories(prevCategories => {
          const newCategories = prevCategories.map(category => {
            if (category.id === categoryId) {
              return {
                ...category,
                items: category.items.map(item => {
                  if (item.id === itemId) {
                    return { ...item, image: base64Image };
                  }
                  return item;
                })
              };
            }
            return category;
          });
          setHasUnsavedChanges(true);
          return newCategories;
        });

        // Luego subimos a ImgBB usando la API key configurada en imgbbUploader.js
        const result = await uploadToImgBB(file);
        
        if (result.success) {
          // Actualizamos con la URL permanente
          setCategories(prevCategories => {
            const newCategories = prevCategories.map(category => {
              if (category.id === categoryId) {
                return {
                  ...category,
                  items: category.items.map(item => {
                    if (item.id === itemId) {
                      return { ...item, image: result.url };
                    }
                    return item;
                  })
                };
              }
              return category;
            });
            setHasUnsavedChanges(true);
            return newCategories;
          });
          console.log('Imagen subida exitosamente a ImgBB:', result.url);
        }
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        alert('Error al subir la imagen. Por favor intenta de nuevo o usa una URL directa.');
      }
    }
  };                  // End of handleImageUpload

  const handleSave = async () => {
    const menuDataWithTimestamp = {
      timestamp: Date.now(),
      data: categories
    };
    localStorage.setItem('menuData', JSON.stringify(menuDataWithTimestamp));
    setHasUnsavedChanges(false);
    setLastUpdate(Date.now());
    alert('Cambios guardados exitosamente');
  };

  const handleUpdateImage = async (categoryId, itemId, imageUrl) => {
    try {
      // Si es una URL directa, intentamos usarla primero
      if (imageUrl.match(/\.(jpeg|jpg|gif|png)$/i)) {
        setCategories(prevCategories => {
          const newCategories = prevCategories.map(category => {
            if (category.id === categoryId) {
              return {
                ...category,
                items: category.items.map(item => {
                  if (item.id === itemId) {
                    return { ...item, image: imageUrl };
                  }
                  return item;
                })
              };
            }
            return category;
          });
          setHasUnsavedChanges(true);
          return newCategories;
        });
        return;
      }

      // Si no es una URL directa, mostramos un mensaje al usuario
      alert('Por favor usa una URL directa de imagen que termine en .jpg, .jpeg, .png o .gif\n\nPuedes usar servicios como:\n- ImgBB (https://imgbb.com)\n- Imgur (https://imgur.com)\n- Postimages (https://postimages.org)');
      
    } catch (error) {
      console.error('Error al actualizar la imagen:', error);
      alert('Error al actualizar la imagen. Por favor verifica que la URL sea válida y accesible.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Ingresar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h1>Panel de Administración <span className="version-label">v0.1 Beta</span></h1>
      <div className="admin-content">
        <div className="categories-list">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
              <span className="item-count">({category.items.length})</span>
            </button>
          ))}
        </div>
        <div className="items-list">
          {selectedCategory && (
            <>
              <div className="upload-instructions">
                <h4>📸 Instrucciones para subir imágenes:</h4>
                <ol>
                  <li>Ve a <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer">ImgBB.com</a></li>
                  <li>Haz clic en "Start uploading" y sube tu imagen</li>
                  <li>Copia la "Direct link" (URL directa)</li>
                  <li>Pega la URL en el campo de imagen del producto</li>
                </ol>
              </div>
              <AddMenuItem
                categoryId={selectedCategory}
                onAddItem={(categoryId, newItem) => {
            setCategories(prevCategories => {
              const newCategories = prevCategories.map(category => {
                if (category.id === categoryId) {
                  return {
                    ...category,
                    items: [...category.items, newItem]
                  };
                }
                return category;
              });
              setHasUnsavedChanges(true);
              return newCategories;
            });
                }}
              />
          {categories
            .find(cat => cat.id === selectedCategory)
            ?.items.map(item => (
              <div key={item.id} className={`admin-item ${item.isHidden ? 'hidden' : ''}`}>
                <div className="image-container">
                      <img
                        src={item.image ? getGoogleDriveDirectLink(item.image) : DEFAULT_IMAGE}
                        alt={item.name}
                        onError={(e) => handleImageError(e, item.name)}
                        loading="lazy"
                        key={`${item.image}-${lastUpdate}`}
                      />
                  <div className="image-upload">
                        <div className="url-input-container">
                      <input
                            type="url"
                            placeholder="https://ejemplo.com/imagen.jpg"
                            className="image-url-input"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleUpdateImage(selectedCategory, item.id, e.target.value);
                                e.target.value = '';
                          }
                        }}
                      />
                          <small className="url-help">Presiona Enter para actualizar la imagen</small>
                        </div>
                  </div>
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="price-promo-controls">
                    <div className="price-control">
                      <label>Precio:</label>
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => handleUpdatePrice(selectedCategory, item.id, e.target.value)}
                      />
                    </div>
                    <div className="promo-control">
                      <label>
                        <input
                          type="checkbox"
                          checked={item.isPromo}
                          onChange={() => handleTogglePromo(selectedCategory, item.id)}
                        />
                        Promoción
                      </label>
                    </div>
                  </div>
                  <div className="admin-controls">
                    <button
                      className="admin-btn hide"
                      onClick={() => handleToggleHideItem(selectedCategory, item.id)}
                      title={item.isHidden ? "Mostrar producto" : "Ocultar producto"}
                    >
                      {item.isHidden ? '👁️' : '👁️‍🗨️'}
                    </button>
                    <button
                      className="admin-btn delete"
                      onClick={() => handleDeleteItem(selectedCategory, item.id)}
                      title="Eliminar producto"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
            </>
          )}
        </div>
      </div>
      {hasUnsavedChanges && (
        <button className="save-changes-button" onClick={handleSaveChanges}>
          💾 Guardar Cambios
        </button>
      )}
    </div>
  );
};

export default Admin;