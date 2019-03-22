const API_URL = 'http://ck36854.tmweb.ru';
// Подключение Vue.js
const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        goodsInBasket: [],
        searchLine: '',
        isVisibleBasket: false
    },
    methods: {
        makeGETRequest(url, callback) {
            var xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    callback(xhr.responseText);
                }
            }

            xhr.open('GET', url, true);
            xhr.send();
        },
        filterGoods() {
          const regexp = new RegExp(this.searchLine, 'i');
          this.filteredGoods = this.goods.filter(good => regexp.test(good.title));
        },
        showBasket() {
            this.goodsInBasket = this.goods;
            this.isVisibleBasket = true;
        }
    },
    mounted() {
        this.makeGETRequest(`${API_URL}/goods.json`, (goods) => {
            if (goods) {
                this.goods = JSON.parse(goods);
                this.filteredGoods = JSON.parse(goods);
            }
            else this.filteredGoods = 0;
        });
    }
});