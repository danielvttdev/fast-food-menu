import { useCart } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    getTotal,
    clearCart 
  } = useCart();

  const handleWhatsAppOrder = () => {
    const orderText = cart.map(item => 
      `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})`
    ).join('\n');

    const total = getTotal();
    const message = `¡Hola! Me gustaría hacer el siguiente pedido:\n\n${orderText}\n\nTotal: $${total.toFixed(2)}`;
    
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5491123884009&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    clearCart();
    setIsCartOpen(false);
  };

  if (!isCartOpen) {
    return (
      <button 
        className="cart-toggle"
        onClick={() => setIsCartOpen(true)}
      >
        🛒 ({cart.reduce((sum, item) => sum + item.quantity, 0)})
      </button>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Tu Pedido</h2>
        <button onClick={() => setIsCartOpen(false)}>✕</button>
      </div>

      {cart.length === 0 ? (
        <p className="empty-cart">Tu carrito está vacío</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  <button 
                    className="remove-item"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
            <button 
              className="order-button"
              onClick={handleWhatsAppOrder}
            >
              Hacer Pedido por WhatsApp
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; 