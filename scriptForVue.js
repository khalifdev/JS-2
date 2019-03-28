const API_URL = 'http://ck36854.tmweb.ru';

Vue.component('goods-list', {
    props: ['goods'],
    template: `
    <div class="goods-list">
      <goods-item v-for="good in goods"
        :key="good.id"
        :good="good">
      </goods-item>
    </div>
  `
});

Vue.component('goods-item', {
    props: ['good'],
    data: function(){
            return {
                async addToCart(good){
                    try {
                        const obj = await app.makePOSTRequest(`addToCart`,good);
                        if (obj.result)
                            console.log(good.title + ' добавлена в Корзину!');
                        else
                            console.log(good.title + 'Ошибка чтения/записи Корзины!');
                    } catch(err) {
                        console.error(err);
                    }
                }
            }
    },
    template: `
    <div class="goods-item">
      <img v-if="good.path" :src=good.path alt="No photo">
      <template v-else>
        <img src='img/nophoto_540x540.jpg' alt="No photo">
      </template>
      <h4>{{good.title}}</h4>
      <p>{{good.price}}</p>
      <button class='addClick' @click="addToCart(good)">
          Купить
      </button>
    </div>
  `
});

Vue.component('search', {
    data() {
        return {
            searchLine: ''
        }
    },
    template: `
    <div class="search">
        <form @submit.prevent="$emit('search', searchLine)" class="search-form">
            <input type="text" v-model="searchLine" class="goods-search">
            <button class="search-button" type="submit">Искать</button>
        </form>
    </div>
  `
});

Vue.component('cart', {
    props: ['goods'],
    template: `
    <div class="cart">
        <h2>Корзина</h2>
        <div id="cartHeaderRow">
            <div class="cartHeaderCell cartProduct">Товар</div>
            <div class="cartHeaderCell cartPrice">Цена</div>
        </div>
        <div class='cartRow' v-for="good in goods">
            <div class='cartRowCell cartProduct'>{{good.title}}</div>
            <div class='cartRowCell cartPrice'>{{good.price}} р.</div>
            <div class='cartRowCell cartCount'>
                <button class='removeClick'>Удалить</button>
            </div>
        </div>
    </div>
  `
});

// Подключение экземпляра Vue.js
const app = new Vue({
    el: '#app',
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
        async toggleCartVisibility() {
            this.isVisibleCart = !this.isVisibleCart;
            try {
                this.goodsInCart = await this.makeGETRequest(`cartData`);
            } catch(err) {
                console.error(err);
            }
        },
        filterGoods(value) {
            const regexp = new RegExp(value, 'i');
            this.filteredGoods = this.goods.filter(good => regexp.test(good.title));
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



