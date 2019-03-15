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
              <button class='addClick' id=${this.id} onclick='list.addToCart(this.id)'>
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
    addToCart(id) {
        listCart.add(this.goods[id]);
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
    constructor() {
        this.goods = [];
    }

    add(good) {
        let index = this.goods.indexOf(good);
        if (index === -1) {
            good.count = 1;
            this.goods.push(good);
        }
        else {
            this.goods[index].count++;
        }
    }
    remove(good) {
        this.goods.pop(good);
            listCart.render();
    }
    render () {
        document.querySelector('.cart').style.display = 'block';
        // Строим таблицу с товарами в корзине
        let table = document.getElementById('tableToBuy');
        table.innerHTML = "";
        let row, col0, col1, col2, col3;
        for (var i = 0; i < this.goods.length; i++) {
            row = table.insertRow(i);
            col0 = row.insertCell(0);
            col0.innerText = this.goods[i].title;
            col1 = row.insertCell(1);
            col1.innerText = this.goods[i].count + " шт. ";
            col2 = row.insertCell(2);
            col2.innerText = this.goods[i].price + " руб.";
            col3 = row.insertCell(3);
            col3.innerHTML = `<button class='removeClick' id=${this.goods[i]} onclick='listCart.remove(this.id)'>
                <span class='textButton'>Удалить<span></button>`;
        }
        document.querySelector('#summ').innerText = `Итог: ${this.calcSum()} рублей`;
    }
    calcSum() {
        return this.goods.reduce((totalPrice, good) => {
            if (!good.price) return totalPrice;
            return totalPrice += good.price * good.count;
        },0);
    }
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