
import GoodsListComponent from './components/goods-list';
import CartComponent from './components/cart';
import SearchComponent from './components/search';

// Подключение экземпляра Vue.js
const app = new Vue({
    el: '#app',
    components: {
        'search': SearchComponent,
        'cart': CartComponent,
        'goods-list': GoodsListComponent
    },
    data: {
        goods: [],
        filteredGoods: [],
        goodsInCart: [],
        isVisibleCart: false
    },
    methods: {
        makeGETRequest(url) {
            return new Promise((resolve, reject) => {
                const xhr = window.XMLHttpRequest
                    ? new window.XMLHttpRequest() : new window.ActiveXObject();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(JSON.parse(xhr.responseText))
                        }
                        reject(new Error());
                    }
                };
                xhr.open('GET', url, true);
                xhr.send();
            })
        },
        makePOSTRequest(url, data) {
            return new Promise((resolve, reject) => {
                const xhr = window.XMLHttpRequest
                    ? new window.XMLHttpRequest() : new window.ActiveXObject();

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(JSON.parse(xhr.responseText));
                        }
                        reject(new Error());
                    }
                };

                xhr.open('POST', url, true);
                xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                xhr.send(JSON.stringify(data));
            })
        },
        async showCart(){
            try {
                this.goodsInCart = await this.makeGETRequest(`cartData`);
            } catch(err) {
                console.error(err);
            }
        },
        toggleCartVisibility() {
            if (!this.isVisibleCart) {
                this.isVisibleCart = true;
                this.showCart();
            }
            else {
                this.isVisibleCart = false;
            }
        },
        filterGoods(value) {
            const regexp = new RegExp(value, 'i');
            this.filteredGoods = this.goods.filter(good => regexp.test(good.title));
        },
        async addToCart(good){
            try {
                const obj = await this.makePOSTRequest(`addToCart`,good);
                if (obj.result)
                    console.log(good.title + ' добавлена в Корзину!');
                else
                    console.log(good.title + 'Ошибка чтения/записи Корзины!');
            } catch(err) {
                console.error(err);
            }
        },
        async removeFromCart(good){
            try {
                const obj = await this.makePOSTRequest(`removeFromCart`,good);
                if (obj.result == 1)
                    this.showCart();
                else if (obj.result == 2)
                    console.log("Объект не найден в Корзине!");
                else
                    console.log('Ошибка чтения/записи в ФС!');
            } catch(err) {
                console.error(err);
            }
        }
    },
    async mounted() {
        try {
            this.goods = await this.makeGETRequest(`catalogData`);
            this.filteredGoods = this.goods;
        } catch(err) {
            console.error(err);
        }
    }
});