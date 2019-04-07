!function(t){var e={};function o(n){if(e[n])return e[n].exports;var s=e[n]={i:n,l:!1,exports:{}};return t[n].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)o.d(n,s,function(e){return t[e]}.bind(null,s));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0)}([function(t,e,o){"use strict";o.r(e);const n={props:["good"],template:'\n    <div class="goods-item">\n      <img v-if="good.path" :src=good.path alt="No photo">\n      <template v-else>\n        <img src=\'img/nophoto_540x540.jpg\' alt="No photo">\n      </template>\n      <h4>{{good.title}}</h4>\n      <p>{{good.price}}</p>\n      <button class=\'addClick\' @click="$emit(\'add-to-cart-item\')">\n          Купить\n      </button>\n    </div>\n  '};const s={props:["goods"],components:{"goods-item":Vue.component("goods-item",n)},template:'\n    <div class="goods-list">\n      <goods-item v-for="good in goods"\n        :key="good.id"\n        :good="good"\n        @add-to-cart-item="$emit(\'add-to-cart\', good)">\n      </goods-item>\n    </div>\n  '};var r=Vue.component("goods-list",s);const a={props:["goods"],template:"\n    <div class=\"cart\">\n        <h2>Корзина</h2>\n        <div id=\"cartHeaderRow\">\n            <div class=\"cartHeaderCell cartProduct\">Товар</div>\n            <div class=\"cartHeaderCell cartPrice\">Цена</div>\n        </div>\n        <div class='cartRow' v-for=\"good in goods\">\n            <div class='cartRowCell cartProduct'>{{good.title}}</div>\n            <div class='cartRowCell cartPrice'>{{good.price}} р.</div>\n            <div class='cartRowCell cartCount'>\n                <button class='removeClick' @click=\"$emit('remove-from-cart', good)\">Удалить</button>\n            </div>\n        </div>\n    </div>\n  "};var i=Vue.component("cart",a);const c={data:()=>({searchLine:""}),template:'\n    <div class="search">\n        <form @submit.prevent="$emit(\'search\', searchLine)" class="search-form">\n            <input type="text" v-model="searchLine" class="goods-search">\n            <button class="search-button" type="submit">Искать</button>\n        </form>\n    </div>\n  '};var d=Vue.component("search",c);new Vue({el:"#app",components:{search:d,cart:i,"goods-list":r},data:{goods:[],filteredGoods:[],goodsInCart:[],isVisibleCart:!1},methods:{makeGETRequest:t=>new Promise((e,o)=>{const n=window.XMLHttpRequest?new window.XMLHttpRequest:new window.ActiveXObject;n.onreadystatechange=function(){4===n.readyState&&(200===n.status&&e(JSON.parse(n.responseText)),o(new Error))},n.open("GET",t,!0),n.send()}),makePOSTRequest:(t,e)=>new Promise((o,n)=>{const s=window.XMLHttpRequest?new window.XMLHttpRequest:new window.ActiveXObject;s.onreadystatechange=function(){4===s.readyState&&(200===s.status&&o(JSON.parse(s.responseText)),n(new Error))},s.open("POST",t,!0),s.setRequestHeader("Content-Type","application/json; charset=UTF-8"),s.send(JSON.stringify(e))}),async showCart(){try{this.goodsInCart=await this.makeGETRequest("cartData")}catch(t){console.error(t)}},toggleCartVisibility(){this.isVisibleCart?this.isVisibleCart=!1:(this.isVisibleCart=!0,this.showCart())},filterGoods(t){const e=new RegExp(t,"i");this.filteredGoods=this.goods.filter(t=>e.test(t.title))},async addToCart(t){try{(await this.makePOSTRequest("addToCart",t)).result?console.log(t.title+" добавлена в Корзину!"):console.log(t.title+"Ошибка чтения/записи Корзины!")}catch(t){console.error(t)}},async removeFromCart(t){try{const e=await this.makePOSTRequest("removeFromCart",t);1==e.result?this.showCart():2==e.result?console.log("Объект не найден в Корзине!"):console.log("Ошибка чтения/записи в ФС!")}catch(t){console.error(t)}}},async mounted(){try{this.goods=await this.makeGETRequest("catalogData"),this.filteredGoods=this.goods}catch(t){console.error(t)}}})}]);