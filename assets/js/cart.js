document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector("#cart-container");
    const cartTotalContainer = document.querySelector("#billTotal");

    // Load cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to render the cart
    function renderCart() {
        cartContainer.innerHTML = ""; // Clear previous cart contents
        let total = 0;
        let tax = 0.0;
        let delivery = 0;
        let grandTotal = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
            cartTotalContainer.innerHTML = "";
            return;
        }

        cart.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="cart-item__img">
                <div>
                    <h3 class="cart-item__name">${item.name}</h3>
                    <span class="cart-item__price">$${item.price.toFixed(2)}</span>
                    
                </div>
                <div class="rmv-btn">
                <button class="button cart-item__remove-button" data-index="${index}">Remove</button>
                <div class="cart-item__quantity">
                        <button class="button cart-item__quantity-button" data-action="decrease" data-index="${index}">-</button>
                        <span class="cart-item__quantity-text">${item.quantity}</span>
                        <button class="button cart-item__quantity-button" data-action="increase" data-index="${index}">+</button>
                    </div>
                </div>
            `;

            cartContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        tax = total * 0.10;
        delivery = 5;
        document.querySelector(".bill__details-item-value").innerHTML = `$${total}`;
        document.querySelector(".bill__details-tax").innerHTML = `$${tax.toFixed(2)}`;
        document.querySelector(".bill__details-shipping").innerHTML = `$${delivery}`


        grandTotal = total+delivery+tax;
        cartTotalContainer.innerHTML = `Total: $${grandTotal.toFixed(2)}`;

        // Add event listeners to quantity buttons
        document.querySelectorAll(".cart-item__quantity-button").forEach(button => {
            button.addEventListener("click", (e) => {
                const action = e.target.getAttribute("data-action");
                const index = parseInt(e.target.getAttribute("data-index"));
                updateQuantity(index, action);
            });
        });

        // Add event listeners to remove buttons
        document.querySelectorAll(".cart-item__remove-button").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = parseInt(e.target.getAttribute("data-index"));
                removeFromCart(index);
            });
        });
    }

    // Function to update quantity
    function updateQuantity(index, action) {
        if (action === "increase") {
            cart[index].quantity += 1;
        } else if (action === "decrease" && cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else if (action === "decrease" && cart[index].quantity === 1) {
            // Optional: handle if quantity should not go below 1
            return;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    // Function to remove item from the cart
    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    // Initial render of the cart
    renderCart();
});






document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector("#cart-container");
    const cartTotalContainer = document.querySelector("#cart-total");
    const timerDisplay = document.getElementById("timer-display");
  
    // Set the countdown time (in seconds)
    const countdownTime = 600; // 10 minutes in seconds
  
    // Function to start the timer and update display
    function startTimer(duration, display) {
      let timer = duration, minutes, seconds;
      setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
  
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
  
        display.textContent = minutes + ":" + seconds;
  
        if (--timer < 0) {
          timer = duration;
          // Optionally, you can add logic here when the timer reaches 0
          // For example, disable checkout button or show a message
        }
      }, 1000);
    }
  
    // Initialize the timer when the page loads
    startTimer(countdownTime, timerDisplay);
  });
  