const productQuantityControl = [...document.querySelectorAll('.product__quantity-control')];
const productAdd = [...document.querySelectorAll('.product__add')];
let cartProducts = document.querySelector('.cart__products'); 
const cartProduct = document.querySelector('.cart__product');
cartProduct.setAttribute('style', 'display:none;'); 

// for (key in localStorage) {
//     if (!localStorage.hasOwnProperty(key)){
//         continue; // пропустить все кроме номеров ключей
//     } else { // если номер ключа
//         console.log(localStorage.getItem(key));
//         cartProducts = localStorage.getItem(key);
//     }
// }
// console.log(localStorage.getItem('indexLocalStorage'));
// let indexLocalStorage = 0;

productQuantityControl.forEach((elem) => elem.addEventListener('click', changeQuantity)); 

function changeQuantity (e) { 
    if (this.classList.contains('product__quantity-control_dec')) {
        if (+this.nextElementSibling.textContent === 1) { 
            return false; 
        }
        this.nextElementSibling.textContent--; 
    } else { 
        this.previousElementSibling.textContent++; 
    }
    e.preventDefault();
}

productAdd.forEach((elem) => elem.addEventListener('click', toBasket)); 

function toBasket(e) {
    let product = this.closest('.product'); 

    let index = [...cartProducts.children].findIndex((elem) => elem.dataset.id === product.dataset.id);
    if (index === -1) {
        let newProduct = cartProducts.appendChild(cartProduct.cloneNode(true)); 
        newProduct.setAttribute('style', 'display:block;'); 
        newProduct.dataset.id = product.dataset.id; 
        newProduct.lastElementChild.textContent = +product.querySelector('.product__quantity-value').textContent; 

        newProduct.firstElementChild.setAttribute('src', product.querySelector('.product__image').getAttribute('src')); 
    } else { 
        cartProducts.children[index].lastElementChild.textContent = 
            +product.querySelector('.product__quantity-value').textContent + 
            +cartProducts.children[index].lastElementChild.textContent;
    }
    hideCart();

    // localStorage.setItem(indexLocalStorage, JSON.stringify(document.querySelector('.cart__products')));
    e.preventDefault();
}

cartProducts.addEventListener('click', decreaseInQuantity); 

function decreaseInQuantity(e) {
    if(e.target.classList.contains('cart__product-count')) {
        e.target.textContent--; 
        if (e.target.textContent === '0') {
            e.target.parentElement.remove(); 
            hideCart();
        }
    }
}

function hideCart() { 
    if (cartProducts.children.length === 1) {
        cartProducts.parentElement.setAttribute('style', 'display: none;');
    } else {
        cartProducts.parentElement.setAttribute('style', 'display: block;');
    }
}

hideCart(); 