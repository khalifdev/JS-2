const API_URL = 'http://ck36854.tmweb.ru';
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
              <button class='addClick' data-id=${this.id}>
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
    // метод, отправляющий данные Товара в Корзину для добавления
    addToBasket(id) {
        if (this.goods[id].id == id)
            listBasket.add(this.goods[id]);
        else {
            console.log('Id товара не совпал с его номером в list.goods!');
            return false;
        }
    }
    // метод, отправляющий данные Товара в Корзину для уменьшения количества
    subFromBasket(id) {
        if (this.goods[id].id == id)
            listBasket.sub(this.goods[id]);
        else {
            console.log('Id товара не совпал с его номером в list.goods!');
            return false;
        }
    }
    // метод, отправляющий данные Товара в Корзину для удаления
    removeFromBasket(id) {
        if (this.goods[id].id == id)
            listBasket.remove(this.goods[id]);
        else {
            console.log('Id товара не совпал с его номером в list.goods!');
            return false;
        }
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

class BasketGood extends GoodItem {
    constructor(id, title, price, count, sum) {
        super();
        this.id = id;
        this.title = title;
        this.price = price;
        this.count = count;
        this.sum = sum;
    }
    render() {
        return `<div class='basketRow'>` +
                    `<div class='basketRowCell basketProduct'>${this.title}</div>` +
                    `<div class='basketRowCell basketPrice'>${this.price} р.</div>` +
                    `<div class='basketRowCell basketCount'>` +
                        `<div class='count_left' onclick=list.subFromBasket(${this.id})>-</div>` +
                        `<div class='count_center'><input class='count_input' type='text' value=${this.count}></div>` +
                        `<div class='count_right' onclick=list.addToBasket(${this.id})>+</div>` +
                        `<button class='removeClick' onclick=list.removeFromBasket(${this.id})>` +
                            `<span class='textButton'>Удалить<span></button></div>` +
                    `<div class='basketRowCell basketSum'>${this.sum} р.</div>` +
                `</div>`;
    }

}

class Basket {
    constructor() {
        this.goods = [];
        this.isVisible = false;
    }

    add(good) {
        //сначала проверяем, есть ли Товар в Корзине
        // если есть
        let index = this.goods.indexOf(good);
        if (index === -1) {
            good.count = 1;
            good.sum = good.price;
            this.goods.push(good);
        }
        // если нет
        else {
            this.goods[index].count += 1;
            good.sum += good.price;
            this.render();
        }
    }
    sub(good) {
        // уменьшаем количество Товара, если его больше 1
        let index = this.goods.indexOf(good);
        if (this.goods[index].count > 1) {
            good.count -= 1;
            good.sum -= good.price;
            this.render();
        }
    }
    // Удаление Товара из Корзины
    remove(good) {
        let index = this.goods.indexOf(good);
        this.goods.splice(index, 1);
            this.render();
    }
    render () {
        let basketElement = document.querySelector('.basket');
        basketElement.style.display = 'block';
        basketElement.innerHTML = '<h2>Корзина</h2>\n' +
            '                <div id="basketHeaderRow">\n' +
            '                    <div class="basketHeaderCell basketProduct">Товар</div>\n' +
            '                    <div class="basketHeaderCell basketPrice">Цена</div>\n' +
            '                    <div class="basketHeaderCell basketCount">Количество</div>\n' +
            '                    <div class="basketHeaderCell basketSum">Стоимость</div>\n' +
            '                </div>';

        this.goods.forEach((good) => {
            const basketGood = new BasketGood(good.id, good.title, good.price, good.count, good.sum);
            basketElement.innerHTML += basketGood.render();
        });
        // Вывод итоговой стоимости Товаров в Корзине
        basketElement.innerHTML +=`<div class="basketRow"><div class="resultText">Итого выбрано товаров на сумму</div>
            <div class="resultSum">${this.calcSum()} руб.</div></div>`;

    }
    // Подсчет итоговой стоимости Товаров в Корзине
    calcSum() {
        return this.goods.reduce((totalPrice, good) => {
            if (!good.sum) return totalPrice;
            return totalPrice += good.sum;
        },0);
    }
}

const list = new GoodsList();
const listBasket = new Basket();

window.onload = () => {
    // Полкчение Списка Товаров
    list.fetchGoods()
        .then(() => {
            list.render();
            // Подключаем события нажатия на кнопки Купить
            let buyButtons = [... document.querySelectorAll('.addClick')];
            buyButtons.forEach((button) => {
                let id = button.getAttribute('data-id');
                button.addEventListener('click', () => {
                    list.addToBasket(id)});
            });
        },
        (error) => {
            console.log(error);
        })
};