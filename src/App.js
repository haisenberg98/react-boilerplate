import React, { useState, useEffect, useRef } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const slidingMenuRef = useRef(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [cart, setCart] = useState([]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSelectSize = id => {
    setSelectedSize(id);
  };

  const handleMouseDown = event => {
    // Check if the click event originated from the sliding menu or its trigger button
    if (
      (slidingMenuRef.current &&
        !slidingMenuRef.current.contains(event.target)) ||
      event.target.classList.contains('menu-trigger-button')
    ) {
      // If the click event originated from outside the sliding menu and its trigger button, close the menu
      setIsOpen(false);
    }
  };

  const getTotalCartQuantity = () => {
    return cart.reduce((total, product) => total + product.quantity, 0);
  };

  const handleClearCart = () => {
    setCart([]); // Clear the cart by setting it to an empty array
  };

  //Add To Cart Event
  const handleAddToCart = () => {
    if (selectedSize === '') {
      console.log('None of the size is selected');
      setShowErrorMessage(true);

      // Set a timer to hide the error message after 3 seconds
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
    } else {
      // Replace this with the product data you want to add to the cart

      // Check if the product with the selected size is already in the cart
      const existingProductIndex = cart.findIndex(
        product => product.id === product.id && product.size === selectedSize
      );

      const productData = {
        id: product.id,
        title: product.title,
        price: product.price,
        image_url: product.imageURL,
        product_description: product.description,
        size: selectedSize,
      };

      if (existingProductIndex !== -1) {
        // If the product with the selected size already exists, update its quantity
        const updatedCart = [...cart];
        updatedCart[existingProductIndex].quantity += 1;
        setCart(updatedCart);
      } else {
        // If the product with the selected size doesn't exist, add it to the cart
        setCart([...cart, { ...productData, quantity: 1 }]);
      }

      setSelectedSize(''); // Reset selectedSize after adding to cart
      console.log(cart);
    }
  };

  useEffect(() => {
    fetch(
      'https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product'
    )
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
        setLoading(false);
      });
    // Attach the mousedown event listener to the document when the component mounts
    document.addEventListener('mousedown', handleMouseDown);

    // Remove the mousedown event listener when the component unmounts to avoid memory leaks
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id='product-details' className='relative'>
      <div className='flex flex-col my-6 space-y-6 justify-center max-w-7xl mx-auto px-6 md:space-y-8 '>
        {/* Header */}
        <div className='bg-customGray flex justify-end py-2 px-6 mb-6 text-customDarkGray text-sm'>
          <a href='#' className='menu-trigger-button' onClick={toggleMenu}>
            <div className='inline md:hidden'>
              <i className='fa-solid fa-cart-shopping pr-2'></i>
            </div>
            <span className='hidden md:inline pr-1'>My Cart</span>
            <span>({getTotalCartQuantity()})</span>
          </a>
        </div>
        {/* Details */}
        <div className='flex flex-col md:px-40 space-y-4 md:space-x-20 md:space-y-0 md:flex-row'>
          {/* Product image */}
          <div className='md:w-1/2'>
            <img
              className='md:hover:scale-105 transition-all duration-150'
              src={product.imageURL}
              alt={product.title}
            />
          </div>
          {/* Product details */}
          <div className='md:w-1/2 flex flex-col space-y-4'>
            <h2 className='custom-border'>{product.title}</h2>
            <h3 className='custom-border font-semibold'>${product.price}.00</h3>
            <p className='mb-4'>{product.description}</p>
            {/* Product size */}
            <p className='tracking-wide uppercase mb-2'>
              size <span className='text-asteriskColor'>*</span>
            </p>
            {/* Size */}
            <div className='flex space-x-2 mb-2'>
              {product.sizeOptions.map(size => (
                <div
                  className={`${
                    selectedSize === size.label ? 'border-customDark' : ''
                  } py-2 px-4 border-2 border-borderColor text-customDarkGray hover:border-customDark transition-all duration-200 cursor-pointer`}
                  onClick={() => toggleSelectSize(size.label)}
                >
                  {size.label}
                </div>
              ))}
            </div>
            {/* Error */}
            {showErrorMessage && (
              <div className='text-asteriskColor'>Please select size.</div>
            )}
            {/* Add To Cart */}
            <button
              onClick={handleAddToCart}
              className='uppercase border-2 border-customDark px-4 py-2 tracking-wider font-bold hover:bg-customDark hover:text-white transition-all duration-150'
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div
        className={`sliding-menu ${isOpen ? 'open' : ''} p-6`}
        ref={slidingMenuRef}
      >
        <div>
          <div className='flex justify-between items-center mb-8'>
            <h2>Cart</h2>
            {cart.length === 0 ? (
              ''
            ) : (
              <i
                className='fa-solid fa-trash text-asteriskColor pr-2 text-lg cursor-pointer'
                title='Clear Cart'
                onClick={handleClearCart}
              ></i>
            )}
          </div>
          <div>
            {cart.length === 0 ? (
              <p>Cart is empty.</p>
            ) : (
              <div className='w-auto flex flex-col space-y-4'>
                {cart.map(cartProduct => (
                  <div className='flex space-x-4' key={cartProduct.id}>
                    <img
                      className='w-1/2 h-64'
                      src={cartProduct.image_url}
                      alt={cartProduct.title}
                    />
                    <div className='w-1/2'>
                      <h3>{cartProduct.title}</h3>
                      <p>Price: ${cartProduct.price}</p>
                      <p>Size: {cartProduct.size}</p>
                      <p>Quantity: {cartProduct.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
