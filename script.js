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
}


class GoodsList {
    constructor() {
        this.goods = []
    }
    fetchGoods() {
        this.goods = [
            { title: 'JavaScript. Профессиональные приемы программирования',
               path: 'img/java-scr_prf_prm.jpg', price: 150 },
            { title: 'PHP настольная книга программиста',
                path: 'img/php_nast_knig_prog.jpg', price: 50 },
            { title: 'Базы данных. Проектирование, реализация и сопровождение. Теория и практика',
                path: 'img/bd_proekt_real_sopr.jpg', price: 350 },
            { title: 'JavaScript. Подробное руководство', price: 250 }
        ]
    }
    render() {
        let listHtml = '';
        this.goods.forEach((good) => {
            const goodItem = new GoodItem(good.title, good.path, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}

const list = new GoodsList();
list.fetchGoods();

window.onload = () => {
    list.render();
};