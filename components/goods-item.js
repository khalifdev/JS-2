const GoodsItem = {
    props: ['good'],
    template: `
    <div class="goods-item">
      <img v-if="good.path" :src=good.path alt="No photo">
      <template v-else>
        <img src='img/nophoto_540x540.jpg' alt="No photo">
      </template>
      <h4>{{good.title}}</h4>
      <p>{{good.price}}</p>
      <button class='addClick' @click="$emit('add-to-cart-item')">
          Купить
      </button>
    </div>
  `
};

export default Vue.component('goods-item',GoodsItem);