// База товаров интернет-магазина
goodsBase = [
    { id: 0,
        title: 'JavaScript. Профессиональные приемы программирования',
        path: 'img/java-scr_prf_prm.jpg',
        price: 150
    },
    { id: 1,
        title: 'PHP настольная книга программиста',
        path: 'img/php_nast_knig_prog.jpg',
        price: 50
    },
    { id: 2,
        title: 'Базы данных. Проектирование, реализация и сопровождение. Теория и практика',
        path: 'img/bd_proekt_real_sopr.jpg',
        price: 350
    },
    { id: 3,
        title: 'JavaScript. Подробное руководство',
        price: 250
    }
]

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

class GoodsList {
    constructor(goods) {
        this.goods = goods;
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
        let summ = 0;
        this.goods.forEach((good) => {
           summ += good.price;
        });
        return summ;
    }
}

const list = new GoodsList(goodsBase);


class CartGood extends GoodItem {
    render() {
        // выводит товар в корзине
        // вместе с кнопками для регулировки количества
    }

}

class Cart extends GoodsList {

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

const listCart = new Cart();

window.onload = () => {
    list.render();
};