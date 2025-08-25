import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
import { addItem } from './CartSlice';


const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const [showSuggestedProducts, setShowSuggestedProducts] = useState(false); // State to toggle suggested products

    // Debug initial state and re-renders
    useEffect(() => {
        console.log('CartItem mounted, showSuggestedProducts:', showSuggestedProducts);
    }, []); // Empty dependency array ensures this runs only on mount

    useEffect(() => {
        console.log('showSuggestedProducts changed to:', showSuggestedProducts);
    }, [showSuggestedProducts]); // Log state changes


    // Sample suggested products (could be passed as a prop or fetched from Redux)
    const suggestedProducts = [
        {
            name: 'Snake Plant',
            image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg',
            cost: '$15',
        },
        {
            name: 'Lavender',
            image: 'https://images.unsplash.com/photo/1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            cost: '$20',
        },
        {
            name: 'ZZ Plant',
            image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            cost: '$25',
        },
    ];

    // Calculate total amount for all products in the cart
    const calculateTotalAmount = () => {
        let total = 0;
        cart.forEach(item => {
            const quantity = item.quantity;
            const cost = parseFloat(item.cost.substring(1));
            total += cost * quantity;
        });
        return total;
    };
    
    const handleContinueShopping = (e) => {
        onContinueShopping(e);
    };



    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    // New function to add another instance of the item
    const handleAddNewProduct = (product) => {
        console.log('Adding new product: ', product);
        dispatch(addItem({ name: product.name, image: product.image, cost: product.cost }));
    }

    const handleToggleSuggestedProducts = () => {
        console.log('Toggling suggested products, current state: ', showSuggestedProducts); // Debugging log
        setShowSuggestedProducts(prev => {
            const newState = !prev;
            console.log('New showSuggestedProducts state:', newState);
            return newState;
        });
    }

    // Calculate total cost based on quantity for an item
    const calculateTotalCost = (item) => {
        const quantity = item.quantity;
        const cost = parseFloat(item.cost.substring(1));
        return cost * quantity;
    };

    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };

    console.log('Rendering cartItem, showSuggestedProducts:', showSuggestedProducts);

    return (
        <div className="cart-container" key={showSuggestedProducts ? 'show' : 'hide'}>
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img className="cart-item-image" src={item.image} alt={item.name} />
                        <div className="cart-item-details">
                            <div className="cart-item-name">{item.name}</div>
                            <div className="cart-item-cost">{item.cost}</div>
                            <div className="cart-item-quantity">
                                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                                <span className="cart-item-quantity-value">{item.quantity}</span>
                                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                            <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Suggested Products Section */}
            {/*{showSuggestedProducts === true ? (
                <div className="suggested-products">
                    <h3 style={{ color: 'black', marginTop: '20px' }}>Suggested Products</h3>
                    <div className="suggested-products-list">
                        {suggestedProducts.map((product, index) => (
                            <div className="suggested-product-card" key={index}>
                                <img
                                    className="suggested-product-image"
                                    src={product.image}
                                    alt={product.name}
                                />
                                <div className="suggested-product-name">{product.name}</div>
                                <div className="suggested-product-cost">{product.cost}</div>
                                <button
                                    className={`suggested-product-button ${
                                        cart.some(item => item.name === product.name) ? 'added-to-cart' : ''
                                    }`}
                                    onClick={() => handleAddNewProduct(product)}
                                    disabled={cart.some(item => item.name === product.name)}
                                >
                                    {cart.some(item => item.name === product.name) ? 'Added to Cart' : 'Add to Cart'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}*/}
            <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={handleToggleSuggestedProducts}>
                    {showSuggestedProducts ? 'Hide Suggested Products' : 'Add Another Item'}
                </button>
                <br />
                {showSuggestedProducts === true ? (
                    <div className="suggested-products">
                        <h3 style={{ color: 'black', marginTop: '20px' }}>Suggested Products</h3>
                        <div className="suggested-products-list">
                            {suggestedProducts.map((product, index) => (
                                <div className="suggested-product-card" key={index}>
                                    <img
                                        className="suggested-product-image"
                                        src={product.image}
                                        alt={product.name}
                                    />
                                    <div className="suggested-product-name">{product.name}</div>
                                    <div className="suggested-product-cost">{product.cost}</div>
                                    <button
                                        className={`suggested-product-button ${
                                            cart.some(item => item.name === product.name) ? 'added-to-cart' : ''
                                        }`}
                                        onClick={() => handleAddNewProduct(product)}
                                        disabled={cart.some(item => item.name === product.name)}
                                    >
                                        {cart.some(item => item.name === product.name) ? 'Added to Cart' : 'Add to Cart'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
                <br />
                <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
                <br />
                <button className="get-started-button1">Checkout</button>
            </div>
        </div>
    );
};

export default CartItem;


