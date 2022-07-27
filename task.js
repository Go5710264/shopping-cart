const productQuantityControl = [...document.querySelectorAll('.product__quantity-control')]; // доступ ко всем элементам отвечающих за изменение количества продукции
const productAdd = [...document.querySelectorAll('.product__add')]; // массив кнопок
let cartProducts = document.querySelector('.cart__products'); // получение доступа к корзине
const cartProduct = document.querySelector('.cart__product');// получение доступа к элементу корзины
cartProduct.setAttribute('style', 'display:none;'); // скрыть элемент для копирования

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

productQuantityControl.forEach((elem) => elem.addEventListener('click', changeQuantity)); // при нажатии на элемент +\-

function changeQuantity (e) { // изменение количества товара 
    if (this.classList.contains('product__quantity-control_dec')) { // если элемент содержит dec
        if (+this.nextElementSibling.textContent === 1) { // если элемент равен единице
            return false; // выйти из функции
        }
        this.nextElementSibling.textContent--; // -1
    } else { // в остальных случаях 
        this.previousElementSibling.textContent++; // +1
    }
    e.preventDefault();
}

productAdd.forEach((elem) => elem.addEventListener('click', toBasket)); // событие добавления в корзину

function toBasket(e) {
    let product = this.closest('.product'); // общий div продукта

    let index = [...cartProducts.children].findIndex((elem) => elem.dataset.id === product.dataset.id); // поиск индекса элемента, если тот есть в карзине
    if (index === -1) {
        let newProduct = cartProducts.appendChild(cartProduct.cloneNode(true)); // добавление нового продукта
        newProduct.setAttribute('style', 'display:block;'); // показать созданный элемент
        newProduct.dataset.id = product.dataset.id; // запись артикула в корзину 
        newProduct.lastElementChild.textContent = +product.querySelector('.product__quantity-value').textContent; // добавить количество товара из карточки товара
        console.log(typeof newProduct); // объект!!!!!!!!!!!!!!!!!111

        newProduct.firstElementChild.setAttribute('src', product.querySelector('.product__image').getAttribute('src')); // добавление изображения
    } else { // если динный продукт есть в корзине
        cartProducts.children[index].lastElementChild.textContent = +product.querySelector('.product__quantity-value').textContent + +cartProducts.children[index].lastElementChild.textContent; // провести сумму
    }
    hideCart();

    // localStorage.setItem(indexLocalStorage, JSON.stringify(document.querySelector('.cart__products')));
    e.preventDefault();
}

cartProducts.addEventListener('click', decreaseInQuantity); // перехват события клика - уменьшение количества товара

function decreaseInQuantity(e) {
    if(e.target.classList.contains('cart__product-count')) { // если событие исходит от элемента с классом cart__product-count
        e.target.textContent--; // уменьшить значение элемента на 1
        if (e.target.textContent === '0') { // если значение = 0
            e.target.parentElement.remove(); // удалить элемент
            hideCart();
        }
    }
}

function hideCart() { // скрытие корзины
    if (cartProducts.children.length === 1) { // если остался один элемент, тот что скрыт
        cartProducts.parentElement.setAttribute('style', 'display: none;'); // скрыть корзину
    } else {
        cartProducts.parentElement.setAttribute('style', 'display: block;'); // в остальных случаях - показать
    }
}

hideCart(); 