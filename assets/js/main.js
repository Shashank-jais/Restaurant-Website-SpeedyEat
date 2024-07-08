/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    // Validate that variables exist
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 200) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL TOP ====================*/ 
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 2000,
    reset: true
});

sr.reveal(`.home__data, .home__img,
            .about__data, .about__img,
            .services__content, .menu__content,
            .app__data, .app__img,
            .contact__data, .reviews-data , .contact__button,
            .footer__content`, {
    interval: 200
})



document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('review-form');
    const reviewsList = document.getElementById('reviews-list');
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

    const renderReviews = () => {
        reviewsList.innerHTML = '';
        reviews.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';
            reviewItem.innerHTML = `
                <h3>${review.name}</h3>
                <p>${review.text}</p>
                <p>Rating: ${'★'.repeat(review.rating)}</p>
            `;
            reviewsList.appendChild(reviewItem);
        });
    };

    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reviewer-name').value;
        const text = document.getElementById('review-text').value;
        const rating = document.querySelector('input[name="rating"]:checked').value;

        const newReview = { name, text, rating };
        reviews.push(newReview);
        localStorage.setItem('reviews', JSON.stringify(reviews));
        renderReviews();

        reviewForm.reset();
    });

    renderReviews();
});











// document.addEventListener("DOMContentLoaded", () => {
//     const cart = []; // Array to store selected food items
//     const cartButtonElements = document.querySelectorAll(".menu__button");
//     const cartContainer = document.querySelector("#cart-container");
    
//     // Function to add item to the cart
//     function addToCart(item) {
//         cart.push(item);
//         renderCart();
//     }

//     // Function to render the cart
//     function renderCart() {
//         cartContainer.innerHTML = ""; // Clear previous cart contents

//         if (cart.length === 0) {
//             cartContainer.innerHTML = "<p>Your cart is empty.</p>";
//             return;
//         }

//         cart.forEach(item => {
//             const cartItem = document.createElement("div");
//             cartItem.classList.add("cart-item");

//             cartItem.innerHTML = `
//                 <img src="${item.img}" alt="${item.name}" class="cart-item__img">
//                 <div>
//                     <h3 class="cart-item__name">${item.name}</h3>
//                     <span class="cart-item__price">${item.price}</span>
//                 </div>
//                 <button class="button cart-item__remove-button">Remove</button>
//             `;

//             cartItem.querySelector(".cart-item__remove-button").addEventListener("click", () => {
//                 removeFromCart(item);
//             });

//             cartContainer.appendChild(cartItem);
//         });
//     }

//     // Function to remove item from the cart
//     function removeFromCart(itemToRemove) {
//         const itemIndex = cart.findIndex(item => item.name === itemToRemove.name);
//         if (itemIndex > -1) {
//             cart.splice(itemIndex, 1);
//             renderCart();
//         }
//     }

//     // Adding event listeners to all "Add to Cart" buttons
//     cartButtonElements.forEach(button => {
//         button.addEventListener("click", (e) => {
//             e.preventDefault();
//             const menuContent = button.closest(".menu__content");

//             const item = {
//                 img: menuContent.querySelector(".menu__img").src,
//                 name: menuContent.querySelector(".menu__name").innerText,
//                 price: menuContent.querySelector(".menu__preci").innerText
//             };

//             addToCart(item);
//         });
//     });

//     // Initial render of the cart
//     renderCart();
// });



document.addEventListener("DOMContentLoaded", () => {
    const cartButtonElements = document.querySelectorAll(".menu__button");

    // Load cart from localStorage or initialize it
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to add item to the cart
    function addToCart(item) {
        const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);
        
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            item.quantity = 1;
            cart.push(item);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${item.name} has been added to the cart`);
    }

    // Adding event listeners to all "Add to Cart" buttons
    cartButtonElements.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const menuContent = button.closest(".menu__content");

            const item = {
                img: menuContent.querySelector(".menu__img").src,
                name: menuContent.querySelector(".menu__name").innerText,
                price: parseFloat(menuContent.querySelector(".menu__preci").innerText.replace('$', '')),
            };

            addToCart(item);
        });
    });
});