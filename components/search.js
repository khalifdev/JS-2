const SearchComponent = {
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
};

export default Vue.component('search',SearchComponent);