/**
* Template Name: Yummy
* Template URL: https://bootstrapmade.com/yummy-bootstrap-restaurant-website-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Shopping Cart Functionality
   */
  let cart = [];

  // Initialize cart from localStorage if available
  function initCart() {
    if (localStorage.getItem('newBikanerCart')) {
      try {
        cart = JSON.parse(localStorage.getItem('newBikanerCart'));
        updateCartCount();
      } catch (e) {
        cart = [];
      }
    }
  }

  // Save cart to localStorage
  function saveCart() {
    localStorage.setItem('newBikanerCart', JSON.stringify(cart));
    updateCartCount();
  }

  // Update cart count in header
  function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      const totalItems = cart.reduce((total, item) => total + item.qty, 0);
      cartCount.textContent = totalItems;
    }
  }

  // Update cart modal
  function updateCartModal() {
    const cartItemsList = document.getElementById('cart-items-list');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartDelivery = document.getElementById('cart-delivery');
    const cartTax = document.getElementById('cart-tax');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItemsList || !emptyCartMessage) return;

    if (cart.length === 0) {
      emptyCartMessage.style.display = 'block';
      cartItemsList.innerHTML = '';
      if (cartSubtotal) cartSubtotal.textContent = '₹0';
      if (cartDelivery) cartDelivery.textContent = '₹0';
      if (cartTax) cartTax.textContent = '₹0';
      if (cartTotal) cartTotal.textContent = '₹0';
      return;
    }

    emptyCartMessage.style.display = 'none';
    let cartHTML = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
      const itemTotal = item.unitPrice * item.qty;
      subtotal += itemTotal;
      
      cartHTML += `
        <div class="cart-item d-flex justify-content-between align-items-center mb-3 p-3 border rounded">
          <div>
            <h6 class="mb-1">${item.name}</h6>
            <small class="text-muted">${item.variant} × ${item.qty}</small>
            <div class="mt-2">
              <button class="btn btn-sm btn-outline-secondary qty-decrease" data-index="${index}">−</button>
              <span class="mx-2 qty-value">${item.qty}</span>
              <button class="btn btn-sm btn-outline-secondary qty-increase" data-index="${index}">+</button>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <strong class="me-3">₹${itemTotal.toFixed(2)}</strong>
            <button class="btn btn-sm btn-outline-danger remove-item" data-index="${index}">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      `;
    });

    cartItemsList.innerHTML = cartHTML;
    const deliveryCharge = 0; // Free delivery
    const tax = subtotal * 0.05; // 5% tax
    const grandTotal = subtotal + deliveryCharge + tax;
    
    if (cartSubtotal) cartSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
    if (cartDelivery) cartDelivery.textContent = `₹${deliveryCharge.toFixed(2)}`;
    if (cartTax) cartTax.textContent = `₹${tax.toFixed(2)}`;
    if (cartTotal) cartTotal.textContent = `₹${grandTotal.toFixed(2)}`;

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        removeFromCart(index);
      });
    });
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.qty-decrease').forEach(button => {
      button.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        updateItemQuantity(index, -1);
      });
    });
    
    document.querySelectorAll('.qty-increase').forEach(button => {
      button.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        updateItemQuantity(index, 1);
      });
    });
  }

  // Add item to cart with proper structure
  function addToCart(itemData) {
    // Check if item already exists in cart (same id, name, and variant)
    const existingItemIndex = cart.findIndex(item => 
      item.id === itemData.id && 
      item.name === itemData.name && 
      item.variant === itemData.variant
    );
    
    if (existingItemIndex !== -1) {
      // Increase quantity if item exists
      cart[existingItemIndex].qty += itemData.qty;
    } else {
      // Add new item to cart with correct structure
      cart.push({
        id: itemData.id,
        name: itemData.name,
        variant: itemData.variant,
        unitPrice: itemData.unitPrice,
        qty: itemData.qty,
        itemTotal: itemData.unitPrice * itemData.qty
      });
    }

    saveCart();
    updateCartModal();
    updateCartCount();
    
    // Show confirmation
    const cartButton = document.getElementById('cart-button');
    if (cartButton) {
      cartButton.classList.add('btn-success');
      setTimeout(() => {
        cartButton.classList.remove('btn-success');
      }, 1000);
    }
  }

  // Remove item from cart
  function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartModal();
    updateCartCount();
  }

  // Update item quantity
  function updateItemQuantity(index, change) {
    if (cart[index]) {
      const newQty = cart[index].qty + change;
      if (newQty <= 0) {
        removeFromCart(index);
      } else {
        cart[index].qty = newQty;
        cart[index].itemTotal = cart[index].unitPrice * newQty;
        saveCart();
        updateCartModal();
        updateCartCount();
      }
    }
  }

  // Show checkout form
  function showCheckoutForm() {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    // Hide cart modal and show checkout form
    const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    if (cartModal) {
      cartModal.hide();
    }
    
    // Populate checkout form with order summary
    populateCheckoutSummary();
    
    // Show checkout form modal
    const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    checkoutModal.show();
  }

  // Populate checkout form with order summary
  function populateCheckoutSummary() {
    const orderSummary = document.getElementById('checkout-order-summary');
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutDelivery = document.getElementById('checkout-delivery');
    const checkoutTax = document.getElementById('checkout-tax');
    const checkoutTotal = document.getElementById('checkout-total');
    
    if (!orderSummary) return;
    
    let summaryHTML = '';
    let subtotal = 0;
    
    cart.forEach((item, index) => {
      const itemTotal = item.unitPrice * item.qty;
      subtotal += itemTotal;
      summaryHTML += `
        <div class="d-flex justify-content-between">
          <span>${index + 1}. ${item.name} - ${item.variant} x ${item.qty}</span>
          <span>₹${itemTotal.toFixed(2)}</span>
        </div>`;
    });
    
    orderSummary.innerHTML = summaryHTML;
    
    const deliveryCharge = 0; // Free delivery
    const tax = subtotal * 0.05; // 5% tax
    const grandTotal = subtotal + deliveryCharge + tax;
    
    if (checkoutSubtotal) checkoutSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
    if (checkoutDelivery) checkoutDelivery.textContent = `₹${deliveryCharge.toFixed(2)}`;
    if (checkoutTax) checkoutTax.textContent = `₹${tax.toFixed(2)}`;
    if (checkoutTotal) checkoutTotal.textContent = `₹${grandTotal.toFixed(2)}`;
  }

  // Validate checkout form
  function validateCheckoutForm() {
    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    const address = document.getElementById('customer-address').value.trim();
    const pincode = document.getElementById('customer-pincode').value.trim();
    
    // Validate name
    if (!name) {
      alert('Please enter your name.');
      return false;
    }
    
    // Validate phone (10-15 digits)
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(phone)) {
      alert('Please enter a valid phone number (10-15 digits).');
      return false;
    }
    
    // Validate address (> 5 characters)
    if (address.length <= 5) {
      alert('Please enter a valid address (more than 5 characters).');
      return false;
    }
    
    // Validate pincode (6 digits for India)
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(pincode)) {
      alert('Please enter a valid 6-digit pincode.');
      return false;
    }
    
    return true;
  }

  // Process final checkout
  function processFinalCheckout() {
    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
    const address = document.getElementById('customer-address').value.trim();
    const pincode = document.getElementById('customer-pincode').value.trim();
    const notes = document.getElementById('customer-notes').value.trim();
    
    // Validate form
    if (!validateCheckoutForm()) {
      return;
    }

    // Generate WhatsApp message with customer details
    let message = `New Order\n`;
    message += `Customer: ${name}\n`;
    message += `Phone: ${phone}\n`;
    message += `Address: ${address}, ${pincode}\n`;
    if (notes) {
      message += `Notes: ${notes}\n`;
    }
    message += `\n`;
    
    let subtotal = 0;
    cart.forEach((item, index) => {
      const itemTotal = item.unitPrice * item.qty;
      subtotal += itemTotal;
      message += `${index + 1}. ${item.name} - ${item.variant} x ${item.qty} = ₹${itemTotal.toFixed(2)}\n`;
    });
    
    const deliveryCharge = 0; // Free delivery
    const tax = subtotal * 0.05; // 5% tax
    const grandTotal = subtotal + deliveryCharge + tax;
    
    message += `\n`;
    message += `Subtotal: ₹${subtotal.toFixed(2)}\n`;
    message += `Delivery: ₹${deliveryCharge.toFixed(2)}\n`;
    message += `Tax: ₹${tax.toFixed(2)}\n`;
    message += `Total: ₹${grandTotal.toFixed(2)}\n`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Redirect to WhatsApp
    window.open(`https://wa.me/919999080556?text=${encodedMessage}`, '_blank');
    
    // Clear cart after checkout
    cart = [];
    saveCart();
    updateCartModal();
    updateCartCount();
    
    // Reset form
    document.getElementById('checkout-form').reset();
    
    // Hide checkout modal
    const checkoutModal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
    if (checkoutModal) {
      checkoutModal.hide();
    }
    
    // Show confirmation
    alert('Your order has been sent to WhatsApp. We will confirm it shortly!');
  }

  // Add event listeners when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing cart');
    initCart();
    
    // Add to cart functionality for menu items
    document.querySelectorAll('.menu-item').forEach(item => {
      const itemName = item.querySelector('h4').textContent;
      const priceElement = item.querySelector('.price');
      const priceText = priceElement ? priceElement.textContent : '';
      
      // Create unique ID based on item name
      const itemId = itemName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      // Remove any existing add to cart buttons first
      const existingButtons = item.querySelectorAll('.add-to-cart-btn, .menu-controls');
      existingButtons.forEach(button => button.remove());
      
      // Create container for controls
      const controlsContainer = document.createElement('div');
      controlsContainer.className = 'menu-controls mt-3';
      
      // Check if item has multiple prices
      if (priceText.includes('|')) {
        // Parse price options with correct pricing logic
        const priceOptions = priceText.split('|').map(option => {
          const cleanOption = option.trim();
          const priceMatch = cleanOption.match(/[₹]\s*([\d.]+)\s*[\/\|]\s*([^\s]+)/);
          if (priceMatch) {
            const unit = priceMatch[2];
            const basePrice = parseFloat(priceMatch[1]);
            
            // Apply pricing logic: 1kg = basePrice, 500g = basePrice/2, 250g = basePrice/4
            let unitPrice = basePrice;
            if (unit === '500g') {
              unitPrice = basePrice / 2;
            } else if (unit === '250g') {
              unitPrice = basePrice / 4;
            }
            
            return {
              price: basePrice,
              unitPrice: unitPrice,
              unit: unit
            };
          }
          return null;
        }).filter(Boolean);
        
        if (priceOptions.length > 0) {
          // Create variant dropdown
          const variantSelect = document.createElement('select');
          variantSelect.className = 'form-select form-select-sm variant-select mb-2';
          variantSelect.setAttribute('data-item-id', itemId);
          variantSelect.setAttribute('data-item-name', itemName);
          
          priceOptions.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.price;
            optionElement.textContent = option.unit;
            optionElement.setAttribute('data-unit', option.unit);
            optionElement.setAttribute('data-unit-price', option.unitPrice);
            variantSelect.appendChild(optionElement);
          });
          
          // Create quantity controls
          const qtyContainer = document.createElement('div');
          qtyContainer.className = 'd-flex align-items-center mb-2';
          
          const qtyLabel = document.createElement('span');
          qtyLabel.className = 'me-2';
          qtyLabel.textContent = 'Qty:';
          
          const qtyDecrease = document.createElement('button');
          qtyDecrease.className = 'btn btn-sm btn-outline-secondary qty-btn';
          qtyDecrease.textContent = '−';
          qtyDecrease.type = 'button';
          
          const qtyInput = document.createElement('input');
          qtyInput.type = 'number';
          qtyInput.min = '1';
          qtyInput.value = '1';
          qtyInput.className = 'form-control form-control-sm qty-input mx-1 text-center';
          qtyInput.style.width = '50px';
          
          const qtyIncrease = document.createElement('button');
          qtyIncrease.className = 'btn btn-sm btn-outline-secondary qty-btn';
          qtyIncrease.textContent = '+';
          qtyIncrease.type = 'button';
          
          qtyContainer.appendChild(qtyLabel);
          qtyContainer.appendChild(qtyDecrease);
          qtyContainer.appendChild(qtyInput);
          qtyContainer.appendChild(qtyIncrease);
          
          // Create add to cart button
          const addToCartBtn = document.createElement('button');
          addToCartBtn.className = 'btn btn-primary btn-sm w-100 add-to-cart-btn';
          addToCartBtn.textContent = 'Add to Cart';
          addToCartBtn.type = 'button';
          
          // Event listeners for quantity controls
          qtyDecrease.addEventListener('click', function() {
            let qty = parseInt(qtyInput.value) || 1;
            if (qty > 1) {
              qtyInput.value = qty - 1;
            }
          });
          
          qtyIncrease.addEventListener('click', function() {
            let qty = parseInt(qtyInput.value) || 1;
            qtyInput.value = qty + 1;
          });
          
          // Event listener for add to cart button
          addToCartBtn.addEventListener('click', function() {
            const selectedOption = variantSelect.options[variantSelect.selectedIndex];
            const unitPrice = parseFloat(selectedOption.getAttribute('data-unit-price'));
            const variant = selectedOption.getAttribute('data-unit');
            const qty = parseInt(qtyInput.value) || 1;
            
            const itemData = {
              id: itemId,
              name: itemName,
              variant: variant,
              unitPrice: unitPrice,
              qty: qty,
              itemTotal: unitPrice * qty
            };
            
            addToCart(itemData);
            
            // Reset quantity to 1
            qtyInput.value = '1';
          });
          
          controlsContainer.appendChild(variantSelect);
          controlsContainer.appendChild(qtyContainer);
          controlsContainer.appendChild(addToCartBtn);
        }
      } else {
        // Single price item
        const priceMatch = priceText.match(/[₹]\s*(\d+)/);
        const unitPrice = priceMatch ? parseFloat(priceMatch[1]) : 0;
        
        // Create quantity controls
        const qtyContainer = document.createElement('div');
        qtyContainer.className = 'd-flex align-items-center mb-2';
        
        const qtyLabel = document.createElement('span');
        qtyLabel.className = 'me-2';
        qtyLabel.textContent = 'Qty:';
        
        const qtyDecrease = document.createElement('button');
        qtyDecrease.className = 'btn btn-sm btn-outline-secondary qty-btn';
        qtyDecrease.textContent = '−';
        qtyDecrease.type = 'button';
        
        const qtyInput = document.createElement('input');
        qtyInput.type = 'number';
        qtyInput.min = '1';
        qtyInput.value = '1';
        qtyInput.className = 'form-control form-control-sm qty-input mx-1 text-center';
        qtyInput.style.width = '50px';
        
        const qtyIncrease = document.createElement('button');
        qtyIncrease.className = 'btn btn-sm btn-outline-secondary qty-btn';
        qtyIncrease.textContent = '+';
        qtyIncrease.type = 'button';
        
        qtyContainer.appendChild(qtyLabel);
        qtyContainer.appendChild(qtyDecrease);
        qtyContainer.appendChild(qtyInput);
        qtyContainer.appendChild(qtyIncrease);
        
        // Create add to cart button
        const addToCartBtn = document.createElement('button');
        addToCartBtn.className = 'btn btn-primary btn-sm w-100 add-to-cart-btn';
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.type = 'button';
        
        // Event listeners for quantity controls
        qtyDecrease.addEventListener('click', function() {
          let qty = parseInt(qtyInput.value) || 1;
          if (qty > 1) {
            qtyInput.value = qty - 1;
          }
        });
        
        qtyIncrease.addEventListener('click', function() {
          let qty = parseInt(qtyInput.value) || 1;
          qtyInput.value = qty + 1;
        });
        
        // Event listener for add to cart button
        addToCartBtn.addEventListener('click', function() {
          const qty = parseInt(qtyInput.value) || 1;
          
          const itemData = {
            id: itemId,
            name: itemName,
            variant: 'Each',
            unitPrice: unitPrice,
            qty: qty,
            itemTotal: unitPrice * qty
          };
          
          addToCart(itemData);
          
          // Reset quantity to 1
          qtyInput.value = '1';
        });
        
        controlsContainer.appendChild(qtyContainer);
        controlsContainer.appendChild(addToCartBtn);
      }
      
      item.appendChild(controlsContainer);
    });
    
    // Event delegation for cart modal buttons
    document.addEventListener('click', function(e) {
      // Remove item from cart
      if (e.target.classList.contains('remove-item')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        removeFromCart(index);
      }
      
      // Decrease quantity in cart
      if (e.target.classList.contains('qty-decrease')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        updateItemQuantity(index, -1);
      }
      
      // Increase quantity in cart
      if (e.target.classList.contains('qty-increase')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        updateItemQuantity(index, 1);
      }
    });
    
    // Checkout button in cart modal
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', showCheckoutForm);
    }
    
    // Final checkout button in checkout form
    const finalCheckoutBtn = document.getElementById('final-checkout-btn');
    if (finalCheckoutBtn) {
      finalCheckoutBtn.addEventListener('click', processFinalCheckout);
    }
    
    // Form validation
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
      checkoutForm.addEventListener('input', function() {
        // Real-time validation could be added here if needed
      });
    }
  });

})();