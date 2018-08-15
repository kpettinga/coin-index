<template>

  <div id="CoinList">
    
    <h2 v-if="!coins.length && !loading">Sorry, no coins found</h2>

    <el-row :gutter="24">

      <el-col :span="6" :offset="6">
        <strong>Sort By</strong><br/>
        <el-select v-model="sortby" placeholder="Sort By">
          <el-option
            v-for="sort in sortOptions"
            :key="sort.value"
            :label="sort.label"
            :value="sort.value">
          </el-option>
        </el-select>&nbsp;&nbsp;
      </el-col>
      <el-col :span="6">
        <strong>Currency</strong><br/>
        <el-select v-model="currency" placeholder="Currency">
          <el-option
            v-for="currency in currencies"
            :key="currency"
            :label="currency"
            :value="currency">
          </el-option>
        </el-select>
      </el-col>

      <el-col :span="24">
        <el-pagination
          v-if="pagination && coins.length"
          class="text-center"
          layout="prev, pager, next"
          :total="metadata.num_cryptocurrencies"
          :page-size.sync="limit"
          :current-page.sync="page"
          @prev-click="getCoins(page - 1)"
          @next-click="getCoins(page + 1)"
          @current-change="getCoins()"
          >
        </el-pagination>
      </el-col>

    </el-row>

    <el-row class="results-row" v-loading="loading" :gutter="24">
      <el-col :sm="12" :md="8" :lg="6" v-for="item in coins" :key="item.id">
        <transition name="el-fade-in">
          <Coin :info="item" :currency="currency" :previewData="sortby" />
        </transition>
      </el-col>
    </el-row>

    <el-pagination
      v-if="pagination && coins.length"
      class="text-center"
      layout="prev, pager, next"
      :total="metadata.num_cryptocurrencies"
      :page-size.sync="limit"
      :current-page.sync="page"
      @prev-click="getCoins(page - 1)"
      @next-click="getCoins(page + 1)"
      @current-change="getCoins()"
      >
    </el-pagination>

    <h6 class="text-center" v-if="metadata.timestamp">Last updated: {{ new Date(metadata.timestamp * 1000).toGMTString() }}</h6>

  </div>

</template>

<script>
import Coin from "./Coin";

export default {
  name: "CoinList",
  components: {
    Coin
  },
  data() {
    return {
      page: 1,
      loading: true,
      sortby: 'rank',
      sortOptions: [
        {label: 'Rank', value: 'rank'},
        {label: '24hr Volume', value: 'volume_24h'},
        {label: '24hr Change', value: 'percent_change_24h'},
        {label: 'ID', value: 'id'}
      ],
      currency: "USD",
      currencies: [ "USD", "EUR", "GBP", "AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "ZAR" ],
      metadata: {
        num_cryptocurrencies: 0
      },
      coins: [],
    };
  },
  props: {
    pagination: {
      type: Boolean,
      default: function() { return false; }
    },
    limit: {
      type: Number,
      default: function() { return 24; }
    }
  },
  watch: {
    currency: function(newCurrency) {
      this.getCoins();
    },
    sortby: function(newSortBy) {
      this.getCoins(1);
    }
  },
  methods: {
    getCoins(page, limit) {

      this.loading = true;

      page = page ? page : this.page;
      limit = limit ? limit : this.limit;

      let start = (page * limit) - (limit - 1),
          query = [
            'structure=array', 
            'limit=' + limit, 
            'start=' + start,
            'convert=' + this.currency,
            'sort=' + this.sortby
          ];

      return fetch('https://api.coinmarketcap.com/v2/ticker/?' + query.join('&') )
        .then(res => res.json())
        .then(json => {
          this.coins = json.data;
          this.metadata = json.metadata;
          this.page = page;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getCoins(this.page);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.results-row {
  min-height: 400px;
}
.el-row {
  margin-top: 2rem;
}
.el-pagination {
  margin-left: auto;
}
.el-select {
  width: 100%;
}
</style>

<style>
.btn-prev, .btn-next {
  font-weight: 800;
}
.el-pager li.active {
    font-size: 1.5rem;
}
</style>