const API_URL = '';
function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
    var xhr;

    if(window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
    else if(window.ActiveXObject) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            //callback(xhr.responseText);

              if (xhr.status === 200) resolve(xhr.responseText);
              else reject(`Ошибка ${xhr.status}`);
        }
    }

    xhr.open('GET', url, true);
    xhr.send();
    })
}
// Класс товара
class GoodItem {
    constructor(id, title, path, price) {
        this.id = id;
        this.title = title;
        this.path = path;
        this.price = price;
    }
    render() {
        return `<div class="goods-item">
               <img src=${this.path || 'img/nophoto_540x540.jpg'} alt="No photo">
              <div class="goods-info">
                <h4>${this.title}</h4>
                <p>${this.price || 'Цена по запросу'} руб.</p>
              </div>
              <button class='addClick' id=${this.id} onclick='listCart.addToCart(this.id)'>
                <span class="textButton">Купить<span>
              </button>
            </div>`;
    }

}

// Класс списка товаров
class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        return new Promise((resolve, reject) => {
            makeGETRequest(`${API_URL}/goods.json`)
                .then((goods) => {
                        this.goods = JSON.parse(goods);
                        resolve();
                    },
                    (error) => {
                        reject(error);
                    });
        })
    }
    render() {
        let listHtml = '';
        this.goods.forEach((good) => {
            const goodItem = new GoodItem(good.id, good.title, good.path, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
        // Выводим общую стоимость всех товаров
        document.querySelector('.summ-item').innerText = `Общая стоимость товаров: ${this.calc()} рублей`;
    }
    // метод для подсчета общей стоимости товаров
    calc() {
        return this.goods.reduce((totalPrice, good) => {
            if (!good.price) return totalPrice;
            return totalPrice += good.price;
        },0);
    }
}

class CartGood extends GoodItem {
    render() {
        // выводит товар в корзине
        // вместе с кнопками для регулировки количества
    }

}

class Cart {

    addToCart(id) {
        // добавление товара в this.cartGoods[], если новый;
        // увеличение count, если уже есть;
        // расчет стоимости товара;
        // вызов подсчета общей суммы товаров в Корзине
    }
    remove() {
        // удаляет товар из корзины или уменьшает count
        // расчет стоимости товара;
        // вызов подсчета общей суммы товаров в Корзине
    }
    render () {
        // отличается от родительского метода тем, что выводит данные
        // в области Корзины
    }
    // метод calc() наследуется
}

const list = new GoodsList();
const listCart = new Cart();

window.onload = () => {
    list.fetchGoods()
        .then(() => {
            list.render();
        },
        (error) => {
            console.log(error);
        })
};