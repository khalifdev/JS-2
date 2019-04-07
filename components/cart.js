const CartComponent = {
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
                <button class='removeClick' @click="$emit('remove-from-cart', good)">Удалить</button>
            </div>
        </div>
    </div>
  `
};

export default Vue.component('cart',CartComponent);