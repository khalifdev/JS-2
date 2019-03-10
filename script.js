class GoodItem {
    constructor(title, path, price) {
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
              <button class='addClick'>
                <span class="textButton">Купить<span>
              </button>
            </div>`;
    }
    // метод, отправляющий товар в Корзину, вызывается нажатием на кнопку "Купить"
    addToCart() {
        // вызывется метод объекта Корзины, добавляющий товар
        listCart.add(this.title, this.price);
    }
}


class GoodsList {
    constructor() {
        this.goods = []
    }
    fetchGoods() {
        this.goods = [
            {
              title: 'JavaScript. Профессиональные приемы программирования',
              path: 'img/java-scr_prf_prm.jpg',
              price: 150
            },
            {
              title: 'PHP настольная книга программиста',
              path: 'img/php_nast_knig_prog.jpg',
              price: 50
            },
            {
              title: 'Базы данных. Проектирование, реализация и сопровождение. Теория и практика',
              path: 'img/bd_proekt_real_sopr.jpg',
              price: 350
            },
            {
              title: 'JavaScript. Подробное руководство',
              price: 250
            }
        ]
    }
    render() {
        let listHtml = '';
        this.goods.forEach((good) => {
            const goodItem = new GoodItem(good.title, good.path, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
        // Выводим общую стоимость всех товаров
        document.querySelector('.summ-item').innerText = `Общая стоимость товаров: ${this.calc()} рублей`;
    }
    // метод для подсчета общей стоимости товаров
    calc() {
        let summ = 0;
        this.goods.forEach((good) => {
           summ += good.price;
        });
        return summ;
    }
}

const list = new GoodsList();
list.fetchGoods();


class CartGood extends GoodItem {
    render() {
        // выводит товар в корзине
    }

}

class Cart extends GoodsList {
    //constructor() {
        // массив Товаров в Корзине с учетом количества count
    //}

    add(title, price) {
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

const listCart = new Cart();

window.onload = () => {
    list.render();
};