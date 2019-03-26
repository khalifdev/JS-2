const API_URL = 'http://obuch';


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
    template: `
    <div class="goods-item">
      <slot></slot>
      <h3>{{good.title}}</h3>
      <p>{{good.price}}</p>
    </div>
  `
});

Vue.component('search', {
    props: ['searchLine'],
    template: `
    <div class="search">
        <form @submit.prevent="filterGoods" class="search-form">
            <input type="text" value="searchLine" class="goods-search">
            <button class="search-button" type="submit">Искать</button>
        </form>
    </div>
  `
});

Vue.component('cart', {
    props: ['goodsInCart'],
    template: `
    <div class="cart">
        <h2>Корзина</h2>
        <div id="cartHeaderRow">
            <div class="cartHeaderCell cartProduct">Товар</div>
            <div class="cartHeaderCell cartPrice">Цена</div>
        </div>
        <div class='cartRow' v-for="good in goodsInCart">
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
        searchLine: '',
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
        toggleCartVisibility() {
            this.isVisibleCart = !this.isVisibleCart;
        },
        filterGoods() {
          const regexp = new RegExp(this.searchLine, 'i');
          this.filteredGoods = this.goods.filter(good => regexp.test(good.title));
        }
    },
    async mounted() {
        try {
            this.goods = await this.makeGETRequest(`${API_URL}/goods.json`);
            this.filteredGoods = this.goods;
            this.goodsInCart = this.goods;
        } catch(err) {
            console.error(err);
        }
    }
});