const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];
//упростил ф-цию, убрав {} и return
const renderGoodsItem = (title="noname",  price=0) => `<div class="goods-item">     <h3>${title}</h3><p>${price}</p></div>`;
//упростил фунцкцию, убрав скобки
const renderGoodsList = list => {
  let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
  // запятые выводятся, т.к. goodsList - массив
  document.querySelector('.goods-list').innerHTML = goodsList.join('');
}
renderGoodsList(goods);