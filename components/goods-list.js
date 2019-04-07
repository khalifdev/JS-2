const GoodsListComponent = {
    props: ['goods'],
    components: {
        'goods-item': GoodsItem
    },
    template: `
    <div class="goods-list">
      <goods-item v-for="good in goods"
        :key="good.id"
        :good="good"
        @add-to-cart-item="$emit('add-to-cart', good)">
      </goods-item>
    </div>
  `
};
import GoodsItem from './goods-item';
export default Vue.component('goods-list',GoodsListComponent);